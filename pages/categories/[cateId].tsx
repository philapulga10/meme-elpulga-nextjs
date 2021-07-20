import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from "next";

import Masonry from 'react-masonry-component';

import postService from '../../services/postService';
import { PostType } from '..';
import { PostItem } from '../../components/PostItem';
import { useGlobalState } from '../../state';

type PropsType = {
  listPosts: PostType[]
};

const Categories: NextPage<PropsType> = ({ listPosts }) => {
  const router = useRouter();
  const categoryId = router.query.cateId || null;
  const [categories] = useGlobalState('categories');

  useEffect(() => {
    if (!categoryId) {
      router.push('/');
    };
  }, [categoryId]);

  const findText = useMemo(() => {
    const findObj = categories.find((category) => (category.id === Number(categoryId)));

    return findObj?.text || '';
  }, [categories, categoryId]);

  return (
    <div className="container">
      <div style={{ margin: '30px 0' }} className="header-search">
        <h3>Danh mục tìm kiếm: <strong>{findText}</strong></h3>
        <p>Tìm kiếm được ({listPosts.length})</p>
      </div>
      <Masonry className="ass1-section__wrap row ass1-section__isotope-init">
        {
          listPosts.map(post => <PostItem
            key={post.PID}
            post={post}
            customClass="col-lg-6"
          />)
        }
      </Masonry>
    </div>
  );
};

Categories.getInitialProps = async (ctx: NextPageContext) => {
  const tagIndex = (ctx.query.cateId) as string;

  const listPostsResponse = await postService.getPostPagingByCategories({ tagIndex });

  return {
    listPosts: listPostsResponse?.posts || []
  };
};

export default Categories;