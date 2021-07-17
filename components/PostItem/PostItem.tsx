import React from 'react';
import Link from 'next/link';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import vilocal from 'dayjs/locale/vi';

import { PostType } from '../../pages';

type PropsType = {
  post: PostType
  customClass?: string
};

dayjs.extend(relativeTime);

const PostItem: React.FC<PropsType> = ({ post, customClass }) => {
  const timeFormat = dayjs(post.time_added).locale(vilocal).fromNow();
  let className = 'ass1-section__item';

  if (customClass) {
    className = className + ' ' + customClass;
  }

  return (
    <div className={className}>
      <div className="ass1-section">
        <div className="ass1-section__head">
          <Link href="/users/[userId]" as={`/users/${post.USERID}`}>
            <a className="ass1-section__avatar ass1-avatar">
              <img src={post.profilepicture || '/images/avatar-02.png'} alt={post.fullname} />
            </a>
          </Link>
          <div>
            <Link href="/users/[userId]" as={`/users/${post.USERID}`}>
              <a className="ass1-section__name">{post.fullname}</a>
            </Link>
            <span className="ass1-section__passed">{timeFormat}</span>
          </div>
        </div>
        <div className="ass1-section__content">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et inventore obcaecati eum
            deserunt ut, aperiam quas! Placeat blanditiis consequatur, deserunt facere iusto
            amet a ad suscipit laudantium unde quidem perferendis!</p>
          <div className="ass1-section__image">
            <Link href="/posts/[postId]" as={`/posts/${post.PID}`}>
              <a>
                <img src={post.url_image} alt={post.url_image} />
              </a>
            </Link>
          </div>
        </div>
        <div className="ass1-section__footer">
          <Link href="/posts/[postId]" as={`/posts/${post.PID}`}>
            <a className="ass1-section__btn-comment ass1-btn-icon">
              <i className="icon-Comment_Full" />
              <span>{post.count || 0}</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
};

export default PostItem;