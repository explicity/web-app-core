import { logout } from '../services/auth.service';

export const handleResponse = async response => {
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (!response.ok && [401, 403].includes(response.status)) {
    await logout();
    window.location.reload(true);
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
};
