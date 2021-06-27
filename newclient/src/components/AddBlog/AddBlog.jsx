/* eslint no-underscore-dangle: 0 */

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Button, CssBaseline, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addBlogMutation, getBlogsQuery } from '../../queries/queries';
import { GlobalContext } from '../../context/globalProvider';
import './AddBlog.css';

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
    width: '60%',
    minWidth: '200px',
    marginTop: theme.spacing(3),
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#2e5c4d',
    color: 'white',
  },
  color: {
    color: '#85a399',
    borderColor: '#85a399',
  },
}));

function AddBlog() {
  const [createBlog] = useMutation(addBlogMutation);
  const { token, role, getBlogs } = useContext(GlobalContext);
  const history = useHistory();
  const { loading, data, refetch } = useQuery(getBlogsQuery, {
    variables: { page: 1, limits: 2, search: 'All' },
  });

  const classes = useStyles();

  const [blogName, setBlogName] = useState('');
  const [stack, setStack] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (loading === false && data !== undefined) {
      getBlogs(data.getBlogs.data);
    }
  }, [loading, data]);

  const submitForm = (e) => {
    e.preventDefault();
    if (!blogName || !stack || !image || !description) {
      alert('required');
    }
    createBlog({
      variables: {
        blogName,
        stack,
        description,
        status: 'pending',
      },
      // refetchQueries: [{ query: getBlogsQuery }],
    })
      .then((res) => {
        if (res.data.createBlog.status === 'created') {
          const fd = new FormData();
          fd.append('blogId', res.data.createBlog.data._id);
          fd.append('file', image);
          const headers = {
            Authorization: `bearer ${token}`,
          };
          return axios.post('http://localhost:8080/image/upload', fd, {
            headers,
          });
        }
        throw new Error(res.data.createBlog.error);
        // props.history.push('/');
      })
      .then(async () => {
        await refetch();
        history.push('/');
      })
      .catch((error) => {
        console.log(error.message);
        // props.history.push('/createBlog');
      });
    setBlogName('');
    setStack('');
    setDescription('');
    setImage(null);
  };

  const unathorizedAccess = () => {
    history.push('/');
  };
  return (
    <>
      {role === 'Author' ? (
        <div className="new-blog-container">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} onSubmit={submitForm}>
              <TextField
                className={classes.color}
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Blog Name"
                name="BlogName"
                autoFocus
                value={blogName}
                onChange={(e) => setBlogName(e.target.value)}
              />
              <TextField
                select
                label="Blog Domain"
                className="blog_domain"
                margin="normal"
                autoFocus
                fullWidth
                onChange={(e) => setStack(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                // variant="outlined"
              >
                <option>Select your blog domain</option>
                <option value="Study">Study</option>
                <option value="Research">Research</option>
                <option value="Adventure">Adventure</option>
                <option value="Medical">Medical</option>
                <option value="Programming">Programming</option>
                <option value="Reviews">Movie Review</option>
              </TextField>

              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                fullWidth
                autoFocus
                margin="normal"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                // variant="outlined"
              />
              <Button variant="contained" component="label">
                Upload File
                <input
                  type="file"
                  name="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                // className="submit__button"
                className={classes.submit}
              >
                Post
              </Button>
            </form>
          </div>
        </div>
      ) : unathorizedAccess()}
    </>
  );
}

export default AddBlog;
