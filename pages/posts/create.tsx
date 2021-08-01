import { useState } from 'react';

import { PostDetailForm } from "../PostDetailForm";
import { PostDetailSidebar } from "../PostDetailSidebar";
import { useAuthen } from '../../helpers/useAuthen';

const initState = {
  obj_image: {
    file: null,
    base64: ''
  },
  url_image: '',
  post_content: '',
  category: []
};

export default function PostCreate() {
  useAuthen();

  const [postData, setPostData] = useState(initState);
  const onChangeCategory = (newCategory: string[]) => {
    setPostData({ ...postData, category: newCategory });
  };

  console.log('category = ', postData.category);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostDetailForm />
        </div>
        <div className="col-lg-4">
          <PostDetailSidebar
            category={postData.category}
            onChangeCategory={onChangeCategory}
          />
        </div>
      </div>
    </div>
  )
};
