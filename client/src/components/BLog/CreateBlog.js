import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { addBlogMutation, getBlogsQuery } from '../../queries/queries';
import { Button, CssBaseline, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import './Navigation.css';
import './Blog.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '70%',
    minWidth: '200px',
    marginTop: theme.spacing(1),
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '10px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#541d36',
    color: 'white',
  },
}));

function CreateBlog(props) {
  const [createBlog] = useMutation(addBlogMutation);

  const classes = useStyles();

  const [blogName, setBlogName] = useState('');
  const [language, setLanguage] = useState('');
  const [stack, setStack] = useState('');
  const [authorFirstName, setAuthorFirstName] = useState('');
  const [authorLastName, setAuthorLastName] = useState('');
  const [profession, setProfession] = useState('');
  const [description, setDescription] = useState('');

  const submitForm = (e) => {
    e.preventDefault();

    createBlog({
      variables: {
        blogName: blogName,
        stack: stack,
        language: language,
        firstName: authorFirstName,
        lastName: authorLastName,
        experience: 2,
        profession: profession,
        description: description,
      },
      refetchQueries: [{ query: getBlogsQuery }],
    })
      .then(() => {
        props.history.push('/');
      })
      .catch(() => {
        props.history.push('/createBlog');
      });
    setBlogName('');
    setLanguage('');
    setStack('');
    setAuthorLastName('');
    setAuthorFirstName('');
    setProfession('');
    setDescription('');
  };

  return (
    <div className="new-blog-container">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={submitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Blog Name"
            name="BlogName"
            autoFocus
            defaultValue={blogName}
            onChange={(e) => setBlogName(e.target.value)}
          />
          <TextField
            select
            label="Blog Domain"
            className="blog_domain"
            margin="normal"
            autoFocus
            onChange={(e) => setStack(e.target.value)}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            <option>Select your blog domain</option>
            <option value="Study">Study</option>
            <option value="Research">Research</option>
            <option value="Adventure">Adventure</option>
            <option value="Medical">Medical</option>
            <option value="Programming">Programming</option>
            <option value="Movie Review">Movie Review</option>
          </TextField>
          <TextField
            select
            label="Choose Language"
            className="blog_domain"
            onChange={(e) => setLanguage(e.target.value)}
            autoFocus
            margin="normal"
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            <option>Select blog language</option>
            <option value="English">English</option>
            <option value="Dutch">Dutch</option>
            <option value="French">French</option>
            <option value="Swedish">Swedish</option>
            <option value="Gernman">German</option>
          </TextField>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="email"
            className="blog_domain"
            label="Author First Name"
            onChange={(e) => setAuthorFirstName(e.target.value)}
            name="AuthorFirstName"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            className="blog_domain"
            label="Author Last Name"
            onChange={(e) => setAuthorLastName(e.target.value)}
            name="AuthorLastName"
            autoFocus
          />{' '}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Author's Profession"
            onChange={(e) => setProfession(e.target.value)}
            name="AuthorProfession"
            autoFocus
          />{' '}
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            fullWidth
            autoFocus
            margin="normal"
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Post
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
