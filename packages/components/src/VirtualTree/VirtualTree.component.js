import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tree from 'react-virtualized-tree/lib/TreeContainer';
import UnstableFastTree from 'react-virtualized-tree/lib/UnstableFastTree';
import TreeState from 'react-virtualized-tree/lib/state/TreeState';

import Renderers from 'react-virtualized-tree/lib/renderers';
import theme from './VirtualTree.scss';
import { Nodes } from '../TreeView/data';

import ThreeState from '../TreeView/renderers/ThreeState';
import Expandable from './Expandable';
import { ActionButton } from '../Actions/ActionButton/ActionButton.component';
//const { Expandable } = Renderers;

const SELECT = 3;

function nodeNameRenderer(rendererProps) {
	const {
		node: { name },
		children,
	} = rendererProps;
	return <span>{children}</span>;
	/*return (
		<span>
			{name}
			{children}
		</span>
	);*/
}
const Selection = props => {
	const { node, children, onChange, index } = props;
	const { state: { selected } = {} } = node;

	return (
		<span>
			<ThreeState
				node={node}
				//	index={index}
				onChange={() =>
					onChange({
						node: {
							...node,
							state: {
								...(node.state || {}),
								selected: !selected,
							},
						},
						type: SELECT,
						index,
					})
				}
			>
				{children}
			</ThreeState>
		</span>
	);
};

class VirtualTree extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nodes: props.fast ? TreeState.createFromTree(props.nodes) : props.nodes,
			all: '',
		};
		this.onClickSelectAll = this.onClickSelectAll.bind(this);
		this.onClickUnselectAll = this.onClickUnselectAll.bind(this);
	}

	onClickSelectAll() {
		const nodes = this.selectNodes(this.state.nodes, true);
		this.setState({ nodes, all: 'selected' });
	}

	onClickUnselectAll() {
		const nodes = this.selectNodes(this.state.nodes, false);
		this.setState({ nodes, all: 'unselected' });
	}

	nodeSelectionHandler = (nodes, updatedNode) =>
		nodes.map(node => {
			if (node.id === updatedNode.id) {
				return {
					...updatedNode,
					children: node.children
						? this.selectNodes(node.children, updatedNode.state.selected)
						: [],
				};
			}

			if (node.children) {
				return { ...node, children: this.nodeSelectionHandler(node.children, updatedNode) };
			}

			return node;
		});

	selectNodes = (nodes, selected) =>
		nodes.map(n => ({
			...n,
			children: n.children ? this.selectNodes(n.children, selected) : [],
			state: {
				...n.state,
				selected,
			},
		}));

	handleChange = nodes => {
		this.setState({ nodes });
	};

	render() {
		if (this.props.fast) {
			return (
				<React.Fragment>
					{this.props.selectAllButton ? (
						<ActionButton
							label={this.state.all !== 'selected' ? 'Select all' : 'Unselect all'}
							onClick={
								this.state.all !== 'selected' ? this.onClickSelectAll : this.onClickUnselectAll
							}
						/>
					) : null}
					<UnstableFastTree
						nodes={this.state.nodes}
						onChange={this.handleChange}
						extensions={{
							updateTypeHandlers: {
								[SELECT]: this.nodeSelectionHandler,
							},
						}}
					>
						{({ style, node, ...rest }) => {
							// console.log('rest', rest);
							return (
								<div style={style}>
									<Expandable node={node} {...rest}>
										<Selection node={node} {...rest}>
											{this.props.nodeLabelRenderer() || node.name}
										</Selection>
									</Expandable>
								</div>
							);
						}}
					</UnstableFastTree>
				</React.Fragment>
			);
		}
		return (
			<React.Fragment>
				{this.props.selectAllButton ? (
					<ActionButton
						label={this.state.all !== 'selected' ? 'Select all' : 'Unselect all'}
						onClick={
							this.state.all !== 'selected' ? this.onClickSelectAll : this.onClickUnselectAll
						}
					/>
				) : null}
				<Tree
					nodes={this.state.nodes}
					onChange={this.handleChange}
					extensions={{
						updateTypeHandlers: {
							[SELECT]: this.nodeSelectionHandler,
						},
					}}
				>
					{({ style, node, ...rest }) => (
						<div style={style}>
							<Expandable node={node} {...rest}>
								<Selection node={node} {...rest}>
									{node.name}
								</Selection>
							</Expandable>
						</div>
					)}
				</Tree>
			</React.Fragment>
		);
	}
}

VirtualTree.displayName = 'VirtualTree';
VirtualTree.propTypes = {
	selectAllButton: PropTypes.bool,
	//	name: PropTypes.string,
	nodes: PropTypes.arrayOf(PropTypes.object),
	fast: PropTypes.bool,
	nodeLabelRenderer: PropTypes.func,
};

export default VirtualTree;
