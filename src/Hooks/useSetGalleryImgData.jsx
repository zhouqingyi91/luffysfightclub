import useFetchAlbumPhotos from "./useFetchAlbumPhotos";
import { useDispatch } from 'react-redux';
import { setGalleryImgData } from "../Store/galleryImgDataSlice";
import { trackPromise } from 'react-promise-tracker';

const useSetGalleryImgData = () => {
  const dispatch = useDispatch();
  const fetchAlbumPhotos = useFetchAlbumPhotos();

  const setImgData = async (imgData, album) => {
    if (!imgData && album) {
      imgData = await trackPromise(fetchAlbumPhotos(album));
    }
    dispatch(setGalleryImgData(imgData));
    return imgData;
  }

  return setImgData;
};

export default useSetGalleryImgData;