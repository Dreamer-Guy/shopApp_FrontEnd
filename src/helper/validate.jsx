
// email
export const isValidEmail = (email) => {
    if (!email.trim()) {
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};

// username
export const isValidUsername = (userName) => {
    if (!userName.trim()) {
        return false;
    }

    const usernameRegex = /^[a-zA-Z0-9]{1,30}$/;
    return usernameRegex.test(userName);
}

// password
export const isValidPassword = (password) => {
    if (!password.trim()) {
        return false;
    }

    return password.length >= 6;
}

// text
export const isValidText = (text) => {
    if(!text.trim()) {
        return false;
    }
    
    return true;
}