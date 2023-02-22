import { API } from "aws-amplify";

const api = 'getS3AlbumPhotosApi';
const path = '/s3/album';

const useFetchAlbumPhotos = () => {

  const fetchAlbumPhotos = async (album) => {
    const init = {
      body: {
        album
      }
    }
    try {
      return await API.post(api, path, init);
    } catch (err) {
      console.error("err", err);
    }
  };

  return fetchAlbumPhotos;
};

export default useFetchAlbumPhotos;