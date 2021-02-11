import React from "react";
import { Story } from "@storybook/react";

import { ButtonAndInput } from "../components/ButtonAndInput/ButtonAndInput";

export default {
  title: "ButtonAndInput focus test",
};

const Template: Story = (args) => {
  return <ButtonAndInput />;
};

export const Basic = Template.bind({});
Basic.args = {};
