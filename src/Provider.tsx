import React, { ReactElement } from 'react';
import { UserContext, UserProviderProps, UserProfile } from '@auth0/nextjs-auth0';

export type UserProviderState = {
  user?: UserProfile;
  error?: string;
  isLoading: boolean;
};

const checkSession = async () => {};

export default ({
  user: initialUser,
  children,
}: UserProviderProps): ReactElement<UserContext> => {
  const { user, error, isLoading } = initialUser as UserProviderState

  return (
    <UserContext.Provider value={{ user, error: error && new Error(error), isLoading, checkSession }}>{children}</UserContext.Provider>
  );
};