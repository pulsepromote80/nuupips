// Authentication utility functions

// Get token from localStorage
export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

// Get encrypted local data from localStorage
export const getEncryptedLocalData = (key) => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(key);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (error) {
                console.error('Error parsing local data:', error);
                return null;
            }
        }
    }
    return null;
};

// Set token in localStorage
export const setToken = (token) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
    }
};

// Set encrypted local data in localStorage
export const setEncryptedLocalData = (key, data) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
    }
};

// Remove token from localStorage
export const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
    }
};

// Remove encrypted local data from localStorage
export const removeEncryptedLocalData = (key) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// Clear all auth data
export const clearAuthData = () => {
    removeToken();
    removeEncryptedLocalData('currentUser');
};

