import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ActionButton from '../../../../Actions/ActionButton';
import RichLayout from '../../../../RichTooltip/RichLayout';
import getDefaultT from '../../../../translate';
import Icon from '../../../../Icon';
import theme from './ColumnChooserModal.scss';

const columnDisplay = (length, onChangeVisibility, onChangeOrder) => {
	return ({ label, hidden, locked, order }, index) => (
		<div
			id="columnDisplay"
			key={`${label}-${index}`}
			style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}
		>
			{locked ? (
				<Icon name="talend-locked" />
			) : (
				<span>
					<input
						id="label"
						name="scales"
						onChange={() => onChangeVisibility(index, !hidden)}
						type="checkbox"
						checked={hidden}
					/>
				</span>
			)}
			<span>{label}</span>
			<span>
				<input
					style={{ width: '25px' }}
					onChange={event => onChangeOrder(event, index)}
					placeholder={order}
					type="text"
				/>
				{`/${length}`}
			</span>
		</div>
	);
};

class ColumnChooserModal extends React.Component {
	static defaultProps = {
		t: getDefaultT(),
	};

	static propTypes = {
		header: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
		content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
		footer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
		onChangeVisibilityColumn: PropTypes.func.isRequired,
		onChangeOrderColumn: PropTypes.func.isRequired,
		onClickModify: PropTypes.func.isRequired,
		t: PropTypes.func,
	};

	getLayoutComponent = () => {
		return {
			header: this.props.header || this.getDefaultHeader(),
			content: this.props.content || this.getDefaultContent(),
			footer: this.props.footer || this.getDefaultFooter(),
		};
	};

	getDefaultHeader = () => {
		return (
			<React.Fragment>
				{this.props.t('COLUMN_CHOOSER_HEADER_TITLE', {
					defaultValue: 'Modifying columns position',
				})}
			</React.Fragment>
		);
	};

	getDefaultContent = () => {
		const { columns } = this.props;
		return (
			<div id="defaultContent" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				{columns.map(
					columnDisplay(
						columns.length,
						this.props.onChangeVisibilityColumn,
						this.props.onChangeOrderColumn,
					),
				)}
			</div>
		);
	};

	getDefaultFooter = () => {
		return (
			<React.Fragment>
				<ActionButton
					onClick={event => this.props.onClickModify(event)}
					label={this.props.t('COLUMN_CHOOSER_FOOTER_BUTTON', { defaultValue: 'Modify' })}
				/>
			</React.Fragment>
		);
	};

	componentWillUnmount() {
		this.props.onExit();
	}

	render() {
		const layoutComponent = this.getLayoutComponent();
		return (
			<div
				id={`${this.props.id}-modal`}
				className={classNames(theme['tc-column-chooser-modal'], 'tc-column-chooser-modal')}
			>
				<RichLayout
					Header={layoutComponent.header}
					Content={layoutComponent.content}
					Footer={layoutComponent.footer}
				/>
			</div>
		);
	}
}

export default ColumnChooserModal;
