import React from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Button,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	makeStyles,
	MenuItem,
	Modal,
	Paper,
	Select,
	TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';

FilterPostModal.propTypes = {};

const useStyles = makeStyles((theme) => ({
	modal: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)',
		padding: theme.spacing(1.5),
		width: 500,
		outline: 0,
	},
	formControl: {
		minWidth: 100,
	},
}));

function FilterPostModal(props) {
	const classes = useStyles();
	// filter post

	// select year
	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box>
			<Button
				onClick={handleOpen}
				variant='contained'
				startIcon={<FilterListIcon />}
			>
				Filter
			</Button>
			<Modal open={open} onClose={handleClose}>
				{
					<Paper className={classes.modal}>
						<Grid container alignItems='center' spacing={1}>
							<Grid item xs={10} md={10} lg={10} container justify='center'>
								<Box
									style={{
										marginLeft: '57px',
										fontSize: '1.25rem',
										fontWeight: 'bold',
									}}
								>
									Post Filters
								</Box>
							</Grid>
							<Grid item xs={2} md={2} lg={2} container justify='flex-end'>
								<IconButton onClick={handleClose}>
									<CloseIcon />
								</IconButton>
							</Grid>
							<Grid item xs={12} md={12} lg={12}>
								<Divider />
							</Grid>
							<Grid
								style={{
									fontWeight: 'bold',
								}}
								item
								xs={12}
								md={12}
								lg={12}
							>
								<Box>
									Voluptates quae similique odit. Est earum pariatur harum.
								</Box>
							</Grid>
							<Grid
								style={{
									marginBottom: '1rem',
								}}
								item
								xs={12}
								md={12}
								lg={12}
							>
								<Box>Eligendi itaque eum magnam officia nam animi.</Box>
							</Grid>
							<Grid item xs={2} md={2} lg={2} style={{ marginTop: '1rem' }}>
								Go to:
							</Grid>
							<Grid item xs={3} md={3} lg={3}>
								<FormControl className={classes.formControl}>
									<InputLabel>Year</InputLabel>
									<Select value={age} onChange={handleChange}>
										<MenuItem value={2018}>2018</MenuItem>
										<MenuItem value={2019}>2019</MenuItem>
										<MenuItem value={2020}>2020</MenuItem>
										<MenuItem value={2021}>2021</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={7} md={7} lg={7}></Grid>
							<Grid style={{ marginTop: '1rem' }} item xs={2} md={2} lg={2}>
								Content:
							</Grid>
							<Grid style={{ marginTop: '1rem' }} item xs={7} md={7} lg={7}>
								<TextField label='Aa' variant='outlined' size='small' />
							</Grid>
							<Grid
								style={{ marginTop: '1rem' }}
								item
								xs={3}
								md={3}
								lg={3}
							></Grid>
							<Grid
								style={{ marginTop: '2rem' }}
								item
								xs={7}
								md={7}
								lg={7}
							></Grid>
							<Grid style={{ marginTop: '2rem' }} item xs={2} md={2} lg={2}>
								<Button variant='contained' fullWidth>
									Clear
								</Button>
							</Grid>
							<Grid style={{ marginTop: '2rem' }} item xs={3} md={3} lg={3}>
								<Button variant='contained' color='primary' fullWidth>
									Done
								</Button>
							</Grid>
						</Grid>
					</Paper>
				}
			</Modal>
		</Box>
	);
}

export default FilterPostModal;
