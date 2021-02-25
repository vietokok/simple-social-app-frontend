const TOKEN_KEY = 'userData';

export const login = (data) => {
	localStorage.setItem(TOKEN_KEY, data);
};

export const logout = () => {
	localStorage.removeItem(TOKEN_KEY);
};

export const getLocalStorage = () => {
	return JSON.parse(localStorage.getItem('userData'));
};

export const isLogin = () => {
	if (localStorage.getItem(TOKEN_KEY)) {
		return true;
	}

	return false;
};

export const isEmpty = (obj) => {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
};
