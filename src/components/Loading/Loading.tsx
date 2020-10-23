import React, { PropsWithChildren } from "react";

import styles from "./Loading.module.css";
import { LoadingState } from "../../types";

type Props<T> = {
  loadingState: LoadingState;
  error: string | undefined;
};
const Loading = <T,>(props: PropsWithChildren<Props<T>>) => {
  if (props.loadingState === LoadingState.LOADING) {
    return <div className={styles.container}>Loading...</div>;
  } else if (props.loadingState === LoadingState.NOT_LOADED) {
    return null;
  } else {
    return <>{props.children}</>;
  }
};

export default Loading;
