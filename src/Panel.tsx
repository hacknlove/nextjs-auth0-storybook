import React, { useEffect } from "react";
import { AddonPanel } from "@storybook/components";
import { Form } from '@storybook/components';
import addons from "@storybook/addons";

interface PanelProps {
  active: boolean;
}

function setUser (user: any) {
  const channel = addons.getChannel()

  channel.emit('nextjs-auth0/setUser', user)
}

export const Panel: React.FC<PanelProps> = (props) => {

  const user: any  = { isLoading: false }

  const isLoggedId = Boolean(user.user)

  console.log(user)

  return (
    <AddonPanel {...props}>
      {/* <Form.Field label="logged in">
        <Form.Input type="checkbox" checked={isLoggedId} onChange={event => {
          const checked = (event.target as HTMLInputElement).checked
          console.log(checked)
          if (checked) {
            setUser({
              ...user,
              user: {
                email: 'foo@bar.com',
                email_verified: true,
                name: 'Foo Bar',
                nickname: 'Foo',
                picture: 'https://picsum.photos/200',
                sub: 'mock:usersub',
                updated_at: '2021-08-06T12:08:21.218Z',
              },
            })
          } else {
            setUser({
              user: null,
              isLoading: false,
              error: null
            })
          }
        }}/>
      </Form.Field>

      {isLoggedId && (
        <Form.Field label="email">
          <Form.Input
            value={user.user.email}
            onChange={event => {
              setUser({
                ...user,
                user: {
                  email: (event.target as HTMLInputElement).value
                },
              })
            }} 
          />
        </Form.Field>
      )} */}

    </AddonPanel>
  );
};
