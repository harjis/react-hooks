import React, { Suspense } from "react";
import { Story } from "@storybook/react";
import { useSuspendableFetch } from "../hooks/useSuspendableFetch";
import { CommonErrorBoundary } from "../error_boundaries/CommonErrorBoundary";

export default {
  title: "useSuspendableFetch",
};

type Props = {
  dataReader: () => string;
};
const ShowData = ({ dataReader }: Props) => {
  const data = dataReader();

  return <div>{data}</div>;
};

const BrokenComponentWithBoundaries = () => {
  const dataReader = useSuspendableFetch(() => getData(1));
  const dataReader2 = useSuspendableFetch(() => getData(2));
  return (
    <div>
      <CommonErrorBoundary fallback={(error) => <h1>Error {error}</h1>}>
        <Suspense fallback={<div>Loading 1</div>}>
          <ShowData dataReader={dataReader} />
        </Suspense>
      </CommonErrorBoundary>

      <CommonErrorBoundary fallback={(error) => <h1>Error {error}</h1>}>
        <Suspense fallback={<div>Loading 2</div>}>
          <ShowData dataReader={dataReader2} />
        </Suspense>
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
