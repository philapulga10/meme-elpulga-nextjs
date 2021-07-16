import React from 'react';

import { PostItem } from "../PostItem";
import { PostType } from '../../pages';

type PropsType = {
  listPosts: PostType[]
};

const PostListItem: React.FC<PropsType> = ({ listPosts }) => {
  return (
    <div className="ass1-section__list">
      {
        listPosts.map(post => <PostItem key={post.PID} post={post} />)
      }
      <button className="load-more ass1-btn">
        <span>Xem thêm</span>
      </button>
    </div>
  );
};

export default PostListItem;
