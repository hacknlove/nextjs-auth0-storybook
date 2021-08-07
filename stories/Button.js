import React from "react";
import { useUser } from '@auth0/nextjs-auth0';

export function User () {
  const user = useUser();

  return (
    <pre>
      {
        JSON.stringify(user, null, 4)
      }
    </pre>
  );
};

