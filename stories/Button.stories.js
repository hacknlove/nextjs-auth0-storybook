import React from "react";
import { User } from "./Button";

export default {
  title: "Example/User",
  component: User,
  parameters: {
    initialUser: {
      isLoading: true
    }
  }
};

const Template = (args) => <User {...args} />;

export const Primary = Template.bind({});
