import React, { useCallback, useState } from "react";

import { User } from "../api/users";
import useFetchObservableCallback from "../hooks/useFetchObservableCallback";
import { Observable } from "rxjs";
import { LoadingState } from "../types";

export default {
  title: "Fetch with observable callback",
};

type UsersComponentProps = { users: User[]; loadingState: LoadingState };
const UsersComponent: React.FC<UsersComponentProps> = ({
  users,
  loadingState,
}) => {
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
export const UseFetch = () => {
  const [userId, setUserId] = useState(1);
  const { data: users, loadingState, fetch } = useFetchObservableCallback(
    useCallback(() => getUsersObservable(userId), [userId]),
    []
  );

  return (
    <div>
      <button onClick={() => setUserId((prevState) => prevState + 1)}>
        Increment {userId}
      </button>
      <button onClick={fetch}>Click to fetch</button>
      <UsersComponent users={users} loadingState={loadingState} />
    </div>
  );
};

UseFetch.story = {
  name: "useFetch with observable callback",
};

function getUsersObservable(id: number): Observable<User[]> {
  const users = [
    { id: 1, name: "1", age: 1 },
    { id: 2, name: "2", age: 2 },
    { id: 3, name: "3", age: 3 },
    { id: 4, name: "4", age: 4 },
  ];
  return new Observable((subscriber) => {
    setTimeout(() => subscriber.next([users[id - 1]]), 1000);
  });
}
