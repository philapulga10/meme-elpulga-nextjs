import React, { useEffect } from 'react';

import { PostListItem } from "../components/PostListItem";
import { HomeSideBar } from "../components/HomeSidebar";

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export type PostType = {
  USERID: string,
  fullname: string,
  profilepicture: string,
  url_image: string,
  PID: string,
  post_content: string,
  time_added: string,
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
  return {
    props: {
      listPosts: [],
      userPosts: []
    }
  };
};

export default Home;