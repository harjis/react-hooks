import { Observable, from } from "rxjs";

import { Post } from "../types";
import { fakeHttpLib } from "./fakeHttpLib";

export const getPosts = (): Observable<Post[]> => {
  return from(fakeHttpLib.get("/posts"));
};
