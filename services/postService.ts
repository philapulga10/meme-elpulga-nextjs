import api from './api';

const postService = {
  getPostsPaging: async ({ pageSize = 3, currPage = 1 } = {}) => {
    const params = `pagesize=${pageSize}&currPage=${currPage}`;
    const url = `/post/getListPagination.php?${params}`;

    return api.callJson(url);
  },
  getPostsByUserId: async ({ userId, token }) => {
    if (!userId || !token) {
      return {
        status: 200,
        posts: []
      };
    }

    const url = `/post/getListPostUserID.php?userid=${userId}`;

    return api.callJson(url, { token });
  }
};

export default postService;
