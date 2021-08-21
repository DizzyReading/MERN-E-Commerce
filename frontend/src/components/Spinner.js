import { FaSpinner } from 'react-icons/fa';
import { css, cx } from '@emotion/css';

const Spinner = () => {
	return (
		<div
			className={css`
				display: block;
				margin: 0 auto;
				text-align: center;
			`}
		>
			<FaSpinner />
		</div>
	);
};

export default Spinner;
