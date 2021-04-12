// get all cookies
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

// check login
export const isLogin = () => {
	if (getCookie('c_user') !== '') {
		return true;
	}

	return false;
};

// check object empty
export const isEmpty = (obj) => {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
};

const shortenedContent = (content) => {
	return content.length > 50 ? content.substring(0, 50) + '...' : content;
};

export const contentByNotiType = (type, content) => {
	switch (type) {
		case 'create':
			return 'đã đăng một bài viết: ' + `"${shortenedContent(content)}"`;

		case 'like':
			return 'đã thích một bài viết của bạn';

		case 'comment':
			return (
				'đã bình luận một bài viết của bạn: ' + `"${shortenedContent(content)}"`
			);
	}
};

export const notificationNotSeen = (notifications) => {
	console.log(notifications);
	return notifications.filter((noti) => noti.isSeen === false).length;
};
