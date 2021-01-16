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
  rightMenu: {
    display: 'flex',
    alignItems: 'baseline',
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
  }
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
        <Toolbar className={classes.menu}>
          <Typography
            variant="h6"
          >
            <Button
              onClick={() => onButtonClick('/budgets')}
              className={classes.title}
            >
BudgetBook
            </Button>
          </Typography>
          <div className={classes.rightMenu}>
            <Typography
              variant="h6"
            >
              <Button
                onClick={() => onButtonClick('/budgets')}
                className={classes.title}
              >
  Budgets
              </Button>
            </Typography>
            {redirect}
            <Typography
              variant="h6"
            >
              <Button
                size="large"
                color="inherit"
                className={classes.title}
                onClick={() => onButtonClick('/budgets/create')}
              >
    Create
              </Button>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
