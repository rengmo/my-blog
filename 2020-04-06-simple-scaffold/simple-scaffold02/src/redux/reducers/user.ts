import { GET_USER_INFO } from '@/redux/actionTypes/user';
const initialState = {
  userInfo: {},
};

interface Action {
  type: string;
  payload: ResUserInfo;
}
interface ResUserInfo {
  user_name?: string;
}

interface UserState {
  userInfo: {};
}

export default function user (state = initialState, action: Action): UserState {
  const { type, payload = {} } = action;
  const { user_name  } = payload;
  let userInfo = {
    userName: user_name,
  };
  if (type === GET_USER_INFO) {
    return {
      ...state,
      userInfo,
    };
  }
  return state;
}