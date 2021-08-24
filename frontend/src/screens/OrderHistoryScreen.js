import React from 'react';
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
import { listOrderMine } from '../redux/actions/orderActions';
import { Link } from 'react-router-dom';

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
	const { order } = props;
	const [ open, setOpen ] = React.useState(false);

	console.log('Row', order);
	// console.log(order._id);
	// console.log(props);
	return (
		<React.Fragment>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell align="center">{order._id}</TableCell>
				<TableCell align="center">{order.createdAt.substring(0, 10)}</TableCell>
				<TableCell align="center">{order.totalPrice.toFixed(2)}</TableCell>
				<TableCell align="center">{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</TableCell>
				<TableCell align="center">{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</TableCell>
				<TableCell align="center">Details</TableCell>
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
										<TableCell align="center">Customer</TableCell>
										<TableCell align="center">Address</TableCell>
										<TableCell align="center">Postal Code</TableCell>
										<TableCell align="center">State</TableCell>
										<TableCell align="center">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableCell component="th" scope="row" align="center">
										{order.shippingAddress.fullName}
									</TableCell>
									<TableCell align="center">{order.shippingAddress.address}</TableCell>
									<TableCell align="center">{order.shippingAddress.postalCode}</TableCell>
									<TableCell align="center">{order.shippingAddress.state}</TableCell>
									<TableCell align="center">
										<Link to={`/order/${order._id}`} className={css`color: blue;`}>
											See Product
										</Link>
									</TableCell>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

Row.propTypes = {
	order: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		paidAt: PropTypes.number.isRequired,
		totalPrice: PropTypes.number.isRequired,
		isPaid: PropTypes.string.isRequired,
		history: PropTypes.arrayOf(
			PropTypes.shape({
				amount: PropTypes.number.isRequired,
				customerId: PropTypes.string.isRequired,
				date: PropTypes.string.isRequired
			})
		).isRequired,
		isDelivered: PropTypes.string.isRequired,
		ACTIONS: PropTypes.string.isRequired
	}).isRequired
};

const OrderHistoryScreen = (props) => {
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(10);

	const orderMineList = useSelector((state) => state.orderMineList);
	const { loading, error, orders } = orderMineList;
	const dispatch = useDispatch();

	React.useEffect(
		() => {
			dispatch(listOrderMine());
		},
		[ dispatch ]
	);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<div>
			<DrawerHeader />
			{loading ? (
				<div className="loader-div">
					<Loading />
				</div>
			) : error ? (
				<MessageBox>{error}</MessageBox>
			) : (
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
										DATE
									</p>
								</TableCell>
								<TableCell align="center">
									<p
										className={css`
											font-weight: 900;
											font-size: 1.2rem;
										`}
									>
										TOTAL
									</p>
								</TableCell>
								<TableCell align="center">
									<p
										className={css`
											font-weight: 900;
											font-size: 1.2rem;
										`}
									>
										PAID
									</p>
								</TableCell>
								<TableCell align="center">
									<p
										className={css`
											font-weight: 900;
											font-size: 1.2rem;
										`}
									>
										DELIVERED
									</p>
								</TableCell>
								<TableCell align="center">
									<p
										className={css`
											font-weight: 900;
											font-size: 1.3rem;
										`}
									>
										ACTIONS
									</p>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{(rowsPerPage > 0
								? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								: orders).map((order) => <Row key={order._id} order={order} props={props} />)}

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
									count={orders.length}
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
			)}
		</div>
	);
};

export default OrderHistoryScreen;
