import { useState } from "react";

import api from '../services/api';

// interface: khai báo kiểu dữ liệu
// => tránh cho mỗi người develope khai báo kiểu dữ liệu (cụ thể ở đây là object) khác nhau
// hay thứ tự thuộc tính (tên thuộc tính, kiểu dữ liệu) trong đối tượng khác nhau => tránh sai lệch dữ liệu
interface formLogin {
  email: string,
  password: string
};

export default function Login() {
  const initFormData = {
    email: '',
    password: ''
  };
  const [formData, setFormData] = useState<formLogin>(initFormData);

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

    const data = api.callJSON('/member/login.php', formData, 'POST').then((data) => { console.log(data); });

    console.log('data = ', data);
  };

  return (
    <div className="ass1-login">
      <div className="ass1-login__logo">
        <a href="index.html" className="ass1-logo">Elpulga Meme</a>
      </div>
      <div className="ass1-login__content">
        <p>Đăng nhập</p>
        <div className="ass1-login__form">
          <form onSubmit={handleSubmit} action="#">
            <input
              onChange={handleChange('email')}
              type="text"
              value={formData.email}
              className="form-control"
              placeholder="Email"
              required
            />
            <input
              onChange={handleChange('password')}
              type="password"
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