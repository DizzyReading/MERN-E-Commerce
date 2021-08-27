import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function SellerRoute({ component: Component, ...rest }) {
	const userSignIn = useSelector((state) => state.userSignIn);
	const { userInfo } = userSignIn;
	return (
		<Route
			{...rest}
			render={(props) => (userInfo && userInfo.isSeller ? <Component {...props} /> : <Redirect to="/signin" />)}
		/>
	);
}
