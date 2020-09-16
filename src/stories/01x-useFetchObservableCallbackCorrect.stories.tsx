import React, { useState } from "react";

import { User } from "../api/users";
import useFetchObservableCallback, {
  LoadingState,
} from "../hooks/useFetchObservableCallbackCorrect";
import { Observable } from "rxjs";

const allUsers: User[] = [
  { id: 1, name: "User 1 name", age: 11 },
  { id: 2, name: "User 2 name", age: 12 },
  { id: 3, name: "User 3 name", age: 13 },
  { id: 4, name: "User 4 name", age: 14 },
];

export default {
  title: "Fetch with observable callback CORRECT!",
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
          <li key={user.id}>
            {user.name} Age: {user.age}
          </li>
        ))}
      </ul>
    );
};
export const UseFetch = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [wat, setWat] = useState(100);
  const { data: users, loadingState, fetch } = useFetchObservableCallback<
    User[]
  >([]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <button onClick={() => setWat((prevState) => prevState + 1)}>
          Set random state {wat}
        </button>
      </div>

      <div
        style={{ display: "flex", justifyContent: "space-between", width: 300 }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {allUsers.map((user) => (
            <div
              style={{
                background: selectedUser === user.id ? "grey" : "white",
              }}
              key={user.id}
              onClick={() => {
                setSelectedUser(user.id);
                fetch(() => getUsersObservable(user.id));
              }}
            >
              {user.name}
            </div>
          ))}
        </div>
        <UsersComponent users={users} loadingState={loadingState} />
      </div>
    </div>
  );
};

UseFetch.story = {
  name: "useFetch with observable callback",
};

function getUsersObservable(id: number): Observable<User[]> {
  let timeout = 1;
  if (id === 2) {
    timeout = 2000;
  }
  return new Observable((subscriber) => {
    setTimeout(() => subscriber.next([allUsers[id - 1]]), timeout);
  });
}
