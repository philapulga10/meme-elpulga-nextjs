import api from './api';

type RegisterData = {
  fullname: string,
  email: string,
  password: string,
  repassword: string
};

type PasswordData = {
  oldPassword: string,
  newPassword: string,
  reNewPassword: string
};

type ProfileData = {
  fullname: string,
  gender: string,
  description: string,
  avatar: File | null
};

const userService = {
  getUserById: async (userId: string) => {
    return api.callJson(`member/member.php?userid=${userId}`);
  },
  register: async (data: RegisterData) => {
    return api.callJson('member/register.php', {
      data,
      method: 'POST'
    });
  },
  changePassword: async (data: PasswordData, token) => {
    return api.callJson('/member/password.php', {
      data,
      token,
      method: 'POST'
    });
  },
  uploadProfile: async (data: ProfileData, token: string) => {
    const formData = new FormData();

    formData.append('fullname', data.fullname);
    formData.append('gender', data.gender);
    formData.append('description', data.description);

    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    return api.callFormData('/member/update.php', {
      data: formData,
      token
    });
  }
};

export default userService;
