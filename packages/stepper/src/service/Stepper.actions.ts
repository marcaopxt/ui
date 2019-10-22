import {
	LOADING_STEPS_INIT,
	LOADING_STEPS_PROCEED_EVENT,
	LOADING_STEPS_REMOVE,
	InitStepperAction,
	ProceedLoadingEventAction,
	RemoveStepperAction,
} from './Stepper.service.types';
import { ResourceType, ResourceId, Step } from '../Stepper.types';

function checkResourceParameters(resourceType: ResourceType, resourceId: ResourceId) {
	if (!resourceType) {
		throw new Error('Stepper Reducer : resourceType should be present in the action');
	}
	if (!resourceId) {
		throw new Error('Stepper Reducer : resourceId should be present in the action');
	}
}

/**
 * This function init the store for some loading steps component
 * @param resourceType the resource type we load
 * @param resourceId the id of the resource we load
 * @param steps the steps we have to load
 */
export function initStepper(
	resourceType: ResourceType,
	resourceId: ResourceId,
	steps: Step[] = [],
): InitStepperAction {
	checkResourceParameters(resourceType, resourceId);
	return {
		type: LOADING_STEPS_INIT,
		resourceType,
		resourceId,
		steps,
	};
}

/**
 * This function generate an action to tell the loading that we have
 * intercept some event to proceed in the loading process
 * @param resourceType the resource type we load
 * @param resourceId the id of the resource we load
 * @param event event catch
 */
export function proceedLoadingEvent(
	resourceType: ResourceType,
	resourceId: ResourceId,
	event: string,
	messageLabel?: string,
): ProceedLoadingEventAction {
	checkResourceParameters(resourceType, resourceId);
	return {
		type: LOADING_STEPS_PROCEED_EVENT,
		resourceType,
		resourceId,
		event,
		message: { label: messageLabel },
	};
}

/**
 * This function return an action to remove a loading from the store
 * @param resourceType the resource type we load
 * @param resourceId the id of the resource we load
 */
export function removeStepper(
	resourceType: ResourceType,
	resourceId: ResourceId,
): RemoveStepperAction {
	checkResourceParameters(resourceType, resourceId);
	return {
		type: LOADING_STEPS_REMOVE,
		resourceType,
		resourceId,
	};
}
