import { Avatar, Box, Grid, Paper } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MessageBox from 'features/Messages/components/MessageBox';
import { addNewMessage } from 'features/Messages/messageSlice';
import { getAllUser } from 'features/Users/userSlice';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WebSocketContext } from 'utils/socketConfig';

const StyledBadge = withStyles((theme) => ({
	badge: {
		backgroundColor: '#44b700',
		color: '#44b700',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			border: '1px solid currentColor',
			content: '""',
		},
	},
}))(Badge);

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
}));

const getLocalStorage = () => {
	return JSON.parse(localStorage.getItem('userData'));
};

function FriendList(props) {
	const socket = useContext(WebSocketContext);
	const dispatch = useDispatch();
	const friends = useSelector((state) => state.users.friendList);

	const [videoInfo, setVideoInfo] = useState({});

	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
		// window.open(
		// 	'http://localhost:3000/videocall',
		// 	'_blank',
		// 	'toolbar=yes,scrollbars=yes,resizable=no,top=30,left=110,width=1300,height=700'
		// );
		window.open(
			`http://localhost:3000/videocall?from=${getLocalStorage().userId}&to=${
				videoInfo.from
			}`
		);
	};

	useEffect(() => {
		const getFriends = async () => {
			try {
				await dispatch(getAllUser());
			} catch (error) {}
		};
		getFriends();
	}, []);

	useEffect(() => {
		const myInterVal = setInterval(() => {
			const getFriends = async () => {
				try {
					await dispatch(getAllUser());
				} catch (error) {}
			};
			getFriends();
		}, 20000);

		return () => {
			clearInterval(myInterVal);
		};
	}, []);

	const [openChatbox, setOpenChatbox] = useState(() => {
		return {
			open: false,
			friend: '',
		};
	});

	const handleOpenChatbox = (friend) => {
		if (openChatbox.open !== true) {
			setOpenChatbox({
				open: true,
				friend,
			});
		}
	};

	const handleCloseChatbox = () => {
		setOpenChatbox({
			open: false,
			friend: '',
		});
	};

	useEffect(() => {
		socket.on('privateMessageResponse', (msg) => {
			if (getLocalStorage().userId !== msg.from._id) {
				handleOpenChatbox(msg.from);
			}
			dispatch(addNewMessage(msg));
		});

		socket.on('makeVideoResponse', (videoInfo) => {
			setVideoInfo(videoInfo);
			setOpen(true);
		});
	}, []);

	const sendMessage = (message) => {
		socket.emit('privateMessage', message);
	};

	const makeVideoCall = (info) => {
		socket.emit('makeVideo', info);
	};

	const classes = useStyles();

	return (
		<Grid item xs={12} md={12} lg={12}>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{'Video Call'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						{videoInfo.from} calling !!!!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Disagree
					</Button>
					<Button onClick={handleClose} color='primary' autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
			{/* chatbox */}
			{openChatbox.open && (
				<MessageBox
					friend={openChatbox.friend}
					handleCloseChatbox={handleCloseChatbox}
					sendMessage={sendMessage}
					makeVideoCall={makeVideoCall}
				/>
			)}
			<Paper className={classes.paper}>
				<Grid container spacing={2} direction='column'>
					<Grid item>
						<Box style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
							Friends
						</Box>
					</Grid>
					{friends &&
						friends.length > 0 &&
						friends.map((friend, index) => (
							<Grid
								key={index}
								item
								container
								alignItems='center'
								onClick={() => handleOpenChatbox(friend)}
							>
								<Grid item xs={2} md={2} lg={2}>
									{friend.socket.isOnline === true ? (
										<StyledBadge
											overlap='circle'
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right',
											}}
											variant='dot'
										>
											<Avatar>V</Avatar>
										</StyledBadge>
									) : (
										<Avatar>V</Avatar>
									)}
								</Grid>
								<Grid item xs={10} md={10} lg={10}>
									<Box>{friend.displayName}</Box>
								</Grid>
							</Grid>
						))}
				</Grid>
			</Paper>
		</Grid>
	);
}

export default FriendList;
