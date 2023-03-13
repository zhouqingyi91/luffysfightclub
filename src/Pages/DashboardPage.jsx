import { API } from "aws-amplify";
import { useEffect } from "react";
import useAxiosInterceptors from "../Hooks/Authenticated/useAxiosInterceptors";
import DashboardApi, { albumsPath, albumPhotosPath } from "../Api/DashboardApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlbums } from "../Store/Authenticated/albumsSlice";
import css from "./DashboardPage.module.css";
import DashboardImg from "../Component/DashboardImg/DashboardImg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { setAlbumPhotos } from "../Store/Authenticated/albumPhotosSlice";
import useUploadFiles from "../Hooks/Authenticated/useUploadFiles";
import { usePromiseTracker } from "react-promise-tracker";
import useLogout from "../Hooks/Authenticated/useLogout";
import { trackPromise } from "react-promise-tracker";
import { bucketPathPrefix } from "../Constants/S3/S3BucketConst";


const DashboardPage = () => {
  useAxiosInterceptors();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const albumPhotos = useSelector(state => state.albumPhotos);
  const uploadFiles = useUploadFiles();
  const { promiseInProgress } = usePromiseTracker();
  const logout = useLogout();

  const album = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

  useEffect(() => {
    const promise = API.get(DashboardApi, albumsPath);

    const getAlbums = async () => {
      try {
        const { albums } = await promise;
        dispatch(setAlbums(albums.map(album => album.replace("/", ""))));
      } catch (error) {
        console.error(error.message)
        if (!API.isCancel(error)) {
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    }

    getAlbums();
    return () => {
      API.cancel(promise);
    }
  }, [])

  const uploadHandler = async (files) => {
    try {
      await trackPromise(uploadFiles(files, album));
      const { data } = await trackPromise(API.get(DashboardApi, albumPhotosPath, { queryStringParameters: { album } }));
      dispatch(setAlbumPhotos(data));
    } catch (err) {
      console.error(err.message)
    }
  }

  const logoutHandler = async () => {
    await logout();
  }

  return (
    <div id={css.dashboard}>
      {album === "dashboard"
        ? <button onClick={logoutHandler}>Sign out</button>
        :
        <>
          {!promiseInProgress &&
            <>
              <label htmlFor="file-upload" className={css.upload}>
                <FontAwesomeIcon icon={faPlus} />
              </label>
              <input id="file-upload" type="file" onChange={e => uploadHandler(e.target.files)} multiple />
            </>
          }

          {albumPhotos?.map(({ imgName }, idx) =>
            <DashboardImg key={imgName} imgUrl={bucketPathPrefix + imgName} imgName={imgName} imgIdx={idx} />)}
        </>
      }
    </div>
  );
};

export default DashboardPage;