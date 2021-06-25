import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navigation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className="appbar" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" className="navlink" exact>
              My Blogs
            </NavLink>
          </Typography>
          <Button color="inherit">
            <NavLink to="/" className="navlink" exact>
              <strong> Blogs</strong>
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink to="/createBlog" className="navlink" exact>
              <strong> Add Blog</strong>
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;
