const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { GetItemCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { ddbClient } = require("../lib/ddbClient");
const User = require('../model/User');

const tableName = process.env.STORAGE_USERTABLE_NAME;

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required' });
  const getParams = {
    TableName: tableName,
    Key: {
      [User.partitionKey.name]: { [User.partitionKey.type]: user }
    }
  }
  const { Item: foundUser } = await ddbClient.send(new GetItemCommand(getParams));
  if (!foundUser) return res.sendStatus(401); // unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser[User.password.name][User.password.type]);
  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          [User.partitionKey.name]: foundUser[User.partitionKey.name][User.partitionKey.type]
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30m' }
    );
    const refreshToken = jwt.sign(
      { [User.partitionKey.name]: foundUser[User.partitionKey.name][User.partitionKey.type] },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '12h' }
    );

    const putParams = {
      TableName: tableName,
      Item: {
        ...foundUser, [User.refreshToken.name]: { [User.refreshToken.type]: refreshToken }
      }
    }
    await ddbClient.send(new PutItemCommand(putParams));

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 }) // for chrome
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
}

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // unauthorized
  const refreshToken = cookies.jwt;

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.sendStatus(403); // forbidden
      const getParams = {
        TableName: tableName,
        Key: {
          [User.partitionKey.name]: { [User.partitionKey.type]: decoded.username }
        }
      }
      const { Item: foundUser } = await ddbClient.send(new GetItemCommand(getParams));
      if (foundUser[User.refreshToken.name][User.refreshToken.type] !== refreshToken) return res.sendStatus(403);
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "username": decoded.username
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
      );
      res.json({ accessToken })
    }
  );
}

const handleLogout = async (req, res) => {
  // on client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no content
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        // delete refreshToken in cookie
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204);
      }
      const getParams = {
        TableName: tableName,
        Key: {
          [User.partitionKey.name]: { [User.partitionKey.type]: decoded.username }
        }
      }
      const { Item: foundUser } = await ddbClient.send(new GetItemCommand(getParams));
      const putParams = {
        TableName: tableName,
        Item: {
          ...foundUser, [User.refreshToken.name]: { [User.refreshToken.type]: '' }
        }
      }
      await ddbClient.send(new PutItemCommand(putParams));
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
      res.sendStatus(204);
    }
  );
}


module.exports = { handleLogin, handleRefreshToken, handleLogout };