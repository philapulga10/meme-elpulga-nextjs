import React from 'react';

import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from 'next';

import postService from '../../services/postService';
import { PostType } from '..';
import { getTokenSSRAndCSS } from '../../helpers';

import { HomeSideBar } from "../../components/HomeSidebar";
import { PostDetailContent } from "../../components/PostDetailContent";

type TypeCategory = {
  TAG_ID: string,
  PID: string,
  tag_index: string,
  tag_value: string
};

type PostDetailDataProps = {
  post: PostType,
  categories: TypeCategory[],
  userPosts: PostType[]
};

const PostDetail: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ userPosts, post, categories }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostDetailContent />
        </div>
        <div className="col-lg-4">
          <HomeSideBar userPosts={userPosts} />
        </div>
      </div>
    </div>
  )
};

export const getServerSideProps: GetServerSideProps<PostDetailDataProps> = async (context) => {
  const ctx = (context as unknown) as NextPageContext;
  const [token, userToken] = getTokenSSRAndCSS(ctx);
  const userId = userToken?.id;
  const postId = ctx.query.postId;

  const postDetailPromise = postService.getPostsByPostId({ postId, token });
  const userPostsPromise = postService.getPostsByUserId({ token, userId });

  const [postDetailResponse, userPostsResponse] = await Promise.all([postDetailPromise, userPostsPromise]);

  const props = {
    post: postDetailResponse?.data?.post || null,
    categories: postDetailResponse?.data.categories || [],
    userPosts: userPostsResponse?.posts || []
  };

  return { props };
};

export default PostDetail;
