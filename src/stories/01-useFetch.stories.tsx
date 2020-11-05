import React from "react";

import useFetch from "../hooks/useFetch";
import { getUsers } from "../api/users";
import { LoadingState } from "../types";

// https://jsonplaceholder.typicode.com/users

export default {
  title: "Fetch",
};

export const UseFetch = () => {
  const { data: users, loadingState } = useFetch(getUsers, []);
  if (loadingState === LoadingState.NOT_LOADED) {
    return <div>Not loaded</div>;
  } else if (loadingState === LoadingState.LOADING) {
    return <div>Loading...</div>;
  } else
    return (
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
};

UseFetch.story = {
  name: "useFetch",
};
