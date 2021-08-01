import React from 'react';

import { useGlobalState } from '../../state';

type PropsType = {
  category: string[],
  onChangeCategory: (a: string[]) => void
};

const PostDetailSidebar: React.FC<PropsType> = ({ category, onChangeCategory }) => {
  const [categories] = useGlobalState('categories');

  const handleOnChange = (event) => {
    const isCheck = event.target.checked;
    const value = event.target.value;
    const findIdx = category.findIndex(cateId => cateId === value);
    const isExisting = (findIdx !== -1);

    // nếu category không tồn tại id này và người dùng check vào checkbox ==> push vào category
    if (!isExisting && isCheck) {
      // chú ý chỗ này: khi push vào array gốc => sẽ không thay đổi địa chỉ của array ==> phải clone
      onChangeCategory([ ...category, value ]); // ==> push vào 1 category ==> clone ra 1 array mới
    } else if (!isCheck) {
      // nếu isCheck === false ==> không biết nó tồn tại hay không ==> vẫn remove
      onChangeCategory(category.filter(id => id !== value)); // chú ý: hàm filter đã làm thay đổi địa chỉ của array gốc vì nó không làm thay đổi array cũ mà return hẳn về array mới
    }
  };

  return (
    <aside className="ass1-aside ass1-aside__edit-post">
      <div>
        <a href="#" className="ass1-btn">Đăng bài</a>
      </div>
      <div className="ass1-aside__edit-post-head">
        <span style={{ display: 'block', width: '100%', marginBottom: '10px' }}>Chọn danh mục</span>
        {
          categories.map((cate) => {
            return (
              <label key={cate.id} className="ass1-checkbox">
                <input onChange={handleOnChange} type="checkbox" name="state-post" value={cate.id} />
                <span />
                <p>{cate.text}</p>
              </label>
            )
          })
        }
      </div>
      <div className="ass1-aside__get-code">
        <p>Share Link</p>
      </div>
      <div className="ass1-aside__social">
        <a href="/" className="ass1-btn-social__facebook ass1-btn-social">
          <i className="fa fa-facebook" aria-hidden="true" />
        </a>
        <a href="/" className="ass1-btn-social__twitter ass1-btn-social">
          <i className="fa fa-twitter" aria-hidden="true" />
        </a>
        <a href="/" className="ass1-btn-social__google ass1-btn-social">
          <i className="fa fa-google-plus" aria-hidden="true" />
        </a>
      </div>
    </aside>
  )
};

export default PostDetailSidebar;
