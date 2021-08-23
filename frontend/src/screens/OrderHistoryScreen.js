import * as React from 'react';
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
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

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

function createData(ID, DATE, TOTAL, PAID, DELIVERED, ACTIONS) {
	return {
		ID,
		DATE,
		TOTAL,
		PAID,
		DELIVERED,
		ACTIONS,
		History: [
			{
				date: '2020-01-05',
				customerId: '11091700',
				amount: 3
			},
			{
				date: '2020-01-02',
				customerId: 'Anonymous',
				amount: 1
			}
		]
	};
}

function Row(props) {
	const { row, style } = props;
	const [ open, setOpen ] = React.useState(false);

	return (
		<React.Fragment>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell align="center">{row.ID}</TableCell>
				<TableCell align="center">{row.DATE}</TableCell>
				<TableCell align="center">{row.TOTAL}</TableCell>
				<TableCell align="center">{row.PAID}</TableCell>
				<TableCell align="center">{row.DELIVERED}</TableCell>
				<TableCell align="center">{row.ACTIONS}</TableCell>
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
										<TableCell align="center">Date</TableCell>
										<TableCell align="center">Customer</TableCell>
										<TableCell align="center">Amount</TableCell>
										<TableCell align="center">Total price ($)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.History.map((historyRow) => (
										<TableRow key={historyRow.date}>
											<TableCell component="th" scope="row" align="center">
												{historyRow.date}
											</TableCell>
											<TableCell align="center">{historyRow.customerId}</TableCell>
											<TableCell align="center">{historyRow.amount}</TableCell>
											<TableCell align="center">
												{Math.round(historyRow.amount * row.price * 100) / 100}
											</TableCell>
										</TableRow>
									))}
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
	row: PropTypes.shape({
		ID: PropTypes.string.isRequired,
		DATE: PropTypes.number.isRequired,
		TOTAL: PropTypes.number.isRequired,
		PAID: PropTypes.string.isRequired,
		history: PropTypes.arrayOf(
			PropTypes.shape({
				amount: PropTypes.number.isRequired,
				customerId: PropTypes.string.isRequired,
				date: PropTypes.string.isRequired
			})
		).isRequired,
		DELIVERED: PropTypes.string.isRequired,
		ACTIONS: PropTypes.string.isRequired
	}).isRequired
};

const rows = [
	createData('alt-j', 159, 6.0, 24, 4.0, 'Details'),
	createData('Local Natives', 237, 9.0, 37, 4.3, 'Details'),
	createData('The xx', 262, 16.0, 24, 6.0, 'Details'),
	createData('Syd Matters', 305, 3.7, 67, 4.3, 'Details'),
	createData('Band of Horses', 356, 16.0, 49, 3.9, 'Details'),
	createData('K. Flay', 159, 6.0, 24, 3.4, 'Details'),
	createData('Vampire Weekend', 237, 9.0, 37, 4.3, 'Details'),
	createData('indigo la End', 262, 16.0, 24, 5.4, 'Details'),
	createData('Metric', 305, 3.7, 67, 3.3, 'Details'),
	createData('CHVRCHES', 356, 16.0, 49, 4.9, 'Details'),
	createData('FOALS', 159, 6.0, 24, 2.2, 'Details'),
	createData('Iron & Wine', 237, 9.0, 37, 4.3, 'Details'),
	createData('Metronomy', 262, 16.0, 24, 3.5, 'Details'),
	createData('Aqualung', 305, 3.7, 67, 4.4, 'Details'),
	createData('Fleet Foxes', 356, 16.0, 49, 3.2, 'Details')
];

const OrderHistoryScreen = () => {
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

	const orderMineList = useSelector((state) => state.orderMineList);
	const { loading, error, orders } = orderMineList;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
								? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								: rows).map((row) => (
								// <TableRow key={row.name}>
								// 	<TableCell style={{ width: 160 }} align="center">
								// 		{row.ID}
								// 	</TableCell>
								// 	<TableCell style={{ width: 160 }} align="center">
								// 		{row.DATE}
								// 	</TableCell>
								// 	<TableCell style={{ width: 160 }} align="center">
								// 		{row.TOTAL}
								// 	</TableCell>
								// 	<TableCell style={{ width: 160 }} align="center">
								// 		{row.PAID}
								// 	</TableCell>
								// 	<TableCell style={{ width: 160 }} align="center">
								// 		{row.DELIVERED}
								// 	</TableCell>
								// 	<TableCell style={{ width: 160 }} align="center">
								// 		{row.ACTIONS}
								// 	</TableCell>
								// </TableRow>

								<Row key={row.name} row={row} />
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
									rowsPerPageOptions={[ 5, 10, 25, { label: 'All', value: -1 } ]}
									count={rows.length}
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
