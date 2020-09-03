import React, { ChangeEvent, useCallback, useState } from "react";

import useFetchObservable, { LoadingState } from "../hooks/useFetchObservable";
import { getUserObservable, User } from "../api/users";

// https://jsonplaceholder.typicode.com/users/1

export default {
  title: "Fetch with observable and query parameter",
};

const renderUser = (loadingState: LoadingState, user: User | null) => {
  if (loadingState === LoadingState.NOT_LOADED) {
    return <div>Not loaded</div>;
  } else if (loadingState === LoadingState.LOADING) {
    return <div>Loading...</div>;
  } else return <ul>{user && user.name}</ul>;
};
export const UseFetch = () => {
  const [userId, setUserId] = useState(1);
  const { data: user, loadingState } = useFetchObservable(
    useCallback(() => getUserObservable(userId), [userId]),
    null
  );
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userId = parseInt(event.currentTarget.value);
    setUserId(userId);
  };

  return (
    <>
      Give userId: <input type="text" onChange={onChange} value={userId} />
      {renderUser(loadingState, user)}
    </>
  );
};

UseFetch.story = {
  name: "useFetch with observable",
};
