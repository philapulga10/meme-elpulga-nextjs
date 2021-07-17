import React, { useState } from 'react';

import { PostItem } from "../PostItem";
import { PostType } from '../../pages';
import postService from '../../services/postService';
import { Button } from '../Button';

type PropsType = {
  listPosts: PostType[]
};

const PAGE_SIZE = 1;

const PostListItem: React.FC<PropsType> = (props) => {
  const [listPosts, setListPosts] = useState(props.listPosts);
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function handleLoadMore() {
    if (loading) {
      return;
    }

    setLoading(true);

    postService.getPostsPaging({
      pageSize: PAGE_SIZE,
      currPage: currPage + 1
    }).then((response) => {
      if (response.status === 200) {
        const newPosts = response.posts || [];

        setListPosts([...listPosts, ...newPosts]);

        setCurrPage((preState) => (preState + 1));
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="ass1-section__list">
      {
        listPosts.map(post => <PostItem key={post.PID} post={post} />)
      }
      <Button
        isLoading={loading}
        onClick={handleLoadMore}
        className="load-more ass1-btn"
      >
        <span>Xem thêm</span>
      </Button>
    </div>
  );
};

export default PostListItem;
