import css from "./DeleteIcon.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, } from "@fortawesome/free-solid-svg-icons";


const DeleteIcon = ({ clickAction, size }) => {

  const clickHandler = () => {
    clickAction();
  }

  size = size ? size : "large";

  return (
    <FontAwesomeIcon style={{ "--size": size }} onClick={clickHandler} id={css.deleteIcon} icon={faTrash} />
  );
};

export default DeleteIcon;