export const getCookie = (cname) => {
	var name = cname + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
};

export const isLogin = () => {
	if (getCookie('c_user') !== '') {
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
