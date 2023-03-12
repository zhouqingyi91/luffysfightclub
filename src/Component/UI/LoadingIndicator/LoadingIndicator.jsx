import { usePromiseTracker } from "react-promise-tracker";
import BeatLoader from "react-spinners/BeatLoader";
import Backdrop from "../Backdrop/Backdrop";

const cssOverride = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
};

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <>
      {
        promiseInProgress &&
        <Backdrop>
          <BeatLoader
            color={"#ccc"}
            size={25}
            margin={15}
            cssOverride={cssOverride}
          />
        </Backdrop>
      }
    </>
  );
};

export default LoadingIndicator;