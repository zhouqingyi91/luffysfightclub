import GalleryCollection from '../Component/Collection/GalleryCollection/GalleryCollection';
import { portraitAlbum } from '../Constants/S3/S3BucketConst';
import useSetGalleryImgData from '../Hooks/useSetGalleryImgData';
import { useEffect } from 'react';

let IMG_DATA = null;

const PortraitPage = () => {
  const setGalleryImgData = useSetGalleryImgData();

  useEffect(() => {
    (async () => IMG_DATA = await setGalleryImgData(IMG_DATA, portraitAlbum))();

    return () => setGalleryImgData([]);
  }, [])

  return (
    <GalleryCollection />
  );
};

export default PortraitPage;