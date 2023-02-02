const { s3Client, bucketName } = require("./s3Client");
const { ListObjectsV2Command } = require("@aws-sdk/client-s3");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    // console.log(`EVENT: ${JSON.stringify(event)}`);

    const body = JSON.parse(event.body);

    const bucketParams = {
        Bucket: bucketName,
        Prefix: body.album
    }

    try {
        let data = await s3Client.send(new ListObjectsV2Command(bucketParams));
        data = data.Contents.slice(1).reverse().map(({ Key }) => ({ path: Key }));
        return {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify(data),
        };
    } catch (err) {
        throw new Error(JSON.stringify(err));
    }
};
