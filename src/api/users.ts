import ky from "ky";
import { Observable, from } from "rxjs";

export type User = {
  id: number;
  name: string;
};
export const getUsers = (): Promise<User[]> =>
  ky.get("https://jsonplaceholder.typicode.com/users").json<User[]>();

export const getUsersObservable = (): Observable<User[]> =>
  from(ky.get("https://jsonplaceholder.typicode.com/users").json<User[]>());

export const getUserObservable = (userId: number): Observable<User> =>
  from(
    ky.get(`https://jsonplaceholder.typicode.com/users/${userId}`).json<User>()
  );
