import { createGlobalState } from 'react-hooks-global-state';

type TypeCurrentUser = {
  USERID: string,
  email: string,
  gender: string,
  description: string,
  fullname: string,
  status: string,
  profilePicture: string,
  permission: string
};

type TypeInitialState = {
  token?: string,
  currentUser: TypeCurrentUser | null
};

const initialState: TypeInitialState = {
  token: '',
  currentUser: null
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState };