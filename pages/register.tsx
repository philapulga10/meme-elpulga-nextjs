import { useState, useMemo } from 'react';

import Cookies from 'js-cookie';

import { handleError } from '../helpers';
import userService from '../services/userService';
import { useGlobalState } from '../state';
import { useNotAuthen } from '../helpers/useAuthen';
import { Button } from '../components/Button';

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
  useNotAuthen();

  const [registerData, setRegisterData] = useState(initRegisterData);
  const [, setToken] = useGlobalState('token');
  const [, setUserInfo] = useGlobalState('currentUser');
  const [loading, setLoading] = useState(false);

  // bất kể khi nào register data thay đổi thì function trong useMemo sẽ được đánh giá lại và return 1 giá trị mới
  const isValidate = useMemo((): boolean => {
    for (let key in registerData) {
      const error = registerData[key].error;

      if (error !== '') {
        return false;
      }
    }

    return true;
  }, [registerData]);

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

  const handleRegister = (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    if (!isValidate) {
      alert('Invalid input data');

      return;
    }

    const email = registerData.email.value;
    const fullname = registerData.fullname.value;
    const password = registerData.password.value;
    const repassword = registerData.repassword.value;

    const data = {
      email,
      fullname,
      password,
      repassword
    };

    setLoading(true);

    userService
      .register(data)
      .then((response) => {
        if (response.status === 200) {
          setToken(response.token);

          setUserInfo(response.user);

          Cookies.set('token', response.token, { expires: 30 * 12 });
        } else {
          alert(response.error);
        }
      })
      .finally(() => {
        setLoading(false);
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
          <form onSubmit={handleRegister} action="#">
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
              <Button
                isLoading={loading}
                type="submit"
                className="ass1-btn"
              >
                Đăng ký
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
