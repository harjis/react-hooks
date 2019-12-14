import ky from 'ky';
import { from } from 'rxjs';

type User = {
  id: number;
  name: string;
};
export const getUsers = () => ky.get('https://jsonplaceholder.typicode.com/users').json<User[]>();

export const getUsersObservable = () => {
  const promise = ky.get('https://jsonplaceholder.typicode.com/users').json<User[]>();
  return from(promise);
};
