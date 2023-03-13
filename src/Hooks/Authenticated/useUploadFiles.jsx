import { API } from "aws-amplify";
import DashboardApi, { getIdentityPoolIdPath } from "../../Api/DashboardApi";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { bucketName, region } from "../../Constants/S3/S3BucketConst";

const useUploadFiles = () => {
  const uploadFiles = async (files, album) => {
    if (!files || files.length === 0 || !album) return "no upload";
    const { identityPoolId } = await API.get(DashboardApi, getIdentityPoolIdPath);
    const client = new S3Client({
      region,
      credentials: fromCognitoIdentityPool({
        clientConfig: { region },
        identityPoolId,
      }),
    });

    for (const file of files) {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: `${album}/${file.name}`,
        Body: file,
      });
      await client.send(command);
    }
    return "uploaded " + files.length + " files";
  }

  return uploadFiles;
};

export default useUploadFiles;