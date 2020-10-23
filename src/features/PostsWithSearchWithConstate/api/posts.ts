import { Observable } from "rxjs";

import { Post } from "../../../types";

const posts: Post[] = [
  { id: 1, name: "My favorite post" },
  { id: 2, name: "My least favorite post" },
  { id: 3, name: "Not a post" },
  { id: 4, name: "Lets toast!" },
  { id: 5, name: "I'm at the coast" },
];

export const getPosts = (): Observable<Post[]> => {
  return new Observable((subscriber) => {
    setTimeout(() => subscriber.next(posts), 2000);
  });
};
