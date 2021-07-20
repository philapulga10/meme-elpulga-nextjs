import { createGlobalState } from 'react-hooks-global-state';

type TypeCurrentUser = {
  USERID: string,
  email: string,
  gender: string,
  description: string,
  fullname: string,
  status: string,
  profilepicture: string,
  permission: string
};

type TypeCategories = {
  id: number,
  text: string
};

type TypeInitialState = {
  token?: string,
  currentUser: TypeCurrentUser | null
  categories: TypeCategories[]
};

const initialState: TypeInitialState = {
  token: '',
  currentUser: null,
  categories: []
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState };