/* eslint-disable react/require-default-props */
/* eslint no-underscore-dangle: 0 */
/* eslint-disable-line prefer-template */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import { red } from '@material-ui/core/colors';
import {
  // Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  CardHeader,
  CardMedia,
  Avatar,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../context/globalProvider';
import './Blog.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '100px',
  },
  // root: {
  //   maxWidth: 745,
  //   minWidth: 249,
  //   marginTop: '10px',
  // },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
  blogTitle: {
    margin: '0px',
  },
  avatar: {
    backgroundColor: '#85a399',
  },
  iconColor: {
    color: 'red',
  },
  media: {
    height: '200px',
    width: '200px',
    borderRadius: '10px',
    objectFit: 'contain',
    paddingTop: '56.25%', // 16:9
  },
}));

function Blog({ blog, toggleLikeOnClick, loading }) {
  const { userId, token } = useContext(GlobalContext);

  const classes = useStyles();
  if (loading) {
    return (
      <div className="blog__card_root_container no__blogs">Loading...</div>
    );
  }
  return (
    <>
      {blog ? (
        <Card className="blog__card_root_container">
          <CardHeader
            avatar={
              (
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {blog.creator.firstName[0].toUpperCase()}
                </Avatar>
              )
            }
            title={`${blog.creator.firstName} ${blog.creator.lastName}`}
            subheader={`related to ${blog.stack}`}
          />
          <div className="blog__body">
            <div className="blog__body_content">
              <CardContent>
                <Typography
                  variant="h5"
                  className={classes.blogTitle}
                  component="h2"
                >
                  {blog.blogName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {blog.stack}
                </Typography>
                {/* <Typography variant="body2" component="p">
              </Typography> */}
                <Typography className={classes.pos} color="textSecondary">
                  {blog.description.substring(0, 200)}
                  ...
                </Typography>
              </CardContent>
            </div>
            <div className="blog__body_media">
              <CardMedia
                className={classes.media}
                image={`http://localhost:8080/static/${blog.image}`}
                title="Paella dish"
              />
            </div>
          </div>
          <CardActions>
            {token && (
              <IconButton
                aria-label="add to favorites"
                onClick={() => toggleLikeOnClick(blog._id)}
              >
                {blog.likes.find(
                  (like) => like._id.toString() === userId.toString(),
                ) ? (
                  <FavoriteIcon className={classes.iconColor} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                {blog.likes.length}
              </IconButton>
            )}
            <Button size="small">
              <NavLink to={`/blog/${blog._id}`} className="read-more" exact>
                Read More
              </NavLink>
            </Button>
          </CardActions>
        </Card>
      ) : (
        <div className="blog__card_root_container no__blogs">no blogs</div>
      )}
    </>
  );
}

Blog.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    blogName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
    description: PropTypes.string.isRequired,
    stack: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf({
      _id: PropTypes.string,
    }),
    comments: PropTypes.arrayOf({
      creatorId: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
    }),
  }),
  toggleLikeOnClick: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  loading: PropTypes.string,
};

export default Blog;