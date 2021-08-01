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

  const onChangeDetailForm = (key: string, value: any) => {
    setPostData({ ...postData, [key]: value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostDetailForm
            obj_image={postData.obj_image}
            url_image={postData.url_image}
            post_content={postData.post_content}
            onChangeDetailForm={onChangeDetailForm}
          />
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
