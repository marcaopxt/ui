import React, { SFC } from 'react';
import Transition, { ENTERED, EXITED, ENTERING } from 'react-transition-group/Transition';

export const DEFAULT_TRANSITION_DURATION = 300;

const defaultStyle = {
	transition: `opacity ${DEFAULT_TRANSITION_DURATION}ms ease-in-out`,
	opacity: 0,
	display: 'flex',
	overflow: 'auto',
	height: '100%',
	width: '100%',
};

const transitionStyles: { [key: string]: any } = {
	[ENTERING]: { opacity: 0 },
	[ENTERED]: { opacity: 1 },
	[EXITED]: { display: 'none' },
};

type StepperTransitionProps = {
	active: boolean;
};

export const StepperTransition: SFC<StepperTransitionProps> = ({ children, active }) => {
	if (!children) {
		return null;
	}

	return (
		<Transition timeout={DEFAULT_TRANSITION_DURATION} in={active}>
			{state => (
				<div
					style={{
						...defaultStyle,
						...transitionStyles[state],
					}}
				>
					{children}
				</div>
			)}
		</Transition>
	);
};
