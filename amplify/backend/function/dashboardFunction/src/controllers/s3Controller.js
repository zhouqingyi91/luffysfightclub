const { s3Client } = require('../lib/s3Client');
const {
  ListObjectsV2Command,
  DeleteObjectCommand,
  PutObjectCommand,
  DeleteObjectsCommand
} = require("@aws-sdk/client-s3");

// const albumBucketName = "luffys-s3-bucket-demo";
const albumBucketName = "luffysfightclub";

const listAlbums = async (req, res) => {
  try {
    const data = await s3Client.send(
      new ListObjectsV2Command({ Delimiter: "/", Bucket: albumBucketName })
    );
    if (data.CommonPrefixes === undefined) {
      res.json({ "message": "No albums available" });
    } else {
      const albums = data.CommonPrefixes.map((comPfx) => comPfx.Prefix)
      res.json({ albums })
    }
  } catch (err) {
    res.status(400).json({ "message": err.message })
  }
}

const listAlbumPhotos = async (req, res) => {
  const { album } = req.query;
  try {
    let data = await s3Client.send(
      new ListObjectsV2Command({ Prefix: album, Bucket: albumBucketName })
    );
    data = data.Contents.reverse().map(({ Key }) => ({ imgName: Key }));
    data.pop();
    res.json({ data })
  } catch (err) {
    res.status(400).json({ "message": err.message });
  }
}

const delObject = async (req, res) => {
  const { imgName } = req.body;
  try {
    const result = await s3Client.send(
      new DeleteObjectCommand({ Bucket: albumBucketName, Key: imgName }));
    res.json({ result })
  } catch (err) {
    res.status(400).json({ "message": err.message });
  }
}

const getIdentityPoolId = async (req, res) => {
  const identityPoolId = process.env.IDENTITY_POOL_ID;
  res.json({ identityPoolId })
}

const addAlbum = async (req, res) => {
  const { albumName } = req.body;
  try {
    const result = await s3Client.send(
      new PutObjectCommand({ Bucket: albumBucketName, Key: albumName + "/" }));
    res.json({ result })
  } catch (err) {
    res.status(400).json({ "message": err.message });
  }
}

const delAlbum = async (req, res) => {
  const { albumName } = req.body;
  try {
    const data = await s3Client.send(
      new ListObjectsV2Command({ Prefix: albumName, Bucket: albumBucketName })
    );
    const { Deleted } = await s3Client.send(
      new DeleteObjectsCommand({
        Bucket: albumBucketName,
        Delete: {
          Objects: data.Contents
        }
      })
    );
    const result = await s3Client.send(
      new DeleteObjectCommand({ Bucket: albumBucketName, Key: albumName + "/" }));
    res.json({ result })
  } catch (err) {
    res.status(400).json({ "message": err.message });
  }
}

module.exports = {
  listAlbums,
  listAlbumPhotos,
  delObject,
  getIdentityPoolId,
  addAlbum,
  delAlbum
}