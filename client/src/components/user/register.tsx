import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { Redirect } from 'react-router';
import { User } from '../../entities/user';

interface Props {
  onCreateClick(body: any): void;
  createdUser: User;
}

const useStyles = makeStyles({
  form: {
    textAlign: 'left',
    marginLeft: '20px',
  },
  button: {
    marginTop: '20px',
  },
  category: {
    marginBottom: '30px',
  },
  inputField: {
    marginRight: '10px',
  }
});

export default function RegisterComponent(props: Props) {
  const classes = useStyles({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [onCreatedRedirect, setOnCreatedRedirect] = useState(null);

  if (props.createdUser && !onCreatedRedirect) {
    setOnCreatedRedirect(<Redirect to={`/users/${props.createdUser.id}`} push />);
  }

  return onCreatedRedirect || (
  <div className={classes.form}>
    <div>
      <h1>Create Budget</h1>
      <div>
        <TextField
          name="username"
          margin="normal"
          label="username"
          type="text"
          id="username"
          placeholder="Enter username..."
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>

      <div>
        <TextField
          name="password"
          margin="normal"
          label="password"
          type="text"
          id="password"
          placeholder="Enter password..."
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div>
        <Button
          type="submit"
          className={classes.button}
          variant="outlined"
          color="inherit"
          onClick={() => {
            const body = {
              username: username,
              password: password
            };

            console.log(props)

            props.onCreateClick(body);
          }}
        >
Register
        </Button>
      </div>
    </div>
  </div>
  );
}
