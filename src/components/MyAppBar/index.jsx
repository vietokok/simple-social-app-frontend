import {
	AppBar,
	Avatar,
	Box,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'utils';
import axios from 'axios';

MyAppBar.propTypes = {};

const useStyles = makeStyles((theme) => ({
	toolbar: {
		paddingRight: 24,
	},

	title: {
		flexGrow: 1,
	},
}));

export default function MyAppBar(props) {
	const { me } = props;

	const classes = useStyles();

	let history = useHistory();
	const changeLocation = (path) => {
		history.push(`/${path}`);
	};

	const logout = () => {
		const handleLogout = async () => {
			const respose = await axios.get('http://localhost:4000/auth/logout', {
				withCredentials: true,
			});
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

	return (
		<AppBar position='fixed'>
			<Toolbar className={classes.toolbar}>
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
				<Box>
					{!isEmpty(me) && (
						<Avatar onClick={handleClick}>{me.displayName}</Avatar>
					)}
					<Menu
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleCloseMenu}
					>
						<Box onClick={() => changeLocation('profile')}>
							<MenuItem onClick={handleCloseMenu}>
								<ListItemIcon>
									<FaceIcon fontSize='small' />
								</ListItemIcon>
								<ListItemText primary='Profile' />
							</MenuItem>
						</Box>
						<MenuItem onClick={handleCloseMenu}>
							<ListItemIcon>
								<PhotoCameraIcon fontSize='small' />
							</ListItemIcon>
							<ListItemText primary='Change Avatar' />
						</MenuItem>
						<Box onClick={logout}>
							<MenuItem onClick={handleCloseMenu}>
								<ListItemIcon>
									<ExitToAppIcon fontSize='small' />
								</ListItemIcon>
								<ListItemText primary='Logout' />
							</MenuItem>
						</Box>
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
