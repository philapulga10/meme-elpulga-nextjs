import React from 'react';

import { PostItem } from "../PostItem";
import { PostType } from '../../pages';

type PropsType = {
  listPosts: PostType[]
};

const PostListItem: React.FC<PropsType> = ({ listPosts }) => {
  console.log('listPosts = ', listPosts);

  return (
    <div className="ass1-section__list">
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <button className="load-more ass1-btn">
        <span>Xem thêm</span>
      </button>
    </div>
  );
};

export default PostListItem;
