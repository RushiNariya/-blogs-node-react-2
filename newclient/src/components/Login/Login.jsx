import React, { useContext, useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/client';
import { Button, CssBaseline, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { loginUserMutation } from '../../queries/queries';
import { GlobalContext } from '../../context/globalProvider';
import './Login.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '60%',
    minWidth: '250px',
    minHeight: '320px',
    marginTop: theme.spacing(5),
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#2e5c4d',
    color: 'white',
  },
}));

function Login() {
  const client = useApolloClient();

  const { userLogin } = useContext(GlobalContext);
  const history = useHistory();

  const [loginUser] = useMutation(loginUserMutation);

  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const clearCache = async () => {
      client.stop();
      await client.clearStore();
    };
    clearCache();
  }, [client]);

  const submitForm = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('required!!!');
    }
    loginUser({
      variables: {
        email,
        password,
      },
      // refetchQueries: [{ query: getBlogsQuery }],
    })
      .then((res) => {
        console.log(res);
        const { token, id, role } = res.data.loginUser.data;
        if (res.data.loginUser.status === 'success') {
          userLogin({
            token,
            id,
            role,
          });
          history.replace('/');
        } else {
          throw new Error(res.data.loginUser.error);
        }
        // props.history.push('/');
      })
      .catch((error) => {
        console.log(error.message);
      });
    setEmail('');
    setPassword('');
  };

  return (
    <div className="new-blog-container">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={submitForm}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <hr />
          <TextField
            // variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            // variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to="/registration" exact>
                New here? Registration
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default Login;
