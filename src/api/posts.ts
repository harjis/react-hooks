import { Observable } from "rxjs";

import { Post } from "../types";
import { fromPromise } from "rxjs/internal-compatibility";
import { fakeHttpLib } from "./fakeHttpLib";

export const getPosts = (): Observable<Post[]> => {
  return fromPromise(fakeHttpLib.get("/posts"));
};
