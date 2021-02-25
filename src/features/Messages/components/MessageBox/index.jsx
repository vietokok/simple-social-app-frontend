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
import { getMessageByRoom } from 'features/Messages/messageSlice';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageList from '../MessageList';

const getLocalStorage = () => {
	return JSON.parse(localStorage.getItem('userData'));
};

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
	const dispatch = useDispatch();
	const messages = useSelector((state) => state.messages.messageList);
	const { handleCloseChatbox, friend, sendMessage, makeVideoCall } = props;
	const [value, setValue] = useState('');

	const closeChatBox = () => {
		if (handleCloseChatbox) {
			handleCloseChatbox();
		}
	};

	const handleSendMessage = () => {
		if (sendMessage) {
			const messageObject = {
				from: getLocalStorage().userId,
				to: friend._id,
				message: value,
			};
			sendMessage(messageObject);
			setValue('');
		}
	};

	useEffect(() => {
		const getMessage = async () => {
			try {
				await dispatch(getMessageByRoom(friend._id));
			} catch (error) {}
		};
		getMessage();
	}, [friend]);

	const classes = useStyles();

	const handleInputChange = (e) => {
		setValue(e.target.value);
	};

	const openVideoCall = () => {
		if (makeVideoCall) {
			const videoInfo = {
				from: getLocalStorage().userId,
				to: friend._id,
			};
			makeVideoCall(videoInfo);
		}
		// window.open(
		// 	'http://localhost:3000/videocall',
		// 	'_blank',
		// 	'toolbar=yes,scrollbars=yes,resizable=no,top=30,left=110,width=1300,height=700'
		// );
		window.open(
			`http://localhost:3000/videocall?from=${getLocalStorage().userId}&to=${
				friend._id
			}`
		);
	};

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
							<IconButton onClick={openVideoCall}>
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
