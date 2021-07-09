import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

import fetch from 'isomorphic-fetch';
import { useGlobalState } from "../state";
import { useNotAuthen } from "../helpers/useAuthen";

// interface: khai báo kiểu dữ liệu
// => tránh cho mỗi người develope khai báo kiểu dữ liệu (cụ thể ở đây là object) khác nhau
// hay thứ tự thuộc tính (tên thuộc tính, kiểu dữ liệu) trong đối tượng khác nhau => tránh sai lệch dữ liệu
interface formLogin {
  email: string,
  password: string
};

export default function Login() {
  useNotAuthen();
  const initFormData = {
    email: '',
    password: ''
  };
  const [formData, setFormData] = useState<formLogin>(initFormData);
  const router = useRouter();
  const [userInfo] = useGlobalState('currentUser');
  const errorString = router.query.error;

  useEffect(() => {
    console.log('userInfo Login Page: ', userInfo);
  }, []);

  useEffect(() => {
    if (errorString) {
      alert('Login Unsuccessful');

      window.history.pushState({}, document.title, "/login");
    }
  }, [errorString]);

  const handleChange = (key) => {
    // closure trong JS
    return (event) => {
      setFormData({
        ...formData,
        [key]: event.target.value
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data = ', data);

        // Cookies.set('token', data.token, { expires: 30 });

        // router.push('/');
      });
  };

  function handleSubmitForm(event) {
    event.preventDefault();

    event.target.submit();
  }

  return (
    <div className="ass1-login">
      <div className="ass1-login__logo">
        <a href="index.html" className="ass1-logo">Elpulga Meme</a>
      </div>
      <div className="ass1-login__content">
        <p>Đăng nhập</p>
        <div className="ass1-login__form">
          {/* <form onSubmit={handleSubmit} action="#"> */}
          <form onSubmit={handleSubmitForm} action="/api/login" method="POST">
            <input
              // onChange={handleChange('email')}
              type="text"
              name="email"
              // value={formData.email}
              className="form-control"
              placeholder="Email"
              required
            />
            <input
              // onChange={handleChange('password')}
              type="password"
              name="password"
              // value={formData.password}
              className="form-control"
              placeholder="Mật khẩu"
              required
            />
            <div className="ass1-login__send">
              <a href="dang-ky.html">Đăng ký một tài khoản</a>
              <button type="submit" className="ass1-btn">Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
