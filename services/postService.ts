import api from './api';

const postService = {
  getPostsPaging: async ({ pageSize = 1, currPage = 1 } = {}) => {
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
  },
  getPostSearch: async ({ query }) => {
    return api.callJson(`/post/search.php?query=${query}`);
  }
};

export default postService;
