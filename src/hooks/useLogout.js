import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();


  const logout = () => {
    localStorage.removeItem('data');
    localStorage.removeItem('token');
    dispatch({
      type: 'LOGOUT',
    });
  };

  return { logout };
}