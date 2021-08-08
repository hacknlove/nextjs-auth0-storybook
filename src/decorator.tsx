import React, { useState } from "react";
import addons, { StoryContext, useEffect, useParameter } from "@storybook/addons";
import UserProvider from './Provider'

export const decorator = (StoryFn: any, context: StoryContext) => {
  const initialUser = useParameter('initialUser', { isLoading: false })

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const channel = addons.getChannel();
    channel.emit('nextjs-auth0/setInitial', user)
  }, [initialUser])

  useEffect(() => {
    const channel = addons.getChannel();
    channel.on('nextjs-auth0/setUser', setUser)
    return () => {
      channel.off('nextjs-auth0/setUser', setUser)
    }
  }, [setUser])

  return (
    <UserProvider user={user}>
      <StoryFn />
    </UserProvider>
  )
};
