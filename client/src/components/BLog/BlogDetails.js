import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { getBlogQuery } from '../../queries/queries';
import { GlobalContext } from '../../context/globalProvider';
import './Blog.css';

function BlogDetails(props) {
  const { article, getBlogById } = useContext(GlobalContext);

  const id = props.match.params.id;
  const { data, loading } = useQuery(getBlogQuery, {
    variables: { id: id },
  });

  useEffect(() => {
    if (loading === false) {
      getBlogById(data.getBlog);
    }
  }, [loading, data]);

  return (
    <div className="blog-details-container">
      <div className="blog-details-title">
        <h1>{article && article.blogName}</h1>
        <hr />
      </div>
      <article className="blog-details-domain">
        <h3>Subject : {article && article.stack}</h3>
        <br />
        {article?.description}
        <br />
        <h3>
          Written By:{' '}
          {article?.creator[0]?.firstName + ' ' + article?.creator[0]?.lastName}
        </h3>
        <i>{article?.creator[0]?.profession}</i>
      </article>
    </div>
  );
}

export default BlogDetails;
