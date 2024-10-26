import { useContext } from "react";
import { TPath } from "../types/form";
import { getValueByPath } from "../helpers/helpers";
import { FormContext } from "../context/FormContext";

type ComponentProps = {
  path: TPath
}

function withFormValue<P extends ComponentProps>(Component: React.ComponentType<P>) {
  return function WrappedComponent(props: P) {
    const formState = useContext(FormContext);
    const value = getValueByPath(props.path, formState);

    return <Component {...props} value={value} />;
  };
}

export default withFormValue;