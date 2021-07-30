import React, { useState, useRef } from 'react';
import userService from '../../services/userService';

import { useGlobalState } from "../../state";

export default function UserProfile() {
  const [currentUser, setCurrentUser] = useGlobalState('currentUser');
  const [user, setUser] = useState(currentUser);
  const [objFile, setObjFile] = useState({ file: null, base64URL: '' });
  const [token] = useGlobalState('token');
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
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        // reader.result: convert image file to base64 string
        setObjFile({
          file,
          base64URL: reader.result as string
        });
      }, false);

      reader.readAsDataURL(file);
    } else {
      alert("Invalid file!!!");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      fullname: user.fullname,
      gender: user.gender,
      description: user.description,
      avatar: objFile.file
    };

    userService
      .uploadProfile(data, token)
      .then((response) => {
        if (response.status === 200) {
          setCurrentUser(response.user);

          alert('Successfully changed profile information');
        } else {
          alert(response.error);
        }
      })
  }

  const avatarURL = objFile.base64URL || user.profilepicture || '/images/avatar-02.png';

  return (
    <div className="ass1-login">
      <div className="ass1-login__content">
        <p>Profile</p>
        <div className="ass1-login__form">
          <div onClick={handleSelectFile} className="avatar">
            <img src={avatarURL} alt="" />
          </div>
          <form onSubmit={handleSubmit} action="#">
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
              value={user.gender}
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
              value={user.description}
              className="form-control"
              cols={30}
              rows={5}
              placeholder="Mô tả ngắn ..."
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