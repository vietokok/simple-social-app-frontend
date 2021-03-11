import {
	Avatar,
	Box,
	Divider,
	Grid,
	IconButton,
	makeStyles,
	Paper,
	TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import VideocamIcon from '@material-ui/icons/Videocam';
import {
	addNewMessage,
	getMessageByFriend,
} from 'features/Messages/messageSlice';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'utils/socketConfig';
import MessageList from '../MessageList';

const useStyles = makeStyles((theme) => ({
	chatbox: {
		position: 'fixed',
		zIndex: 10000000,
		width: 328,
		height: 455,
		bottom: 0,
		padding: theme.spacing(1, 0, 1, 1),
		right: '7%',
	},
}));

function MessageBox(props) {
	const { handleCloseChatbox, friend, sendMessage } = props;
	const socket = useContext(WebSocketContext);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [value, setValue] = useState('');
	const [over, setOver] = useState(() => false);
	const scrollEL = useRef(null);
	const messages = useSelector(
		(state) => state.messages.messageList[friend._id]
	);

	const handleInputChange = (e) => {
		setValue(e.target.value);
	};

	const closeChatBox = () => {
		if (handleCloseChatbox) {
			handleCloseChatbox();
		}
	};

	const handleSendMessage = () => {
		if (sendMessage) {
			const messageObject = {
				to: friend._id,
				message: value,
			};

			sendMessage(messageObject);
			setValue('');
		}
	};

	useEffect(() => {
		if (messages.length > 0) {
			scrollEL.current.scrollTop = scrollEL.current.scrollHeight;
		}
	}, [friend]);

	const loadMessagePrev = (e) => {
		if (e.target.scrollTop < 2 && !over) {
			e.target.scrollTop = 2;
			const infoObject = {
				friend: friend._id,
				l: messages.length,
				st: e.target.scrollHeight,
			};
			socket.emit('getMessages', infoObject);
		}
	};

	useEffect(() => {
		if (messages.length < 1) {
			const infoObject = {
				friend: friend._id,
				l: 0,
			};
			socket.emit('getMessagesFirst', infoObject);
			socket.on('getMessagesFirstResponse', (msg) => {
				const messageInfo = {
					msg,
					friend: friend._id,
				};
				dispatch(getMessageByFriend(messageInfo));
				scrollEL.current.scrollTop = scrollEL.current.scrollHeight;
			});
		}

		return () => {
			socket.off('getMessagesFirstResponse');
		};
	}, [friend]);

	useEffect(() => {
		socket.on('getMessagesResponse', (msg, st) => {
			if (msg.length > 0) {
				const messageInfo = {
					msg,
					friend: friend._id,
				};
				dispatch(getMessageByFriend(messageInfo));
				scrollEL.current.scrollTop = scrollEL.current.scrollHeight - st;
			} else {
				setOver(true);
			}
		});

		return () => {
			socket.off('getMessagesResponse');
		};
	}, [friend]);

	useEffect(() => {
		socket.on('privateMessageResponse', (msg) => {
			if (messages.length > 0) {
				const messageInfo = {
					msg,
					friend: msg.from._id,
				};
				dispatch(addNewMessage(messageInfo));

				scrollEL.current.scrollTop = scrollEL.current.scrollHeight;
			}
		});

		return () => {
			socket.off('privateMessageResponse');
		};
	}, [messages, friend]);

	useEffect(() => {
		socket.on('privateMessageResponseA', (msg) => {
			const messageInfo = {
				msg,
				friend: friend._id,
			};
			dispatch(addNewMessage(messageInfo));
			scrollEL.current.scrollTop = scrollEL.current.scrollHeight;
		});

		return () => {
			socket.off('privateMessageResponseA');
		};
	}, [friend]);

	return (
		<Paper className={classes.chatbox}>
			<Grid style={{ height: '100%' }} container direction='column'>
				<Grid item>
					<Grid container spacing={1} alignItems='center'>
						<Grid item xs={2} md={2} lg={2}>
							<Avatar>V</Avatar>
						</Grid>
						<Grid item xs={6} md={6} lg={6} container>
							<Grid item container>
								<Grid item xs={12} md={12} lg={12}>
									<Box>{friend.displayName}</Box>
								</Grid>
								<Grid item xs={12} md={12} lg={12}>
									<Box>Active Now</Box>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={2} md={2} lg={2} container justify='flex-end'>
							<IconButton>
								<VideocamIcon color='primary' />
							</IconButton>
						</Grid>
						<Grid item xs={2} md={2} lg={2} container justify='flex-end'>
							<IconButton onClick={closeChatBox}>
								<CloseIcon color='primary' />
							</IconButton>
						</Grid>
						<Grid item xs={12} md={12} lg={12}>
							<Divider />
						</Grid>
					</Grid>
				</Grid>
				<Grid
					onScroll={(e) => loadMessagePrev(e)}
					ref={scrollEL}
					item
					style={{
						height: '76%',
						width: '100%',
						overflowY: 'scroll',
					}}
				>
					<Grid container>
						{messages.length > 0 && <MessageList messages={messages} />}
					</Grid>
				</Grid>
				<Grid item>
					<Grid container alignItems='center'>
						<Grid item xs={1} md={1} lg={1}>
							<IconButton style={{ padding: '12px 2px' }}>
								<ImageIcon color='primary' />
							</IconButton>
						</Grid>
						<Grid item xs={9} md={9} lg={9} container justify='flex-end'>
							<TextField
								value={value}
								onChange={handleInputChange}
								style={{ width: '95%' }}
							/>
						</Grid>
						<Grid item xs={2} md={2} lg={2} container justify='center'>
							<IconButton onClick={handleSendMessage}>
								<SendIcon color='primary' />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default MessageBox;
