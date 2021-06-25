import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core';

import { NavLink } from 'react-router-dom';
import './Blog.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '100px',
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
  blogTitle: {
    margin: '0px',
  },
}));

function Blog({ blog }) {
  const classes = useStyles();

  return (
    <Grid item md={3} xs={12} sm={4}>
      <Card className={classes.paper}>
        <CardContent>
          <Typography variant="h5" className={classes.blogTitle} component="h2">
            {blog.blogName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {blog.stack}
          </Typography>

          <Typography variant="body2" component="p">
            {blog.creator[0].firstName +
              ' ' +
              blog.creator[0].lastName}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <NavLink to={'/blog/' + blog._id} className="read-more" exact>
              Read More
            </NavLink>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

Blog.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    blogName: PropTypes.string.isRequired,
    Creator: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
    description: PropTypes.string.isRequired,
    stack: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
