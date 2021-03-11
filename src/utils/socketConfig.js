import React, { createContext } from 'react';
import io from 'socket.io-client';
import { getCookie } from 'utils';

const WebSocketContext = createContext(null);

export { WebSocketContext };

let socket;

export default ({ children }) => {
	if (!socket) {
		socket = io('http://localhost:4000', {
			withCredentials: true,
		});
	}

	return (
		<WebSocketContext.Provider value={socket}>
			{children}
		</WebSocketContext.Provider>
	);
};
