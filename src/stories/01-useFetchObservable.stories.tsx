import React from 'react';

import useFetch, { LoadingState } from '../hooks/useFetch';
import { getUsers } from '../api/users';

// https://jsonplaceholder.typicode.com/users

export default {
  title: 'Fetch with observable'
};

export const UseFetch = () => {
  const { data: users, error, loadingState } = useFetch(getUsers, []);
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
