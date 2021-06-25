/* eslint-disable no-nested-ternary */
/* eslint no-underscore-dangle: 0 */

import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import { Grid } from '@material-ui/core';
import { getBlogsQuery, toggleLikeMutation } from '../../../queries/queries';
import { GlobalContext } from '../../../context/globalProvider';
import Pagination from '../../Pagination/Pagination';
import BLogFilter from '../BLogFilter/BLogFilter';
import Blog from '../Blog';
// eslint-disable-next-line import/no-unresolved
import './BlogList.css';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginBottom: '10px',
  },
}));

function BlogList() {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [postsPerPage, setPostsPerPage] = useState(2);
  // const [loading, setLoading] = uLeState(false);
  const [search, setSearch] = useState('All');

  const { articles, getBlogs } = useContext(GlobalContext);

  const { loading, data, refetch } = useQuery(getBlogsQuery, {
    variables: { page: currentPage, limits: postsPerPage, search },
  });
  const [toggleLike] = useMutation(toggleLikeMutation);

  const toggleLikeFunction = (blogId) => {
    toggleLike({
      variables: {
        blogId,
      },
      refetchQueries: [{ query: getBlogsQuery }],
    })
      .then((res) => {
        console.log(res.data.toggleLike.error);
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
      getBlogs(data.getBlogs.data.blogs);
    }
    if (loading === false && data?.getBlogs?.error) {
      console.log(data.getBlogs.error);
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
                  toggleLikeOnClick={null}
                />
              </>
            ) : articles?.length ? (
              articles?.map((blog) => (
                <Blog
                  key={blog._id}
                  blog={blog}
                  toggleLikeOnClick={toggleLikeFunction}
                />
              ))
            ) : (
              <Blog
                // key={blog._id}
                blog={null}
                toggleLikeOnClick={null}
              />
            )}
          </div>
          <div className="blog__pagination">
            {loading ? null : articles?.length ? (
              <Pagination
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                totalPosts={data?.getBlogs?.data?.totalBlog}
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

export default BlogList;
