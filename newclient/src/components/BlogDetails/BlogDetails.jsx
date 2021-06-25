import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  Paper,
  Grid,
  Avatar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  getBlogQuery,
  addCommentMutation,
  // getBlogsQuery,
} from '../../queries/queries';
import { GlobalContext } from '../../context/globalProvider';
import './BlogDetails.css';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '60%',
    minWidth: '200px',
    margin: 'auto',
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
  root: {
    flexGrow: 2,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    // maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

function BlogDetails({ match }) {
  const classes = useStyles();
  const [addComment] = useMutation(addCommentMutation);

  const { article, getBlogById } = useContext(GlobalContext);
  const history = useHistory();
  const [comment, setComment] = useState('');

  // console.log(article);
  const { id } = match.params;
  const { data, loading } = useQuery(getBlogQuery, {
    variables: { id },
  });

  useEffect(() => {
    if (loading === false && data.getBlog.status === 'success') {
      getBlogById(data.getBlog.data);
    }
    if (loading === false && data.getBlog.status === 'error') {
      getBlogById(null);
      history.replace('/login');
    }
  }, [loading, data]);

  const submitForm = (e) => {
    e.preventDefault();
    if (!comment) {
      alert('required!!!');
    }
    addComment({
      variables: {
        comment,
        blogId: id,
      },
      refetchQueries: [{ query: getBlogQuery, variables: { id } }],
    })
      .then((res) => {
        console.log(res);
        // props.history.push('/');
      })
      .catch((error) => {
        console.log(error.message);
        // props.history.push('/createBlog');
      });
    setComment('');
  };

  if (loading === true) {
    return <p>Loading...</p>;
  }
  return (
    <div className="blog-details-container">
      <div className="blog-details-title">
        <h1>{article && article.blogName}</h1>
        <hr />
      </div>
      <div>
        <center>
          <img
            src={`http://localhost:8080/static/${article?.image}`}
            alt="blog"
            className="responsive"
          />
        </center>
      </div>
      <hr />
      <article className="blog-details-domain">
        <h3>Subject :{article && article.stack}</h3>
        <br />
        {article?.description}
        <br />
        <br />
        <h4>
          Written By:
          {`${article?.creator?.firstName} ${article?.creator?.lastName}`}
        </h4>
        <i>{article?.creator?.profession}</i>
      </article>
      <hr />
      <h4>Comments</h4>
      <form className={classes.form} onSubmit={submitForm}>
        <TextField
          id="outlined-multiline-static"
          label="Comment Here"
          multiline
          margin="normal"
          rows={4}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          // variant="outlined"
        />
        <Button type="submit" variant="contained" className={classes.submit}>
          Post
        </Button>
      </form>
      {article?.comments?.length
        ? article.comments.map((comm) => (
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar>{comm.creatorId.firstName[0]}</Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">{`${comm.creatorId.firstName} ${comm.creatorId.lastName}`}</Typography>
                    <Typography>{comm.comment}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          ))
        : null}
    </div>
  );
}

BlogDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BlogDetails;

// {/* <div class="action d-flex justify-content-between mt-2 align-items-center"></div> */}
