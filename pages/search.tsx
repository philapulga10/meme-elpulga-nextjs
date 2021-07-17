import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from 'next';

import Masonry from 'react-masonry-component';

import { PostType } from '.';
import postService from '../services/postService';
import { PostItem } from '../components/PostItem';

type PropTypes = {
  listPosts: PostType[]
};

const SearchPage: NextPage<PropTypes> = ({ listPosts }) => {
  const router = useRouter();
  const searchStr = router.query.q || '';

  useEffect(() => {
    if (!searchStr) {
      router.push('/');
    };
  }, [searchStr]);

  return (
    <div className="container">
      <div style={{ padding: '30px 0' }} className="header-search">
        <h3>Từ khóa tìm kiếm: <strong>{searchStr}</strong></h3>
        <p>Tìm kiếm được ({listPosts.length}) kết quả</p>
      </div>
      <Masonry className="ass1-section__wrap row ass1-section__isotope-init">
        {
          listPosts.map(post => <PostItem key={post.PID} post={post} customClass="col-lg-6" />)
        }
      </Masonry>
    </div>
  );
};

SearchPage.getInitialProps = async (ctx: NextPageContext) => {
  const query = ctx.query.q || '';

  const listPostsResponse = await postService.getPostSearch({ query });

  return {
    listPosts: listPostsResponse.posts || []
  };
};

export default SearchPage;
