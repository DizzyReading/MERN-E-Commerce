import {PayPalButton} from 'react-paypal-button-v2';
import axios from 'axios';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { css, cx } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { detailsOrder } from '../redux/actions/orderActions';



const useStyles = makeStyles({
	root: {
		maxWidth: 500,
		padding: '1rem'
	},
	media: {
		height: 420
	}
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

const OrderScreen = (props) => {
  const [sdkReady, setSdkReady] = useState(false)
	const orderId = props.match.params.id;
	const orderDetails = useSelector((state) => state.orderDetails);

	const { order, loading, error } = orderDetails;

	const dispatch = useDispatch();

	useEffect(
		() => {
      const addPayPalScript = async () => {
        const {data} = await axios.get('/api/config/paypal')

        const script = document.createElement('script');
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
        script.async = true
        script.onload = () => {
          setSdkReady(true)
        }

        document.body.appendChild(script)

      }

      if(!order) {
        dispatch(detailsOrder(orderId));
      
      }else {
        if(!order.isPaid) {
          if(!window.paypal) {
            addPayPalScript()
          }
          else {
            setSdkReady(true)
          }
        }
      }

		},
		[ dispatch, order, orderId, sdkReady ]
	);

  const successPaymentHandler = () => {
    //TODO: dispatch payOrder
  }

	console.log(order);


	return (
		<div>
			<DrawerHeader />
			{loading ? (
				<Loading />
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
        <>
        	<h2 className={css`word-break:break-all; text-align:center`}>Order {order._id}</h2>
				<div
					id="parent"
					className={css`
						display: flex;
						justify-content: space-evenly;
					`}
				>
				
					<ul>
						<li className={css`margin: 20px 0 20px 0;`}>
							<Card
								className={css`
									@media (min-width: 768px) {
										width: 350px;
										height: 100%;
									}
								`}
							>
								<CardContent>
									Shipping
									<p className={css`margin-top: 10px;`}>
										<strong>Name: {''}</strong>
										{order.shippingAddress.fullName}
										<br />
										<strong>Shipping Address: {''}</strong>
										{order.shippingAddress.address}
									</p>
									{order.shippingAddress.city}, {''}
									{order.shippingAddress.postalCode}, {''}
									{order.shippingAddress.state}
                  {order.isDelivered ? (<div className={css`margin-top: 10px;`}><MessageBox variant="success">Delivered at {order.deliveredAt}
                  </MessageBox></div>) : (<div className={css`margin-top: 10px;`}><MessageBox variant="danger">Not Delivered
                  </MessageBox></div>)}
								</CardContent>
							</Card>
						</li>

						<li className={css`margin: 20px 0 20px 0;`}>
							<Card
								className={css`
									@media (min-width: 768px) {
										width: 300px;
										height: 100%;
									}
								`}
							>
								<CardContent>
									Payment
									<p className={css`margin-top: 10px;`}>
										<strong> Method: {''}</strong>
										{order.paymentMethod}
									</p>
                  {order.isPaid ? (<div className={css`margin-top: 10px;`}><MessageBox variant="success">Paid at {order.paidAt}
                  </MessageBox></div>) : (<div className={css`margin-top: 10px;`}><MessageBox variant="danger">Not Paid
                  </MessageBox></div>)}
								</CardContent>
							</Card>
						</li>

						<li>
							<Card
								className={css`
									/* flex: 1 1 30rem; */
									margin: 20px 0 20px 0;
									@media (min-width: 768px) {
										width: 600px;
										height: 100%;
									}

									/* @media (max-width: 768px) {
								width: 500px;
								height: 100%;
							} */
								`}
							>
								<CardContent>
									<strong>Order Items</strong>
									<ul className={css`margin-top: 10px;`}>
										{order.orderItems.map((item) => (
											<li key={item.product}>
												<div
													className={css`
														display: flex;
														align-items: center;
														flex-wrap: wrap;
														justify-content: space-between;
														margin: 20px;
													`}
												>
													<div>
														<img
															src={item.image}
															alt={item.name}
															className={css`
																max-width: 4rem;
																width: 100%;
															`}
														/>
													</div>
													{/* <div className="min-30"> */}
													<Link
														to={`/product/${item.product}`}
														className={css`
															color: black;
															margin: 0;
														`}
													>
														<p className={css`margin-top: 10px;`}>
															<strong>{item.name}</strong>
														</p>
													</Link>
													{/* </div> */}

													<div>
														{item.qty} x ${item.price} = ${item.qty * item.price}
													</div>
													<br />
												</div>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						</li>
					</ul>

					<div id="order-summary-div">
						<Card
							className={css`
								padding: 0 1rem 1rem 1rem;
								@media (min-width: 768px) {
									width: 350px;
									height: fit-content;
								}
							`}
						>
							<ul>
								<li>
									<h2 className={css`text-align: center;`}>Order Summary</h2>
								</li>
								<li>
									<div
										className={css`
											display: flex;
											/* flex-wrap: wrap; */
											justify-content: space-between;
											align-items: center;
										`}
									>
										<div>Items</div>
										<div>${order.itemsPrice.toFixed(2)}</div>
									</div>
								</li>
								<li>
									<div
										className={css`
											display: flex;
											/* flex-wrap: wrap; */
											justify-content: space-between;
											align-items: center;
										`}
									>
										<div>Shipping</div>
										<div>${order.shippingPrice.toFixed(2)}</div>
									</div>
								</li>
								<li>
									<div
										className={css`
											display: flex;
											/* flex-wrap: wrap; */
											justify-content: space-between;
											align-items: center;
										`}
									>
										<div>Tax</div>
										<div>${order.taxPrice.toFixed(2)}</div>
									</div>
								</li>
								<li>
									<div
										className={css`
											display: flex;
											/* flex-wrap: wrap; */
											justify-content: space-between;
											align-items: center;
										`}
									>
										<div
											className={css`
												display: flex;
												flex-wrap: wrap;
												justify-content: space-between;
												align-items: center;
											`}
										>
											<strong>Order Total</strong>
										</div >
                   
                    <div>
                    
                    </div>
										<div>
											<strong>${order.totalPrice.toFixed(2)}</strong>
										</div>
									</div>
								</li>

							</ul>

              {
                !order.isPaid && (<div className={css `margin-top: 10px;`}>{ !sdkReady ? (<p>Loading</p>) : (<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>)}</div>)  
              }
						</Card>
					</div>
				</div>
        </>
			)}
		</div>
	);
};

export default OrderScreen;



             
                    