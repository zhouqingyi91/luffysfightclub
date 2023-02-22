import useFetchAlbumPhotos from "./useFetchAlbumPhotos";
import { useDispatch } from 'react-redux';
import { setPageImgData } from "../Store/pageImgDataSlice";
import { trackPromise } from 'react-promise-tracker';

const useSetPageImgData = () => {
  const dispatch = useDispatch();
  const fetchAlbumPhotos = useFetchAlbumPhotos();

  const setImgData = async (imgData, album) => {
    if (!imgData && album) {
      imgData = await trackPromise(fetchAlbumPhotos(album));
      imgData = imgData.map(({ imgName }) => ({
        imgName,
        path: imgName.substring(imgName.indexOf('/') + 1, imgName.lastIndexOf('.'))
      }));
    }
    dispatch(setPageImgData(imgData));
    return imgData;
  }

  return setImgData;
};

export default useSetPageImgData;