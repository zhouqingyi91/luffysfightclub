import "./Backdrop.css";
import ReactDOM from "react-dom";

const Backdrop = ({ children, click }) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={click}>
      {children}
    </div>,
    document.getElementById("backdrop-root")
  );
};

export default Backdrop;