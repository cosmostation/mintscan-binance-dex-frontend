import React, {useRef, useState} from "react";

import Skeleton from "react-skeleton-loader";
import clsx from "clsx";
import styles from "./Carousel.scss";
import {useEffect} from "react";

export default function Carousel({children, timing = 8000}) {
	const [state, setState] = useState({before: children.length - 1, cur: 0, idle: true, total: children.length});

	const timeout = useRef();
	const insideTimeout = useRef();

	useEffect(() => {
		if (children.length === 1) {
			setState({before: 1, cur: 0, idle: true, total: 1});
			return;
		}

		timeout.current = setTimeout(() => {
			setState(prev => ({
				...prev,
				before: prev.before + 1 >= children.length ? 0 : prev.before + 1,
				cur: prev.cur + 1 >= children.length ? 0 : prev.cur + 1,
				idle: false,
			}));

			insideTimeout.current = setTimeout(() => {
				setState(prev => ({...prev, idle: true}));

				insideTimeout.current && clearTimeout(insideTimeout.current);
			}, 2000);
			timeout.current && clearTimeout(timeout.current);
		}, timing);

		return () => {
			timeout.current && clearTimeout(timeout.current);
			insideTimeout.current && clearTimeout(insideTimeout.current);
		};
	}, [children.length, state.cur, timing]);

	return state.total === 0 ? (
		<Skeleton />
	) : (
		<div className={styles.container}>
			<div className={styles.sliderInner}>
				{children.map((el, idx) => (
					<div key={idx} className={clsx(styles.next, state.cur === idx && styles.wipeIn, state.before === idx && styles.wipeOut)}>
						{el}
					</div>
				))}
			</div>
		</div>
	);
}
