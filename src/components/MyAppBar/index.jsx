import {
	AppBar,
	Avatar,
	Badge,
	Box,
	Grid,
	IconButton,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import axios from 'axios';
import {
	getNotificatons,
	updateNotiSeen,
} from 'features/Notifications/notificationSlice';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { contentByNotiType, isEmpty, notificationNotSeen } from 'utils';
import { WebSocketContext } from 'utils/socketConfig';

const useStyles = makeStyles((theme) => ({
	toolbar: {
		paddingRight: 24,
	},
	title: {
		flexGrow: 1,
	},
	notificationButton: {
		marginRight: '1rem',
	},
	notificationIcon: {
		color: '#fff',
	},
	notificationMenu: {
		top: '1rem',
	},
	notificationPanel: {
		whiteSpace: 'normal',
		width: '360px',
		wordBreak: 'break-word',
		marginBottom: '0.75rem',
	},
	notificationPanelNotFound: {
		whiteSpace: 'normal',
		width: '360px',
		wordBreak: 'break-word',
	},
	notificationMenuAvatar: {
		width: '80%',
		height: '56px',
	},
	notificationMenuContent: {
		height: '100%',
	},
	avatar: {
		cursor: 'pointer',
	},
}));

export default function MyAppBar(props) {
	const { me } = props;

	const dispatch = useDispatch();
	const notifications = useSelector((state) => state.notifications);

	const socket = useContext(WebSocketContext);
	const classes = useStyles();
	let history = useHistory();

	const changeLocation = (path) => {
		history.push(`/${path}`);
	};

	const logout = () => {
		const handleLogout = async () => {
			const respose = await axios.get(
				`${process.env.REACT_APP_API_URL}/auth/logout`,
				{
					withCredentials: true,
				}
			);
			if (respose.status === 200) {
				history.push('/signin');
			}
		};
		handleLogout();
	};

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const [anchorEl1, setAnchorEl1] = React.useState(null);

	const handleClick1 = (event) => {
		const checkNotRead = notifications.notificationList.some(
			(noti) => noti.isSeen === false
		);
		if (checkNotRead) {
			const updateSeen = async () => {
				try {
					await dispatch(updateNotiSeen());
					setIsRead(true);
				} catch (error) {}
			};

			updateSeen();
		}

		setAnchorEl1(event.currentTarget);
	};

	const handleClose1 = () => {
		setAnchorEl1(null);
	};

	useEffect(() => {
		const getNoti = async () => {
			try {
				await dispatch(getNotificatons());
			} catch (error) {}
		};

		getNoti();
	}, []);

	useEffect(() => {
		socket.on('notificationResponse', (noti) => {
			const getNoti = async () => {
				try {
					await dispatch(getNotificatons());
				} catch (error) {}
			};

			getNoti();
		});
	}, []);

	return (
		<AppBar position='fixed'>
			<Toolbar className={classes.toolbar}>
				<Grid container>
					<Grid item xs={6} md={6} lg={6}>
						<Typography
							onClick={() => changeLocation('')}
							component='h1'
							variant='h6'
							color='inherit'
							noWrap
							className={classes.title}
						>
							Homepage
						</Typography>
					</Grid>
				</Grid>
				<Grid item xs={6} md={6} lg={6}>
					<Grid container>
						<Grid
							item
							xs={12}
							md={12}
							lg={12}
							container
							justify='flex-end'
							alignItems='center'
						>
							<Tooltip title='Thông báo'>
								{notificationNotSeen(notifications.notificationList) > 0 ? (
									<IconButton
										className={classes.notificationButton}
										onClick={handleClick1}
									>
										<Badge
											badgeContent={notificationNotSeen(
												notifications.notificationList
											)}
											color='secondary'
										>
											<NotificationsIcon
												fontSize='large'
												className={classes.notificationIcon}
											/>
										</Badge>
									</IconButton>
								) : (
									<IconButton
										className={classes.notificationButton}
										onClick={handleClick1}
									>
										<NotificationsIcon
											fontSize='large'
											className={classes.notificationIcon}
										/>
									</IconButton>
								)}
							</Tooltip>

							<Menu
								elevation={1}
								getContentAnchorEl={null}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
								anchorEl={anchorEl1}
								keepMounted
								open={Boolean(anchorEl1)}
								onClose={handleClose1}
								className={classes.notificationMenu}
							>
								{notifications.notificationList.length > 0 ? (
									notifications.notificationList.map((noti, index) => (
										<MenuItem key={index} className={classes.notificationPanel}>
											<Grid container spacing={2}>
												<Grid item xs={3} md={3} lg={3}>
													<Avatar className={classes.notificationMenuAvatar}>
														{noti.userNotiSend.displayName}
													</Avatar>
												</Grid>
												<Grid item xs={9} md={9} lg={9}>
													<Grid
														container
														className={classes.notificationMenuContent}
													>
														<Grid item xs={12} md={12} lg={12}>
															<Typography variant='body2'>
																<b>{noti.userNotiSend.displayName}</b>{' '}
																{contentByNotiType(noti.notiType, noti.content)}
															</Typography>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</MenuItem>
									))
								) : (
									<MenuItem className={classes.notificationPanelNotFound}>
										<Grid container spacing={2}>
											<Grid
												item
												xs={12}
												md={12}
												lg={12}
												container
												justify='center'
											>
												<Typography variant='body2'>
													Không có thông báo mới
												</Typography>
											</Grid>
										</Grid>
									</MenuItem>
								)}
							</Menu>
							{!isEmpty(me) && (
								<Avatar className={classes.avatar} onClick={handleClick}>
									{me.displayName}
								</Avatar>
							)}
							<Menu
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleCloseMenu}
							>
								<Box onClick={logout}>
									<MenuItem onClick={handleCloseMenu}>
										<ListItemIcon>
											<ExitToAppIcon fontSize='small' />
										</ListItemIcon>
										<ListItemText primary='Logout' />
									</MenuItem>
								</Box>
							</Menu>
						</Grid>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}
