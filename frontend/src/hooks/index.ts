export const useAuth = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  return { isAuthenticated, getUser, getToken };
};