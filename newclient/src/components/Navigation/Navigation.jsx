import React, { useContext } from 'react';
import {
  AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../context/globalProvider';
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
  const { token, role } = useContext(GlobalContext);

  return (
    <div className={classes.root}>
      <AppBar className="appbar" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" className="navlink" exact>
              Blog App
            </NavLink>
          </Typography>
          <Button color="inherit">
            <NavLink to="/" className="navlink" exact>
              <strong> Blogs</strong>
            </NavLink>
          </Button>
          {token ? (
            <>
              {role === 'Author' ? (
                <>
                  <Button color="inherit">
                    <NavLink to="/addblog" className="navlink" exact>
                      <strong> Add Blog</strong>
                    </NavLink>
                  </Button>
                  <Button color="inherit">
                    <NavLink to="/myblogs" className="navlink" exact>
                      <strong> My Blogs</strong>
                    </NavLink>
                  </Button>
                </>
              ) : null}

              <Button color="inherit" variant="outlined">
                <NavLink to="/logout" className="navlink" exact>
                  <strong> Logout</strong>
                </NavLink>
              </Button>
            </>
          ) : (
            <Button color="inherit" variant="outlined">
              <NavLink to="/login" className="navlink" exact>
                <strong> Login</strong>
              </NavLink>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;
