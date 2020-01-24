import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Button, OverlayTrigger } from 'react-bootstrap';

import Icon from '../../Icon';
import TooltipTrigger from '../../TooltipTrigger';
import getPropsFrom from '../../utils/getPropsFrom';

import theme from './ActionIconToggle.scss';

function renderButton(active, className, icon, iconTransform, id, label, ...rest) {
	const cn = classNames(className, 'tc-icon-toggle', theme['tc-icon-toggle'], {
		[theme.active]: active,
		active,
	});

	return (
		<Button
			{...getPropsFrom(Button, rest)}
			id={id}
			className={cn}
			aria-label={label}
			aria-pressed={active}
			bsStyle="link"
		>
			<Icon name={icon} transform={iconTransform} />
		</Button>
	);
}

function ActionIconToggle(props) {
	const { label, tooltipPlacement, ...rest } = props;

	if (label) {
		return (
			<TooltipTrigger label={label} tooltipPlacement={tooltipPlacement}>
				{renderButton(rest)}
			</TooltipTrigger>
		);
	}

	return renderButton(rest);
}

ActionIconToggle.propTypes = {
	active: PropTypes.bool,
	className: PropTypes.string,
	icon: PropTypes.string.isRequired,
	iconTransform: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

ActionIconToggle.defaultProps = {
	active: false,
	tooltipPlacement: 'top',
};

ActionIconToggle.displayName = 'ActionIconToggle';
export default ActionIconToggle;
