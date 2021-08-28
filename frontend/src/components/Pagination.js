import IconButton from '@material-ui/core/IconButton';
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';
import { css, cx } from '@emotion/css';
import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

const Pagination = ({ showPerPage, onPageChange, total, products }) => {
	const [ count, setCount ] = useState(1);
	const [ numOfButtons, setNumOfButtons ] = useState(Math.ceil(total / showPerPage));

	useEffect(
		() => {
			const value = showPerPage * count;
			console.log('start val:', value - showPerPage);
			console.log('end val:', value);

			onPageChange(value - showPerPage, value);
		},
		[ count, showPerPage ]
	);

	const clickHandler = (type) => {
		if (type === 'prev') {
			// if (count >= 1) {
			// 	setCount(count - 1);
			// }
			if (count === 1) {
				setCount(1);
			} else {
				setCount(count - 1);
			}
		} else {
			if (numOfButtons === count) {
				setCount(count);
			} else {
				setCount(count + 1);
			}
		}
	};

	console.log('count', count);

	return (
		<div
			className={css`
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 2rem 0 2rem 0;
			`}
		>
			<IconButton aria-label="previous" onClick={() => clickHandler('prev')}>
				<GrFormPrevious />
			</IconButton>
			<ul
				className={css`
					display: flex;
					align-items: center;
					justify-content: space-between;
				`}
			>
				{new Array(numOfButtons).fill('').map((el, idx) => (
					<li key={idx} class={`page-item ${idx + 1 === count ? 'active' : null}`}>
						<Button onClick={() => setCount(idx + 1)}>{idx + 1}</Button>
					</li>
				))}
			</ul>
			<IconButton aria-label="next" onClick={() => clickHandler('next')}>
				<GrFormNext />
			</IconButton>
		</div>
	);
};

export default Pagination;
