import api from './api';

const userService = {
  getUserById: async (userId: string) => {
    return api.callJSON(`member/member.php?userid=${userId}`);
  }
};

export default userService;
