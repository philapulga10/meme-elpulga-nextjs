import React from 'react';
import Link from 'next/link';

import { PostType } from '../../pages';
import { useGlobalState } from '../../state';

import { PostItem } from "../PostItem";

type PropsType = {
  userPosts: PostType[]
};

const HomeSideBar: React.FC<PropsType> = ({ userPosts }) => {
  const [userInfo] = useGlobalState('currentUser');

  function renderUserPosts() {
    return (
      userPosts.length === 0 ? (
        <p>Bạn chưa đăng bài viết nào cả. Truy cập <Link href="/posts/create"><a>link</a></Link> để đăng bài viết đầu tiên</p>
      ) : (
        userPosts.map(post => <PostItem key={post.PID} post={post} />)
      )
    );
  }

  return (
    <aside className="ass1-aside">
      <div className="ass1-content-head__t">
        <div>Bài viết gần đây của bạn.</div>
      </div>
      {
        userInfo ? renderUserPosts() : (
          <div>
            Vui lòng đăng nhập để xem nội dung này
            <Link href="/login">
              <a>Đăng nhập</a>
            </Link>
          </div>
        )
      }
    </aside>
  );
}

export default HomeSideBar;
