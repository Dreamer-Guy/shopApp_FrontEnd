const USER_LOCAL_STORAGE_KEY = 'user';

export const saveUserToLocalStorage = (user) => {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
    const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
};

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
};