import React, { useEffect } from 'react';

import { PostListItem } from "../components/PostListItem";
import { HomeSideBar } from "../components/HomeSidebar";

import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from 'next';
import { getTokenSSRAndCSS } from '../helpers';
import postService from '../services/postService';

export type PostType = {
  userId: string,
  fullname: string,
  profilePicture: string,
  urlImage: string,
  pId: string,
  postContent: string,
  timeAdded: string,
  status: string,
  count: string | null
};

type HomeDataProps = {
  listPosts: PostType[],
  userPosts: PostType[]
};

const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ listPosts, userPosts }) => {
  useEffect(() => {
    console.log('listPosts = ', listPosts);
    console.log('userPosts = ', userPosts);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostListItem listPosts={listPosts} />
        </div>
        <div className="col-lg-4">
          <HomeSideBar userPosts={userPosts} />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeDataProps> = async (context) => {
  const ctx = (context as unknown) as NextPageContext;
  const [token, userToken] = getTokenSSRAndCSS(ctx);
  const userId = userToken?.id;

  // cần tìm hiểu kỹ chỗ này vì sao thời gian chờ ở đây là tổng 2 api
  const listPostsPromise = await postService.getPostsPaging();
  const userPostsPromise = await postService.getPostsByUserId({ token, userId });

  // ==> cho chạy đồng thời => tiết kiệm thời gian
  const [listPostsResponse, userPostsResponse] = await Promise.all([listPostsPromise, userPostsPromise]);

  return {
    props: {
      listPosts: listPostsResponse?.posts || [],
      userPosts: userPostsResponse?.posts || []
    }
  };
};

export default Home;