import { useState } from "react";

import { useGlobalState } from "../../state";

import { useAuthen } from "../../helpers/useAuthen";
import userService from "../../services/UserService";

const initState = {
  oldPassword: '',
  newPassword: '',
  reNewPassword: ''
};

const UserChangePassword = () => {
  useAuthen();

  const [formData, setFormData] = useState(initState);
  const [token] = useGlobalState('token');

  const handleChange = (key: string) => (event) => {
    setFormData({ ...formData, [key]: event.target.value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    userService
      .changePassword(formData, token)
      .then(response => {
        if (response.status === 200) {
          alert('Change password successfully');

          setFormData(initState);
        } else {
          alert(response.error);
        }
      });
  };

  return (
    <div className="ass1-login">
      <div className="ass1-login__content">
        <p>Đổi mật khẩu</p>
        <div className="ass1-login__form">
          <form onSubmit={handleOnSubmit} action="#">
            <input
              value={formData.oldPassword}
              onChange={handleChange('oldPassword')}
              type="password"
              className="form-control"
              placeholder="Mật khẩu cũ"
              required
            />
            <input
              value={formData.newPassword}
              onChange={handleChange('newPassword')}
              type="password"
              className="form-control"
              placeholder="Mật khẩu mới"
              required
            />
            <input
              value={formData.reNewPassword}
              onChange={handleChange('reNewPassword')}
              type="password"
              className="form-control"
              placeholder="Xác nhận mật khẩu mới"
              required
            />
            <div className="ass1-login__send justify-content-center">
              <button type="submit" className="ass1-btn">Gửi</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default UserChangePassword;
