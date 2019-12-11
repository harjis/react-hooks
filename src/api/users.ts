import ky from 'ky';

type User = {
  id: number;
  name: string;
};
export const getUsers = () => ky.get('https://jsonplaceholder.typicode.com/users').json<User[]>();
