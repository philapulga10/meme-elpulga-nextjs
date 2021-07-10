import { useState } from 'react';

import { handleError } from '../helpers';

const initRegisterData = {
  fullname: {
    value: '',
    error: ''
  },
  email: {
    value: '',
    error: ''
  },
  password: {
    value: '',
    error: ''
  },
  repassword: {
    value: '',
    error: ''
  }
};

export default function Register() {
  const [registerData, setRegisterData] = useState(initRegisterData);

  const onChangeData = (key: string) => (event: any) => {
    const value = event.target.value;

    const error = handleError(key, value, registerData.password.value);

    setRegisterData({
      ...registerData,
      [key]: {
        value,
        error
      }
    });
  }

  return (
    <div className="ass1-login">
      <div className="ass1-login__logo">
        <a href="index.html" className="ass1-logo">Elpulga Meme</a>
      </div>
      <div className="ass1-login__content">
        <p>Đăng ký một tài khoản</p>
        <div className="ass1-login__form">
          <form action="#">
            <div className="form-group">
              <input
                onChange={onChangeData('fullname')}
                value={registerData.fullname.value}
                type="text"
                className="form-control"
                placeholder="Tên hiển thị"
              />
              {
                registerData.fullname.error && (
                  <small className="form-text text-danger">
                    {registerData.fullname.error}
                  </small>
                )
              }
            </div>
            <div className="form-group">
              <input
                onChange={onChangeData('email')}
                value={registerData.email.value}
                type="email"
                className="form-control"
                placeholder="Email"
              />
              {
                registerData.email.error && (
                  <small className="form-text text-danger">
                    {registerData.email.error}
                  </small>
                )
              }
            </div>
            <div className="form-group">
              <input
                onChange={onChangeData('password')}
                value={registerData.password.value}
                type="password"
                className="form-control"
                placeholder="Mật khẩu"
              />
              {
                registerData.password.error && (
                  <small className="form-text text-danger">
                    {registerData.password.error}
                  </small>
                )
              }
            </div>
            <div className="form-group">
              <input
                onChange={onChangeData('repassword')}
                value={registerData.repassword.value}
                type="password"
                className="form-control"
                placeholder="Nhập lại mật khẩu"
              />
              {
                registerData.repassword.error && (
                  <small className="form-text text-danger">
                    {registerData.repassword.error}
                  </small>
                )
              }
            </div>
            <div className="ass1-login__send">
              <a href="dang-nhap.html">Đăng nhập</a>
              <button type="submit" className="ass1-btn">Đăng ký</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};