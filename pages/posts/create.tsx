import { useState } from 'react';

import { useGlobalState } from '../../state';
import postService from '../../services/postService';
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
  const [token] = useGlobalState('token');
  const [loading, setLoading] = useState(false);

  const onChangeDetailForm = (key: string, value: any) => {
    setPostData({ ...postData, [key]: value });
  };

  const handleSubmitPost = () => {
    setLoading(true);

    postService
      .createNewPost(postData, token)
      .then(response => {
        console.log("response = ", response);
        if (response.status === 200) {
          alert('Post successful');

          setPostData(initState);
        } else {
          alert(response.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
            loading={loading}
            category={postData.category}
            onChangeDetailForm={onChangeDetailForm}
            handleSubmitPost={handleSubmitPost}
          />
        </div>
      </div>
    </div>
  )
};
