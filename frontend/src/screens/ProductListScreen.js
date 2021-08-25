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
import { Link } from 'react-router-dom';
import { listProducts } from '../redux/actions/productAction';
import Button from '@material-ui/core/Button';

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
	const { product } = props;
	const [ open, setOpen ] = React.useState(false);

	console.log('Row', product);
	// console.log(order._id);
	// console.log(props);
	return (
		<React.Fragment>
			<TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell align="center">{product._id}</TableCell>
				<TableCell align="center">{product.name}</TableCell>
				<TableCell align="center">{product.brand}</TableCell>
				<TableCell align="center">{'$ ' + product.price.toFixed(2)}</TableCell>
				<TableCell align="center">{product.category}</TableCell>
				<TableCell align="center">
					<Button variant="contained" color="primary">
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

const ProductListScreen = (props) => {
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(10);

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;
	const dispatch = useDispatch();

	React.useEffect(
		() => {
			dispatch(listProducts());
		},
		[ dispatch ]
	);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

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
			) : products ? (
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
										BRAND
									</p>
								</TableCell>
								<TableCell align="center">
									<p
										className={css`
											font-weight: 900;
											font-size: 1.2rem;
										`}
									>
										PRICE
									</p>
								</TableCell>
								<TableCell align="center">
									<p
										className={css`
											font-weight: 900;
											font-size: 1.2rem;
										`}
									>
										CATEGORY
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
								? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								: products).map((product) => <Row key={product._id} product={product} props={props} />)}

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
									count={products.length}
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

export default ProductListScreen;
