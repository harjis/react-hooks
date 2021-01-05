import React, { Suspense } from "react";
import { useAsyncResource, DataOrModifiedFn } from "use-async-resource";

type User = {
  name: string;
};
type Props = {
  userReader: DataOrModifiedFn<User>;
};
function ProfileDetails({ userReader }: Props) {
  // Try to read user info, although it might not have loaded yet
  const user = userReader();
  return <h1>{user.name}</h1>;
}

const App = () => {
  const [userReader, getNewUser] = useAsyncResource(fetchUser, []);
  console.log("wat");
  return (
    <div>
      <Suspense fallback={<h1>Loading profile...</h1>}>
        <ProfileDetails userReader={userReader} />
      </Suspense>
    </div>
  );
};

function fetchUser(): Promise<{ name: string }> {
  console.log("fetch user...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("fetched user");
      resolve({
        name: "Ringo Starr",
      });
    }, 1000);
  });
}

export default App;
