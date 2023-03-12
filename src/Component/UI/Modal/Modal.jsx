import Backdrop from "../Backdrop/Backdrop";
import css from "./Modal.module.css";

const Modal = ({ openModal, text, imgUrl, onConfirm, onCancel }) => {
  if (!openModal) return null;

  return (
    <Backdrop click={onCancel} >
      <div id={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.text}>
          <p>{text}</p>
        </div>
        <div className={css.img}>
          {imgUrl && <img src={imgUrl} alt="luffysfightclub" />}
        </div>
        <div className={css.buttons}>
          <button onClick={onConfirm}>YES</button>
          <button onClick={onCancel}>NO</button>
        </div>
      </div>
    </Backdrop>

  );
};

export default Modal;