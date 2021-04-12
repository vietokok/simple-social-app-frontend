import {
	Avatar,
	Box,
	CircularProgress,
	Grid,
	Paper,
	Typography,
} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import red from '@material-ui/core/colors/red';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MessageBox from 'features/Messages/components/MessageBox';
import { addNewBoxChat } from 'features/Messages/messageSlice';
import { getAllUser } from 'features/Users/userSlice';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from 'utils';
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
	red: {
		color: theme.palette.getContrastText(red[500]),
		backgroundColor: red[500],
		width: '1.5rem',
		height: '1.5rem',
		fontSize: '1rem',
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	friendTitle: {
		fontSize: '1.25rem',
		fontWeight: 'bold',
	},
	friendNotFound: {
		textAlign: 'center',
	},
}));

function FriendList(props) {
	const userId = getCookie('c_user');
	const socket = useContext(WebSocketContext);
	const dispatch = useDispatch();
	const friends = useSelector((state) => state.users.friendList);

	const [isReadList, SetIsReadList] = useState({});

	// get all friends
	useEffect(() => {
		const getFriends = async () => {
			try {
				await dispatch(getAllUser());
			} catch (error) {}
		};
		getFriends();
	}, []);

	// check friend online after 20 seconds
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

	const [openChatbox, setOpenChatbox] = useState({
		open: false,
		friend: {},
	});

	const handleOpenChatbox = (friend) => {
		SetIsReadList({
			...isReadList,
			[friend._id]: 0,
		});
		dispatch(addNewBoxChat(friend._id));
		setOpenChatbox({ ...openChatbox, open: true, friend });
	};

	const handleCloseChatbox = () => {
		setOpenChatbox({ ...openChatbox, open: false, friend: {} });
	};

	useEffect(() => {
		socket.on('check', (msg) => {
			if (openChatbox.open !== true) {
				handleOpenChatbox(msg.from);
			}
		});

		socket.emit('getIsRead', userId);
		socket.on('getIsReadResponse', (objectIsRead) => {
			SetIsReadList(objectIsRead);
		});
	}, []);

	const sendMessage = (messageObject) => {
		socket.emit('privateMessage', messageObject);
	};

	const classes = useStyles();

	return (
		<Grid item xs={12} md={12} lg={12}>
			{/* chatbox */}
			{openChatbox.open && (
				<MessageBox
					sendMessage={sendMessage}
					check={openChatbox.open}
					friend={openChatbox.friend}
					handleCloseChatbox={handleCloseChatbox}
				/>
			)}
			<Paper className={classes.paper}>
				<Grid container spacing={2} direction='column'>
					<Grid item>
						<Box className='friend-title'>Friends</Box>
					</Grid>
					{friends.loading ? (
						<Grid container justify='center' item xs={12} md={12} lg={12}>
							<CircularProgress />
						</Grid>
					) : friends.length > 0 ? (
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
								<Grid item xs={8} md={8} lg={8}>
									<Box>{friend.displayName}</Box>
								</Grid>
								{isReadList.hasOwnProperty(friend._id) &&
									isReadList[friend._id] !== 0 && (
										<Grid item xs={2} md={2} lg={2} container justify='center'>
											<Avatar className={classes.red}>
												{isReadList[friend._id]}
											</Avatar>
										</Grid>
									)}
							</Grid>
						))
					) : (
						<Grid
							item
							xs={12}
							md={12}
							lg={12}
							className={classes.friendNotFound}
						>
							<Typography variant='h6'>No friend found</Typography>
						</Grid>
					)}
				</Grid>
			</Paper>
		</Grid>
	);
}

export default FriendList;
