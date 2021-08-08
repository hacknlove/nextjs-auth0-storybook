import React from "react";
import { UserPrint } from "./Example";

export default {
  title: "Example/User",
  component: UserPrint,
  parameters: {
    initialUser: {
      isLoading: true,
    }
  }
};

export const Loading = () => <UserPrint />

export const Logged = () => <UserPrint />
Logged.parameters = {
  initialUser: {
    isLoading: false,
    user: {
      email: 'john@doe.com',
      email_verified: true,
      nickname: 'Joe',
      picture: 'https://picsum.photos/200',
      sub: 'mock:johndoe',
      updated_at: '2021-04-02T12:42:42.042Z',
    }
  }
}

export const ErrorStory = () => <UserPrint />
ErrorStory.parameters = {
  initialUser: {
    isLoading: false,
    error: 'Something went wrong'
  }
}