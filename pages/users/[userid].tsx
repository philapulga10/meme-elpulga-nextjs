import { useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";

import userService from "../../services/userService";
import postService from "../../services/postService";
import { PostType } from "..";
import { TypeUser } from "../../state";
import { getTokenSSRAndCSS } from "../../helpers";
import { useAuthen } from "../../helpers/useAuthen";
import { UserDetailInfo } from "../../components/UserDetailInfo";
import { UserDetailPosts } from "../../components/UserDetailPosts";

type PropsType = {
  userDetailInfo: TypeUser
  userDetailPosts: PostType[]
};

const UserDetail: NextPage<PropsType> = ({ userDetailInfo, userDetailPosts }) => {
  useAuthen();

  const router = useRouter();

  useEffect(() => {
    if (!userDetailInfo) {
      alert('User does not exist!!!');

      router.push('/');
    }
  }, [userDetailInfo]);

  return (
    <div className="container">
      <UserDetailInfo userDetailInfo={userDetailInfo} postCount={userDetailPosts.length} />
      <UserDetailPosts userDetailPosts={userDetailPosts} />
    </div>
  )
};

UserDetail.getInitialProps = async (ctx: NextPageContext) => {
  const userId = ctx.query.userid as string;
  const [token] = getTokenSSRAndCSS(ctx);

  const userPromise = userService.getUserById(userId);
  const postPromise = postService.getPostsByUserId({ token, userId });

  const [userResponse, postResponse] = await Promise.all([userPromise, postPromise]);

  return {
    userDetailInfo: userResponse?.user || null,
    userDetailPosts: postResponse?.posts || []
  };
};

export default UserDetail;
