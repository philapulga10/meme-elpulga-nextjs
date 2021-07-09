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

type TypeInitialState = {
  currentUser: TypeCurrentUser | null
};

const initialState: TypeInitialState = { currentUser: null };

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState };