import Spinner from "../components/Spinner/Spinner";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

export const setContent = (
  process: string,
  Component: React.ReactElement,
): React.ReactElement => {
  switch (process) {
    case "loading":
      return <Spinner />;
    case "confirmed":
      return Component;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
};

export default setContent;
