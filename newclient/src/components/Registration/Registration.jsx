import React, { useState } from 'react';
import { Button, CssBaseline, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { NavLink, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// import { GlobalContext } from '../../context/globalProvider';
import { getBlogsQuery, registerUserMutation } from '../../queries/queries';
import './Registration.css';

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
    minHeight: '500px',
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

function Registration() {
  const [createCreator] = useMutation(registerUserMutation);
  const history = useHistory();

  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profession, setProfession] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const submitForm = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // eslint-disable-next-line no-alert
      alert('password and confirm password not matched!!!');
      return;
    }

    createCreator({
      variables: {
        userId: 'aa',
        firstName,
        lastName,
        profession,
        email,
        password,
        role,
      },
      refetchQueries: [{ query: getBlogsQuery }],
    })
      .then((res) => {
        if (res.data.createCreator.status === 'created') {
          history.replace('/login');
        } else {
          throw new Error(res.data.createCreator.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
        // props.history.push('/Registration');
      });
    setFirstName('');
    setLastName('');
    setProfession('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('');
  };

  return (
    <div className="new-blog-container">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={submitForm}>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <hr />
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                // variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                id="profession"
                label="Profession"
                name="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Role"
                fullWidth
                onChange={(e) => setRole(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                // variant="outlined"
              >
                <option>select one</option>
                <option value="User">User</option>
                <option value="Author">Author</option>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to="/login" exact>
                already a user ? login
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default Registration;
