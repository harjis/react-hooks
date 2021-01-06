import { useMemo, useRef } from "react";

type DataReader<Result> = () => Result;
type Query<Result> = () => Promise<Result>;
export const useSuspendableFetch = <Result>(
  query: Query<Result>
): DataReader<Result> => {
  const dataReaderRef = useRef<DataReader<Result>>(
    () => (undefined as unknown) as Result
  );

  useMemo(() => {
    dataReaderRef.current = getResultOrSuspend(query);
  }, [query]);

  return dataReaderRef.current;
};

type Status = "init" | "done" | "error";
function getResultOrSuspend<Result>(query: Query<Result>): DataReader<Result> {
  let data: Result;
  let status: Status = "init";
  let error: Error;

  const promise = query()
    .then((result) => {
      data = result;
      status = "done";
    })
    .catch((err) => {
      error = new Error(err);
      status = "error";
    });

  function readData() {
    if (status === "init") {
      throw promise;
    } else if (status === "error") {
      throw error;
    }

    return data;
  }

  return readData;
}
