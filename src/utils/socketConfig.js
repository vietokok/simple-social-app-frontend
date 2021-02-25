import React, { createContext } from 'react';
import io from 'socket.io-client';
import { getLocalStorage } from 'utils';

const WebSocketContext = createContext(null);

export { WebSocketContext };

let socket;

export default ({ children }) => {
	if (!socket) {
		socket = io('http://127.0.0.1:4000', {
			query: `token=${getLocalStorage().token}`,
		});
	}

	return (
		<WebSocketContext.Provider value={socket}>
			{children}
		</WebSocketContext.Provider>
	);
};
