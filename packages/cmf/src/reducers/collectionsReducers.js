/**
 * @module react-cmf/lib/reducers/collectionsReducers
 */
import { Map, List, fromJS } from 'immutable';
import invariant from 'invariant';
import CONSTANTS from '../constant';

export const defaultState = new Map();

/**
 * Get element id. If it doesn't have "id" property, we consider it as immutable.
 */
export function getId(element) {
	const id = element.id;
	if (id === undefined) {
		return element.get('id');
	}
	return id;
}

/**
 * addElementToCollection
 *
 * @param state current redux state
 * @param action redux action
 * @returns {object} the new state
 */
function addCollectionElement(state, action, path) {
	if (action.operations.add) {
		return action.operations.add.reduce((s, e) => {
			const element = s.get(action.id);
			if (List.isList(element)) {
				return s.set(action.id, element.push(e));
			}
			if (Map.isMap(element)) {
				return s.set(action.id, element.merge(e));
			}
			return state;
		}, state);
	}
	return state;
}

function deleteListElements(state, action) {
	function shouldBeRemoved(element) {
		return action.operations.delete.indexOf(getId(element)) >= 0;
	}

	const collection = state.get(action.id);
	if (collection.some(shouldBeRemoved)) {
		return state.set(action.id, collection.filterNot(shouldBeRemoved));
	}
	return state;
}

function deleteMapElements(state, action) {
	const collection = state.get(action.id);

	if (action.operations.delete.some(id => collection.has(id))) {
		const changedCollection = action.operations.delete.reduce(
			(collectionAccu, element) => collectionAccu.delete(element),
			collection,
		);
		return state.set(action.id, changedCollection);
	}

	return state;
}

/**
 * deleteElementFromCollection
 *
 * @param state current redux state
 * @param action redux action
 * @returns {object} the new state
 */
function deleteCollectionElement(state, action, path) {
	if (action.operations.delete) {
		const collection = state.get(action.id);
		if (Map.isMap(collection)) {
			return deleteMapElements(state, action);
		} else if (List.isList(collection)) {
			return deleteListElements(state, action);
		}
		throw new Error('CMF collection deletion is only compatible with ImmutableJs List and Map');
	}
	return state;
}

function updateListElements(state, action) {
	const updates = action.operations.update;

	const changedCollection = state.get(action.id).map(element => updates[getId(element)] || element);
	return state.set(action.id, changedCollection);
}

function updateMapElements(state, action, path) {
	const updates = action.operations.update;
	const changedCollection = Object.keys(updates).reduce(
		(collectionAccu, id) => collectionAccu.set(id, updates[id]),
		state.get(path[0]),
	);
	return state.set(path[0], changedCollection);
}

/**
 * updateCollectionElement
 *
 * @param state current redux state
 * @param action redux action
 * @returns {object} the new state
 */
function updateCollectionElement(state, action, path) {
	if (action.operations.update) {
		// get a piece of state
		const collection = state.get(path[0]);
		// if the collection is nested
		if (path.length > 1) {
			return updateCollectionElement(collection, action, path.slice(1));
		} else if (Map.isMap(collection)) {
			return updateMapElements(state, action, path);
		} else if (List.isList(collection)) {
			return updateListElements(state, action);
		}
		throw new Error('CMF collection update is only compatible with ImmutableJs List and Map');
	}
	return state;
}

/**
 * mutateCollection
 *
 * @param {object} state the current redux state
 * @param {object} action redux action
 * @returns {object} the new state
 */
function mutateCollection(state, action) {
	const splitPath = Array.isArray(action.id) ? action.id : action.id.split('.');
	if (!action.operations || !state.hasIn(splitPath) || state.isEmpty()) {
		return state;
	}
	let newState = addCollectionElement(state, action, splitPath);
	newState = deleteCollectionElement(newState, action, splitPath);
	return updateCollectionElement(newState, action, splitPath);
}

/**
 * @param  {object} state  the state
 * @param  {object} action redux action
 * @return {object}        the new state
 */
function collectionsReducers(state = defaultState, action) {
	switch (action.type) {
		case CONSTANTS.COLLECTION_ADD_OR_REPLACE:
			return state.set(action.collectionId, fromJS(action.data));
		case CONSTANTS.COLLECTION_REMOVE:
			if (!state.get(action.collectionId)) {
				invariant(
					process.env.NODE_ENV === 'production',
					`Can't remove collection ${action.collectionId} since it doesn't exist.`,
				);
				return state;
			}
			return state.delete(action.collectionId);
		case CONSTANTS.COLLECTION_MUTATE:
			return mutateCollection(state, action);
		default:
			return state;
	}
}

export default collectionsReducers;
