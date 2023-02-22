import { usePromiseTracker } from "react-promise-tracker";
import BeatLoader from "react-spinners/BeatLoader";

const cssOverride = {
  display: "block",
  margin: "0 auto",
};

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <BeatLoader
      color={"#ccc"}
      loading={promiseInProgress}
      size={50}
      margin={30}
      cssOverride={cssOverride}
    />
  );
};

export default LoadingIndicator;