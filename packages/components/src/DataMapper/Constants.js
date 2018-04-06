/**
 * Defines the type of user interaction event
 */
export const Events = {
	ENTER_ELEM: 'enter-elem',
	LEAVE_ELEM: 'leave-elem',
	FILTERING: 'filtering',
	UNDO: 'undo',
	REDO: 'redo',
};

export const Commands = {
	ADD_MAPPING: 'add-mapping',
	REMOVE_MAPPING: 'remove-mapping',
	CLEAR_MAPPING: 'clear-mapping',
};

/**
 * Defines the type of draggable element.
 */
export const ItemTypes = {
	ELEMENT: 'element',
};

/**
 * Defines the two sides of a mapping (input and output)
 */
export const MappingSide = {
	INPUT: 'input',
	OUTPUT: 'output',
};

/**
 * Switch between the two sides of mapping.
 * @param {string} side - the side of the mapping
 * @returns {string}
 */
export function switchMappingSide(side) {
	if (side === MappingSide.INPUT) {
		return MappingSide.OUTPUT;
	}
	return MappingSide.INPUT;
}

/**
 * Defines style and part of a connection anchor.
 */
export const Anchor = {
	STYLE: {
		UNMAPPED: 'unmapped',
		MAPPED: 'mapped',
		FOCUSED: 'focused',
		SELECTED: 'selected',
	},
	PART: {
		START: 'start',
		END: 'end',
	},
};

/**
 * Defines parameters of a connection.
 */
export const Connection = {
	STYLE: {
		ALL: 'all',
		CURRENT: 'current',
		FOCUSED: 'focused',
		PENDING: 'pending',
	},
	PART: {
		START: 'start',
		CURVE: 'curve',
		END: 'end',
	},
	VISIBILITY: {
		FULL: 'full',
		LEFT: 'left',
		RIGHT: 'right',
		NONE: 'none',
	},
};

export const Schema = {
	RENDERER: {
		DEFAULT: 'default',
		VIRTUAL_LIST: 'virtual-list',
		LIST: 'list',
	},
	DATA_KEYS: {
		NAME: 'name',
		TYPE: 'type',
		DESC: 'desc',
	},
	COLUMN: {
		NAME: 'name',
		TYPE: 'type',
		DESCRIPTION: 'description',
	},
};

export const Keys = {
	UP: 38,
	DOWN: 40,
	SWITCH_SCHEMA: 9,
	ENTER: 13,
	ESCAPE: 27,
	DELETE: 46,
	REDO: 89,
	UNDO: 90,
};

export const Configs = {
	DRAGGABLE: true,
};

const defaultConnectionParams = {
	anchorRadius: 5,
	lineWidth: 4,
	lineDash: null,
	arrowWidth: 12,
	arrowHeight: 12,
};

/**
 * Defines the graphical parameters of a connection.
 * PENDING: a connection is in progress
 * CURRENT: connection of a selected mapped schema element
 * FOCUSED: connection of an overflown mapped schema element
 * ALL:
 */
export const ConnectionParams = {
	PENDING: {
		...defaultConnectionParams,
		lineDash: [4, 4],
		color: '#111111',
	},
	CURRENT: {
		...defaultConnectionParams,
		color: '#000000',
	},
	FOCUSED: {
		...defaultConnectionParams,
		color: '#999999',
	},
	ALL: {
		...defaultConnectionParams,
		anchorRadius: 4,
		lineWidth: 3,
		arrowWidth: 10,
		arrowHeight: 10,
		color: '#CCCCCC',
	},
};