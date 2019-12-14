import React from 'react';

import useFetchObservable, {LoadingState} from "../hooks/useFetchObservable";
import { getUsersObservable } from '../api/users';

// https://jsonplaceholder.typicode.com/users

export default {
  title: 'Fetch with observable'
};

export const UseFetch = () => {
  const { data: users, error, loadingState } = useFetchObservable(getUsersObservable, []);
  if (loadingState === LoadingState.NOT_LOADED) {
    return <div>Not loaded</div>;
  } else if (loadingState === LoadingState.LOADING) {
    return <div>Loading...</div>;
  } else
    return (
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
};

UseFetch.story = {
  name: 'useFetch with observable'
};
