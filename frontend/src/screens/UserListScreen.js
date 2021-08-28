import React, { useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { MdFirstPage } from 'react-icons/md';
import { MdLastPage } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import TableHead from '@material-ui/core/TableHead';
import Collapse from '@material-ui/core/Collapse';
import { css, cx } from '@emotion/css';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import { listProducts } from '../redux/actions/productAction';
import Button from '@material-ui/core/Button';
import { deleteUser, listUsers } from '../redux/actions/userAction';
import swal from 'sweetalert';
import { USER_DETAILS_RESET } from '../redux/constants/userConstant';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

const TablePaginationActions = (props) => {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
				{theme.direction === 'rtl' ? <MdLastPage /> : <MdFirstPage />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
				{theme.direction === 'rtl' ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <MdFirstPage /> : <MdLastPage />}
			</IconButton>
		</Box>
	);
};

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired
};

function Row(props) {
	const { user, deleteUserHandler } = props;
	const [ open, setOpen ] = React.useState(false);

	return (
		<React.Fragment>
			<TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell align="center">{user._id}</TableCell>
				<TableCell align="center">{user.name}</TableCell>
				<TableCell align="center">{user.email}</TableCell>
				<TableCell align="center">{user.isSeller ? 'YES' : 'NO'}</TableCell>
				<TableCell align="center">{user.isAdmin ? 'YES' : 'NO'}</TableCell>
				<TableCell align="center">
					<Button
						variant="contained"
						color="primary"
						onClick={() => (document.location.href = `/user/${user._id}/edit`)}
					>
						Edit
					</Button>
				</TableCell>
				<TableCell>
					<Button variant="contained" color="primary" onClick={() => deleteUserHandler(user)}>
						Delete
					</Button>
				</TableCell>
				<TableCell align="center">
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div" align="center">
								History
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell align="center">Name</TableCell>
										<TableCell align="center">Address</TableCell>
										<TableCell align="center">Postal Code</TableCell>
										<TableCell align="center">State</TableCell>

										<TableCell align="center">Actions</TableCell>
									</TableRow>
								</TableHead>
								{/* <TableBody>
									<TableCell component="th" scope="row" align="center">
										{product.shippingAddress.fullName}
									</TableCell>
									<TableCell align="center">{product.shippingAddress.address}</TableCell>
									<TableCell align="center">{product.shippingAddress.postalCode}</TableCell>
									<TableCell align="center">{product.shippingAddress.state}</TableCell>
									<TableCell align="center">
										<Link to={`/order/${product._id}`} className={css`color: blue;`}>
											See Product
										</Link>
									</TableCell>
								</TableBody> */}
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

const UserListScreen = (props) => {
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(10);

	const userDelete = useSelector((state) => state.userDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete;

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;
	const dispatch = useDispatch();

	React.useEffect(
		() => {
			dispatch(listUsers());
			dispatch({ type: USER_DETAILS_RESET });
		},
		[ dispatch, successDelete ]
	);

	const deleteUserHandler = (user) => {
		const string = 'clicked!';
		console.log(string, user);

		if (user.isAdmin) {
			swal('Cannot Delete Admin User', '', 'info');
		} else {
			string === 'clicked!'
				? swal({
						title: 'Are you sure?',
						text: 'Once deleted, user will be wiped out forever.',
						icon: 'warning',
						buttons: true,
						dangerMode: true
					})
						.then((willDelete) => {
							if (willDelete) {
								dispatch(deleteUser(user._id));
								swal('Poof! User Deleted!', {
									icon: 'success'
								});
							} else {
								swal('Canceled Operation', 'User is safe 😮‍💨', 'info');
							}
						})
						.catch((error) => {
							swal('Oops!', 'Something went wrong!', 'error');
						})
				: console.log('Not working');
		}
	};

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	console.log(successDelete);

	return (
		<div>
			<DrawerHeader />
			{loadingDelete && <Loading />}

			{loading ? (
				<div className="loader-div">
					<Loading />
				</div>
			) : error ? (
				<MessageBox>{error}</MessageBox>
			) : users ? (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }} aria-label="custom pagination table">
						<TableHead>
							<TableRow>
								<TableCell align="center">
									<p
										className={css`
											font-weight: 900;
											font-size: 1.2rem;
										`}
									>
										ID
									</p>
								</TableCell>
								<TableCell align="center">
									<p
										className={css`
											font-weight: 900;
											font-size: 1.2rem;
										`}
									>
										NAME
									</p>
								</TableCell>
								<TableCell align="center">
									<p
										className={css`
											font-weight: 900;
											font-size: 1.2rem;
										`}
									>
										EMAIL
									</p>
								</TableCell>
								<TableCell align="center">
									<p
										className={css`
											font-weight: 900;
											font-size: 1.2rem;
										`}
									>
										IS SELLER
									</p>
								</TableCell>
								<TableCell align="center">
									<p
										className={css`
											font-weight: 900;
											font-size: 1.2rem;
										`}
									>
										IS ADMIN
									</p>
								</TableCell>
								<TableCell align="right">
									<p
										className={css`
											font-weight: 900;
											font-size: 1.3rem;
										`}
									>
										ACTIONS
									</p>
								</TableCell>
								<TableCell align="center">
									<p
										className={css`
											font-weight: 900;
											font-size: 1.3rem;
										`}
									/>
								</TableCell>
								<TableCell align="center">
									<p
										className={css`
											font-weight: 900;
											font-size: 1.3rem;
										`}
									/>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{(rowsPerPage > 0
								? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								: users).map((user) => (
								<Row key={user._id} user={user} props={props} deleteUserHandler={deleteUserHandler} />
							))}

							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>

						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[ 10, 15, 25, { label: 'All', value: -1 } ]}
									count={users.length}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										inputProps: {
											'aria-label': 'rows per page'
										},
										native: true
									}}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActions}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			) : null}
		</div>
	);
};

export default UserListScreen;
