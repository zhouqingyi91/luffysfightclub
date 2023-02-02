import { API } from "aws-amplify";

export const fetchImgData = async (album) => {
  const api = 'getS3AlbumPhotosApi';
  const path = '/s3/album';
  const init = {
    body: {
      album: album
    }
  }
  try {
    const res = await API.post(api, path, init);
    // console.log(res);
    return res;
  } catch (err) {
    console.log("err", err);
  }
}