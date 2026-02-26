// Set token in localStorage
export const setToken = (token) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        // Notify same-window listeners that auth changed
        try {
            window.dispatchEvent(new Event('authChange'));
        } catch (e) {}
    }
};
// Get token from localStorage
export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};
export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
        try {
            window.dispatchEvent(new Event('authChange'));
        } catch (e) {}
  }
};
// Set fullname in localStorage
export const setFullname = (FullName) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('FullName', FullName);
        try {
            window.dispatchEvent(new Event('authChange'));
        } catch (e) {}
    }
};
// Get fullname from localStorage
export const getFullname = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('FullName');
    }
    return null;
};
