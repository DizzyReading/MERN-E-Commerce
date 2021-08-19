import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { styled } from '@material-ui/core/styles';
import { css, cx } from '@emotion/css';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';

const StyledStepper = withStyles({
	root: {
		padding: '24px 0 24px 0'
		// background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		// borderRadius: 3,
		// border: 0,
		// color: 'white',
		// height: 48,
		// padding: '0 30px',
		// boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
	}
	// label: {
	//   textTransform: 'capitalize',
	// },
})(Stepper);

const steps = [ 'Signin', 'Shipping', 'Payment', 'Place Order' ];

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

const CheckOutStepper = (props) => {
	// const steps = Object.values(props);
	// console.log(steps);

	console.log(props);
	return (
		<Box sx={{ width: '100%' }}>
			<DrawerHeader />
			<StyledStepper activeStep={props.step} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel
							className={css`
								font-weight: 500;
								padding: 0;
							`}
						>
							{label}
						</StepLabel>
					</Step>
				))}
			</StyledStepper>
		</Box>
	);
};

export default CheckOutStepper;
