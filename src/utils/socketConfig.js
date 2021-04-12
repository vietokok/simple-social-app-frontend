import React, { createContext } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext(null);

export { WebSocketContext };

let socket;

export default ({ children }) => {
	if (!socket) {
		socket = io(`${process.env.REACT_APP_API_URL}`, {
			withCredentials: true,
		});
	}

	return (
		<WebSocketContext.Provider value={socket}>
			{children}
		</WebSocketContext.Provider>
	);
};
