import GalleryCollection from '../Component/Collection/GalleryCollection/GalleryCollection';
import { streetAlbum } from '../Constants/S3/S3BucketConst'
import useSetGalleryImgData from '../Hooks/useSetGalleryImgData';
import { useEffect } from 'react';

let IMG_DATA = null;

const StreetPage = () => {
  const setGalleryImgData = useSetGalleryImgData();

  useEffect(() => {
    (async () => IMG_DATA = await setGalleryImgData(IMG_DATA, streetAlbum))();

    return () => setGalleryImgData([]);
  }, [])

  return (
    <GalleryCollection />
  );
};

export default StreetPage;