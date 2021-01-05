import React, { useState } from "react";
import { Story } from "@storybook/react";

import { CommonErrorBoundary } from "../error_boundaries/CommonErrorBoundary";
import { useAsyncError } from "../hooks/useAsyncError";

export default {
  title: "useAsyncError",
};

const BrokenComponent = ({ id }: { id: 1 | 2 }) => {
  const [data, setData] = useState<string | null>(null);
  const throwError = useAsyncError();
  React.useEffect(() => {
    getData(id)
      .then(setData)
      .catch((e) => {
        throwError(new Error(e));
      });
  }, [id, throwError]);

  return <div>{data}</div>;
};

const BrokenComponentWithBoundaries = () => {
  return (
    <div>
      <CommonErrorBoundary fallback={(error) => <h1>Error {error}</h1>}>
        <BrokenComponent id={1} />
      </CommonErrorBoundary>

      <CommonErrorBoundary fallback={(error) => <h1>Error {error}</h1>}>
        <BrokenComponent id={2} />
      </CommonErrorBoundary>
    </div>
  );
};

function getData(id: 1 | 2): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve("Data for id: 1");
      } else {
        reject(
          "Can not fetch data for id: 2 (To see error boundary focus HERE and press ESC)"
        );
      }
    }, id * 1000);
  });
}

const Template: Story = (args) => {
  return <BrokenComponentWithBoundaries />;
};

export const Basic = Template.bind({});
Basic.args = {};
