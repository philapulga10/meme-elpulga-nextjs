import React, { useState, useRef } from 'react';

import { useGlobalState } from "../../state";

export default function UserProfile() {
  const [currentUser] = useGlobalState('currentUser');
  const [user, setUser] = useState(currentUser);
  const inputElement = useRef(null);

  const handleOnChange = (key: string) => (event) => {
    setUser({ ...user, [key]: event.target.value });
  };

  const handleSelectFile = () => {
    inputElement.current.click();
  };

  const handleChangeFile = (event) => {
    const listFiles = event.target.files;

    if (listFiles.length === 0) { // chỉ mở lên chứ không chọn file
      return;
    }

    const file = listFiles[0] as File;

    if (/\/(jpe?g|png|gif|bmp)$/i.test(file.type)) {

    } else {
      alert("Invalid file!!!");
    }
  };

  return (
    <div className="ass1-login">
      <div className="ass1-login__content">
        <p>Profile</p>
        <div className="ass1-login__form">
          <div onClick={handleSelectFile} className="avatar">
            <img src={user.profilepicture || '/images/avatar-02.png'} alt="" />
          </div>
          <form action="#">
            <input
              onChange={handleOnChange('fullname')}
              type="text"
              value={user.fullname}
              className="form-control"
              placeholder="Tên ..." required
            />
            <select
              onChange={handleOnChange('gender')}
              className="form-control"
            >
              <option value="">Giới tính</option>
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
            </select>
            <input
              style={{ display: 'none' }}
              onChange={handleChangeFile}
              ref={inputElement}
              type="file"
              name="avatar"
              placeholder="Ảnh đại diện"
              className="form-control"
            />
            <textarea
              onChange={handleOnChange('description')}
              className="form-control"
              cols={30}
              rows={5}
              placeholder="Mô tả ngắn ..."
              defaultValue={""}
            />
            <div className="ass1-login__send justify-content-center">
              <button type="submit" className="ass1-btn">Cập nhật</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};