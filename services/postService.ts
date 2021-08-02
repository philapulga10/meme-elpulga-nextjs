import api from './api';

type ObjImage = {
  file: File | null,
  base64: string
};

type TypePostCreate = {
  obj_image: ObjImage,
  url_image: string,
  post_content: string,
  category: string[]
};

const postService = {
  createNewPost: async ({ obj_image, url_image, post_content, category }: TypePostCreate, token: string) => {
    const url = '/post/addNew.php';

    const formData = new FormData();

    formData.append('post_content', post_content);
    formData.append('category', category.toString());
    formData.append('url_image', url_image);

    if (obj_image.file) {
      formData.append('obj_image', obj_image.file);
    };

    return api.callFormData(url, { data: formData, token });
  },
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
    return api.callJson(`/post/search.php?query=${encodeURI(query)}`);
  },
  getCategories: async () => {
    return api.callJson(`/categories/index.php`);
  },
  getPostPagingByCategories: async ({ pageSize = 10, currPage = 1, tagIndex = '' }) => {
    if (!tagIndex) {
      return null;
    }

    const params = `pagesize=${pageSize}&currPage=${currPage}&tagIndex=${tagIndex}`;

    return api.callJson(`post/getListByCategory.php?${params}`);
  }
};

export default postService;
