import React, { useEffect, useState } from "react";
import { AddonPanel, TableWrapper, BooleanControl, DateControl  } from "@storybook/components";
import { Form } from '@storybook/components';
import addons from "@storybook/addons";
import type { UserProviderState } from './Provider';
import { styled } from '@storybook/theming';

interface PanelProps {
  active: boolean;
}

const FieldSet = styled.div(() => ({
  margin: '1rem',
}));

interface userFieldType {
  name: string;
  type?: string;
}

const user: UserProviderState = { isLoading: true }

const initialUser: UserProviderState = { isLoading: true }

const fields: Array<userFieldType> = [
  {
    name: 'email',
  },
  {
    name: 'email_verified',
    type: 'checkbox'
  },
  {
    name: 'nickname',
  },
  {
    name: 'picture',
  },
  {
    name: 'sub',
  },
  {
    name: 'updated_at',
    type: 'date'
  }
]

export const Panel: React.FC<PanelProps> = (props) => {
  const [user, setUser] = useState(initialUser);

  const isLoggedIn = Boolean(user.user)
  const hasError = Boolean(user.error)

  useEffect(() => {
    const channel = addons.getChannel()
    channel.on('nextjs-auth0/setInitial', setUser)
    return () => {
      channel.off('nextjs-auth0/setInitial', setUser)
    }
  }, [])

  function setUserHandler (user: any) {
    const channel = addons.getChannel()
 
    setUser(user)

    channel.emit('nextjs-auth0/setUser', user)
  }

  return (
    <AddonPanel {...props}>
      <FieldSet>
        <h2>General:</h2>
        <TableWrapper>
          <thead className="docblock-argstable-head">
            <tr>
              <th>Name</th>
              <th>Control</th> 
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Logged in</strong>
              </td>
              <td>
                <BooleanControl value={isLoggedIn} name="is logged in" onChange={checked => {
                if (checked) {
                  setUserHandler({
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
                  setUserHandler({
                    ...user,
                    user: null,
                  })
                }
              }}/>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Has error</strong>
              </td>
              <td>
                <BooleanControl value={hasError} name="Has error" onChange={checked => {
                  if (checked) {
                    setUserHandler({
                      ...user,
                      error: 'Some error description'
                    })
                  } else {
                    setUserHandler({
                      ...user,
                      error: null
                    })
                  }
                }}/>
              </td>
            </tr>
            <tr>
              <td>
                <strong>is Loading</strong>
              </td>
              <td>
                <BooleanControl value={user.isLoading} name="is loading" onChange={checked => {
                  setUserHandler({
                    ...user,
                    isLoading: checked
                  })
                }}/>
              </td>
            </tr>
          </tbody>
        </TableWrapper>
      </FieldSet>

      {
        isLoggedIn && (
          <FieldSet>
            <h2>User</h2>
            <TableWrapper>
              <thead className="docblock-argstable-head">
                <tr>
                  <th>Name</th>
                  <th>Control</th> 
                </tr>
              </thead>
              <tbody>
                {fields.map(
                  ({name, type = 'text'}: userFieldType ) => (
                    <tr key={name}>
                      <td><strong>{name}</strong></td>
                      <td>
                        {
                          type === 'checkbox'
                            ? (
                              <BooleanControl value={user.user[name] as boolean} name={name} onChange={checked => {
                                setUserHandler({
                                  ...user,
                                  user: {
                                      ...user.user,
                                      [name]: checked
                                    },
                                  })
                              }}/>
                            )
                            : type === 'date' 
                            ? (
                              <DateControl
                                name={name}
                                value={new Date(user.user[name] as string)}
                                onChange={date => {
                                  setUserHandler({
                                    ...user,
                                    user: {
                                      ...user.user,
                                      [name]: new Date(date).toISOString()
                                    },
                                  })
                                }}
                              />
                            )
                            : (
                              <Form.Input
                                value={user.user[name] as string}
                                type={type}
                                onChange={event => {
                                  setUserHandler({
                                    ...user,
                                    user: {
                                      ...user.user,
                                      [name]: (event.target as HTMLInputElement).value
                                    },
                                  })
                                }} 
                              />
                            )
                          }
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </TableWrapper>
          </FieldSet>
        )
      }
      {
        hasError && (
          <FieldSet>
            <h2>Error</h2>
            <TableWrapper>
              <thead className="docblock-argstable-head">
                <tr>
                  <th>Name</th>
                  <th>Control</th> 
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>error</strong></td>
                  <td>
                    <Form.Input
                      value={user.error}
                      onChange={event => {
                        setUserHandler({
                          ...user,
                          error: (event.target as HTMLInputElement).value
                        })
                      }} 
                    />
                  </td>
                </tr>
              </tbody>
            </TableWrapper>
          </FieldSet>
        )
      }
    </AddonPanel>
  );
};
