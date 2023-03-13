/* Amplify Params - DO NOT EDIT
  ENV
  REGION
  STORAGE_USERTABLE_ARN
  STORAGE_USERTABLE_NAME
  STORAGE_USERTABLE_STREAMARN
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



// declare a new express app
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');

if (!process.env.ENV) {
  require('dotenv').config();
}

// handle options credentials check, incorporated in corsOptions
// app.use(credentials);

// cors
app.use(cors(corsOptions));

// json
app.use(bodyParser.json())

// middleware for cookies
app.use(cookieParser());

// awsServerlessExpressMiddleware
app.use(awsServerlessExpressMiddleware.eventContext())

app.get('/api', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

app.use('/api', require('./routes/auth'))

app.use(verifyJWT);
app.use('/api/s3', require('./routes/s3'));

app.post('/api', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ error: "404 Not Found" })
  } else {
    res.type('txt').send("404 Not Found");
  }
})

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
