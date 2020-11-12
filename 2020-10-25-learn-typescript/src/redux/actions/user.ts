import { GET_USER_INFO } from '@/redux/actionTypes/user';
import api from '@/request/api/index';

const getUserInfo = (payload: object): object => ({
  type: GET_USER_INFO,
  payload,
});

export function fetchUserInfo (): Function {
  return async (dispatch: Function): Promise<void> => {
    const { data } = await Axios.get(api.getUserInfo);
    dispatch(getUserInfo(data.data));
  };
}