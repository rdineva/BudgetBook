import React, { useState, useEffect } from 'react';
import {
  createStyles, makeStyles, Theme, fade,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { Button, InputBase, TextField } from '@material-ui/core';
import { Redirect } from 'react-router';
import { Path } from 'history';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  BeenHereIcon: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    marginRight: '10px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    flexGrow: 1,
  },
  searchIcon: {
    height: '100%',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));

export default function CustomAppBar() {
  const classes = useStyles({});
  const [redirect, setRedirect] = useState(null);

  function onButtonClick(path: Path) {
    setRedirect(<Redirect to={`${path}`} push />);
  }

  useEffect(() => {
    setRedirect(null);
  }, [redirect]);

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="default"
      >
        <Toolbar>
          <Typography
            variant="h6"
          >
            <Button
              onClick={() => onButtonClick('/')}
              className={classes.title}
            >
Начало
            </Button>
          </Typography>
          <Typography
            variant="h6"
          >
            <Button
              onClick={() => onButtonClick('/budgets')}
              className={classes.title}
            >
Бюджети
            </Button>
          </Typography>
          {redirect}
          <Button
            size="large"
            color="inherit"
            onClick={() => onButtonClick('/budgets/create')}
          >
Създай
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
