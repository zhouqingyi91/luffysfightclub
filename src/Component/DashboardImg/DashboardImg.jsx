import RectImg from '../Responsive/RectImg';
import DeleteIcon from '../DeleteIcon/DeleteIcon';
import css from "./DashboardImg.module.css";
import { useState } from 'react';
import Modal from '../UI/Modal/Modal';
import { API } from "aws-amplify";
import DashboardApi, { deleteObjectPath } from '../../Api/DashboardApi';
import { useDispatch } from 'react-redux';
import { removeAlbumPhoto } from '../../Store/Authenticated/albumPhotosSlice';

const DashboardImg = ({ imgUrl, imgName, imgIdx }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const deleteS3Object = async () => {
    try {
      await API.del(DashboardApi, deleteObjectPath, { body: { imgName } })
      dispatch(removeAlbumPhoto(imgIdx));
    } catch (error) {
      console.error(error.message)
    }
  }

  return (

    <div className={css.dashboardImg}>
      <RectImg imgUrl={imgUrl} ratio="100%" containerWidth="100%" />

      <Modal
        openModal={openModal}
        text={"Delete This Picture?"}
        imgUrl={imgUrl}
        onCancel={() => setOpenModal(false)}
        onConfirm={deleteS3Object}
      />

      <div className={css.del}>
        <DeleteIcon clickAction={() => setOpenModal(true)} />
      </div>
    </div>

  );
};

export default DashboardImg;