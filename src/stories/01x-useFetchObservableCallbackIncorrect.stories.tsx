import React, { useState } from "react";

import { User } from "../api/users";
import useFetchObservableCallback, {
  LoadingState,
} from "../hooks/useFetchObservableCallbackIncorrect";
import { Observable } from "rxjs";

export default {
  title: "Fetch with observable callback INCORRECT",
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
  const { data: users, loadingState, fetch } = useFetchObservableCallback<
    User[]
  >([]);

  return (
    <div>
      <button onClick={() => setUserId((prevState) => prevState + 1)}>
        Increment {userId}
      </button>
      <button
        onClick={() => {
          fetch(() => getUsersObservable(userId));
        }}
      >
        Click to fetch
      </button>
      <UsersComponent users={users} loadingState={loadingState} />
    </div>
  );
};

UseFetch.story = {
  name: "useFetch with observable callback",
};

function getUsersObservable(id: number): Observable<User[]> {
  const users = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
  ];
  let timeout = 1000;
  if (id === 2) {
    timeout = 2000;
  }
  return new Observable((subscriber) => {
    setTimeout(() => subscriber.next([users[id - 1]]), timeout);
  });
}
