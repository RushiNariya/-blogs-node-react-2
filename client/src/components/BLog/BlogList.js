import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { getBlogsQuery } from '../../queries/queries';
import { GlobalContext } from '../../context/globalProvider';
import Blog from './Blog';
import './Blog.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '10px',
  },
}));

function BlogList() {
  const classes = useStyles();

  const { articles, getBlogs } = useContext(GlobalContext);

  const { data, loading } = useQuery(getBlogsQuery);
  console.log(data)
  useEffect(() => {
    if (loading === false) {
      // getBlogs(data.getBlogs);
      console.log(data)

    }
  }, [loading, data]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {loading ? (
          <div>Loading Blogs...</div>
        ) : (
          articles?.map((blog) => {
            return <Blog key={blog.id} blog={blog} />;
          })
        )}
      </Grid>
    </div>
  );
}

export default BlogList;
