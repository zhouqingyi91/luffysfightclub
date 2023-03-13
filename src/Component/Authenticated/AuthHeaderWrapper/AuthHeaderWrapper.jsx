import { NavLink, useLocation, useNavigate } from "react-router-dom";
import css from './AuthHeaderWrapper.module.css';
import useAuth from '../../../Hooks/Authenticated/useAuth';
import { useDispatch, useSelector } from "react-redux";
import { API } from "aws-amplify";
import DashboardApi, { albumPhotosPath, addAlbumPath, delAlbumPath } from "../../../Api/DashboardApi";
import { setAlbumPhotos } from "../../../Store/Authenticated/albumPhotosSlice";
import { trackPromise } from 'react-promise-tracker';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { addAlbum, removeAlbum } from "../../../Store/Authenticated/albumsSlice";
import DeleteIcon from "../../UI/DeleteIcon/DeleteIcon";
import Modal from "../../UI/Modal/Modal";

let promise = null;

const AuthHeaderWrapper = () => {
  const linkActiveStyle = ({ isActive }) => isActive ? { color: 'white' } : null;

  const { auth } = useAuth();
  const albums = useSelector(state => state.albums);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [createAlbumFlag, setCreateAlbumFlag] = useState(false);
  const albumNameRef = useRef();
  const [albumName, setAlbumName] = useState("");
  const [activeDeleteIconAlbum, setActiveDeleteIconAlbum] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (createAlbumFlag) {
      albumNameRef.current.focus();
    }
  }, [createAlbumFlag]);

  const setAlbumPhotosHandler = async (album) => {
    try {
      dispatch(setAlbumPhotos([]));
      API.cancel(promise, "cancel previous call");
      promise = API.get(DashboardApi, albumPhotosPath, { queryStringParameters: { album } });
      const { data } = await trackPromise(promise);
      setActiveDeleteIconAlbum(album);
      dispatch(setAlbumPhotos(data));
    } catch (err) {
      console.error(err.message);
      if (!API.isCancel(err)) {
        navigate("/login", { state: { from: location }, replace: true });
      }
    }
  }

  const createAlbumHandler = (e) => {
    e.preventDefault();
    setCreateAlbumFlag(true);
  }

  const finishCreateAlbumHandler = async () => {
    try {
      await trackPromise(API.put(DashboardApi, addAlbumPath, { body: { albumName } }))
      dispatch(addAlbum(albumName));
      setAlbumName("");
      setCreateAlbumFlag(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  const deleteAlbumHandler = async (albumName, index) => {
    try {
      await trackPromise(API.del(DashboardApi, delAlbumPath, { body: { albumName } }))
      dispatch(removeAlbum(index));
      setOpenModal(false);
      dispatch(setAlbumPhotos([]));
      navigate("/api/dashboard");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      {
        auth?.accessToken &&
        <div id={css.headerWrapper}>
          <header id={css.header}>
            <ul >
              <li>
                <NavLink style={linkActiveStyle} to={'/api/dashboard'} >dashboard</NavLink>
              </li>
              <li>
                {createAlbumFlag
                  ?
                  <div>
                    <input value={albumName} onChange={e => setAlbumName(e.target.value)} ref={albumNameRef} type="text" />
                    <FontAwesomeIcon onClick={finishCreateAlbumHandler} className={css.icon} icon={faCheck} />
                    <FontAwesomeIcon onClick={() => setCreateAlbumFlag(false)} className={css.icon} icon={faXmark} />
                  </div>
                  : <a href="#" onClick={e => createAlbumHandler(e)}>create album</a>
                }
              </li>
              {albums?.map((album, idx) => {
                return (
                  <li className={css.albumNameLi} key={album}>
                    <NavLink
                      onClick={() => setAlbumPhotosHandler(album)}
                      style={linkActiveStyle} to={`/api/dashboard/${album}`} >
                      {album}
                    </NavLink>
                    {activeDeleteIconAlbum === album &&
                      <>
                        <DeleteIcon clickAction={() => setOpenModal(true)} size={"small"} />
                        <Modal
                          openModal={openModal}
                          text={`Delete album: ${album}?`}
                          onCancel={() => setOpenModal(false)}
                          onConfirm={() => deleteAlbumHandler(album, idx)}
                        />
                      </>
                    }
                  </li>
                )
              })}
            </ul>

          </header>
        </div>
      }
    </>
  )
};

export default AuthHeaderWrapper;