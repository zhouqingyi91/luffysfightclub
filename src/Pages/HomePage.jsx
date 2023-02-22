import React, { useEffect } from 'react';
import PageCollection from '../Component/Collection/PageCollection/PageCollection';
import { homepageAlbum } from '../Constants/S3/S3BucketConst';
import useSetPageImgData from '../Hooks/useSetPageImgData';

let IMG_DATA = null;

const HomePage = () => {
  const setPageImgData = useSetPageImgData();

  useEffect(() => {
    (async () => IMG_DATA = await setPageImgData(IMG_DATA, homepageAlbum))();

    return () => setPageImgData([]);
  }, [])

  return (
    <PageCollection />
  );
};

export default HomePage;