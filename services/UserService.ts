import api from './api';

type RegisterData = {
  fullname: string,
  email: string,
  password: string,
  repassword: string
};

const userService = {
  getUserById: async (userId: string) => {
    return api.callJSON(`member/member.php?userid=${userId}`);
  },
  register: async (data: RegisterData) => {
    return api.callJSON('member/register.php', {
      data,
      method: 'POST'
    });
  }
};

export default userService;
