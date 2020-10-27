import { Post } from "../types";

const posts: Post[] = [
  { id: 1, name: "My favorite post" },
  { id: 2, name: "My least favorite post" },
  { id: 3, name: "Not a post" },
  { id: 4, name: "Lets toast!" },
  { id: 5, name: "I'm at the coast" },
];

export const fakeHttpLib = {
  get: (url: string): Promise<Post[]> =>
    new Promise((resolve) => {
      setTimeout(() => {
        if (url.includes("posts")) {
          resolve(posts);
        }
      }, 2000);
    }),
};
