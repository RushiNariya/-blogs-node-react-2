/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
// import React from 'react';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import { Grid } from '@material-ui/core';
import {
  getBlogsByCreatorQuery,
  toggleLikeMutation,
  deleteBlogMutation,
} from '../../../queries/queries';
import { GlobalContext } from '../../../context/globalProvider';
import Pagination from '../../Pagination/Pagination';
import BLogFilter from '../BLogFilter/BLogFilter';
import Blog from '../Blog';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginBottom: '10px',
  },
}));
function MyBlogs() {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [postsPerPage, setPostsPerPage] = useState(2);
  // const [loading, setLoading] = uLeState(false);
  const [search, setSearch] = useState('All');

  const { articles, getBlogs } = useContext(GlobalContext);

  const { loading, data, refetch } = useQuery(getBlogsByCreatorQuery, {
    variables: { page: currentPage, limits: postsPerPage, search },
  });
  const [toggleLike] = useMutation(toggleLikeMutation);
  const [deleteBlog] = useMutation(deleteBlogMutation);

  const toggleLikeFunction = (blogId) => {
    toggleLike({
      variables: {
        blogId,
      },
      refetchQueries: [{ query: getBlogsByCreatorQuery }],
    })
      .then((res) => {
        console.log(res.data.toggleLike.error);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const deleteBlogById = (id) => {
    console.log('inside delete handler!');
    deleteBlog({
      variables: {
        id,
      },
    })
      .then(async (res) => {
        console.log(res);
        await refetch();
        // console.log(res.data.toggleLike.error);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const setFilterSearch = (keyword) => {
    setSearch(keyword);
  };

  const refetchQuery = async () => {
    await refetch();
  };
  useEffect(() => {
    refetchQuery();
  }, [search]);

  useEffect(() => {
    if (loading === false && data !== undefined) {
      console.log(data);
      getBlogs(data?.getBlogsByCreator?.data?.blogs);
    }
    if (loading === false && data?.getBlogsByCreator?.error) {
      console.log(data?.getBlogsByCreator.error);
    }
  }, [loading, data]);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  const nextPage = () => setCurrentPage((recurrentPage) => recurrentPage + 1);

  const prevPage = () => setCurrentPage((recurrentPage) => recurrentPage - 1);
  return (
    <>
      <div className="bloglist__container">
        <div>
          <div className={classes.root}>
            {loading ? (
              <>
                {/* <div>Loading Blogs...</div> */}
                <Blog
                  // key={blog._id}
                  loading="loading"
                  blog={null}
                  myBlog="myblogs"
                  toggleLikeOnClick={null}
                    // deleteBlogHandler={null}
                />
              </>
            ) : articles?.length ? (
              articles?.map((blog) => (
                <Blog
                  key={blog._id}
                  myBlog="myblogs"
                  blog={blog}
                  toggleLikeOnClick={toggleLikeFunction}
                  deleteBlogHandler={deleteBlogById}
                />
              ))
            ) : (
              <Blog
                // key={blog._id}
                blog={null}
                myBlog="myblogs"
                toggleLikeOnClick={null}
                // deleteBlogHandler={null}
              />
            )}
          </div>
          <div className="blog__pagination">
            {loading ? null : articles?.length ? (
              <Pagination
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                totalPosts={data?.getBlogsByCreator?.data?.totalBlog}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            ) : null}
          </div>
        </div>
        <div className="multi__serach">
          <BLogFilter setFilter={setFilterSearch} search={search} />
        </div>
      </div>
    </>
  );
}

export default MyBlogs;
