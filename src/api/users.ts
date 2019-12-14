import ky from 'ky';
import { from } from 'rxjs';

type User = {
  id: number;
  name: string;
};
export const getUsers = () => ky.get('https://jsonplaceholder.typicode.com/users').json<User[]>();

export const getUsersObservable = () => {
  const promise = ky.get('https://jsonplaceholder.typicode.com/users').json<User[]>();
  // For testing
  // const promise: Promise<User[]> = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve([ { id: 1, name: 'test' } ])
  //   }, 1000);
  // });

  return from(promise);
};
