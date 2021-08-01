import React, { useRef } from 'react';

type PropsType = {
  obj_image: {
    base64: string,
    file: File | null
  },
  url_image: string,
  post_content: string,
  onChangeDetailForm: (key: string, value: any) => void
};

const PostDetailForm: React.FC<PropsType> = ({
  obj_image,
  url_image,
  post_content,
  onChangeDetailForm
}) => {
  const inputFileEl = useRef(null);

  const handleOnChange = (key: string) => (event) => {
    const value = event.target.value;

    onChangeDetailForm(key, value);
  };

  const handleClickSelectFile = () => {
    inputFileEl.current.click();
  };

  const handleChangeFile = (event) => {
    const listFiles = event.target.files;

    if (listFiles.length === 0) {
      return;
    };

    const file = listFiles[0] as File;

    if (/\/(jpe?g|png|gif|bmp)$/i.test(file.type)) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        onChangeDetailForm('obj_image', {
          file,
          base64: reader.result as string
        });
      }, false);

      reader.readAsDataURL(file);
    } else {
      alert('Invalid file!!!');
    }
  };

  const imageURL = url_image || obj_image.base64 || '/images/no_image_available.jpg';

  return (
    <div className="ass1-section ass1-section__edit-post">
      <div className="ass1-section__content">
        <form action="#">
          <div className="form-group">
            <input
              onChange={handleOnChange('url_image')}
              value={url_image}
              type="text"
              className="form-control ttg-border-none"
              placeholder="https://"
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleOnChange('post_content')}
              value={post_content}
              className="form-control ttg-border-none"
              placeholder="Mô tả ..."
            />
          </div>
        </form>
        <input
          style={{ display: 'none' }}
          onChange={handleChangeFile}
          ref={inputFileEl}
          type="file"
        />
        <div className="ass1-section__image">
          <a href="#">
            <img src={imageURL} alt="default" />
          </a>
        </div>
        <a
          href="https://memeful.com/"
          target="_blank"
          className="ass1-btn ass1-btn-meme"
        >
          Chế ảnh từ meme
        </a>
        <button
          onClick={handleClickSelectFile}
          className="ass1-btn ass1-btn-meme"
        >
          Đăng ảnh từ máy tính
        </button>
      </div>
    </div>
  )
};

export default PostDetailForm;
