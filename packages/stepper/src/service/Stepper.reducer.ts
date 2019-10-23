import omit from 'lodash/omit';
import get from 'lodash/get';
import invariant from 'invariant';
import { LOADING_STEP_STATUSES, initialState } from '../Stepper.constants';

import { getStepperKey, isStepsLoading } from './Stepper.utils';
import {
	LOADING_STEPS_INIT,
	LOADING_STEPS_REMOVE,
	LOADING_STEPS_PROCEED_EVENT,
	StepperActionTypes,
	ProceedLoadingEventAction,
	StepperState,
} from './Stepper.service.types';
import { Step } from '../Stepper.types';

const isInStepAttribute = (stepAttribute: string | string[] | undefined, value: string) =>
	(typeof stepAttribute === 'string' && stepAttribute === value) ||
	(Array.isArray(stepAttribute) && stepAttribute.includes(value));

const checkAttribute = (attributeName: 'failureOn' | 'successOn' | 'loadingOn') => (
	step: Step,
	event: string,
) => isInStepAttribute(step[attributeName], event);

const isEventTriggerFail = checkAttribute('failureOn');
const isEventTriggerSuccess = checkAttribute('successOn');
const isEventTriggerLoading = checkAttribute('loadingOn');

function mapStepWithNoError(step: Step, action: ProceedLoadingEventAction) {
	if (isEventTriggerSuccess(step, action.event)) {
		return {
			...step,
			status: LOADING_STEP_STATUSES.SUCCESS,
		};
	}
	if (isEventTriggerLoading(step, action.event) && step.status !== LOADING_STEP_STATUSES.SUCCESS) {
		return {
			...step,
			status: LOADING_STEP_STATUSES.LOADING,
		};
	}
	return step;
}

function getNewStepsWithError(steps: Step[], action: ProceedLoadingEventAction): Step[] {
	let errorHandled = false;
	return steps.map(step => {
		if (step.status && step.status !== LOADING_STEP_STATUSES.SUCCESS) {
			if (!errorHandled && isEventTriggerFail(step, action.event)) {
				errorHandled = true;

				return {
					...step,
					status: LOADING_STEP_STATUSES.FAILURE,
					message: action.message,
				};
			}
			return {
				...step,
				status: LOADING_STEP_STATUSES.ABORTED,
			};
		}
		return step;
	});
}

const hasAttribute = (step: Step, attribute: 'failureOn' | 'successOn' | 'loadingOn') => {
	if (step[attribute] !== undefined) {
		return (step[attribute] as String[]).length > 0;
	}
	return !!step[attribute];
};

const hasStepFailure = (step: Step) => hasAttribute(step, 'failureOn');
const hasStepSuccess = (step: Step) => hasAttribute(step, 'successOn');
const hasStepLoading = (step: Step) => hasAttribute(step, 'loadingOn');

/**
 * This function check & mutate the steps
 * @param steps the loading steps
 */
function checkSteps(steps: Step[]) {
	return steps.map(step => {
		if (!hasStepFailure(step)) {
			invariant(
				process.env.NODE_ENV === 'production',
				`Stepper : No failureOn step for ${step.label} step`,
			);
		}
		if (!hasStepSuccess(step)) {
			invariant(
				process.env.NODE_ENV === 'production',
				`Stepper : No successOn step for ${step.label} step`,
			);
		}
		if (!hasStepLoading(step) && !step.status) {
			invariant(
				process.env.NODE_ENV === 'production',
				`Stepper : No loadingOn step or initial status for ${step.label} step`,
			);
		}
		if (!step.status) {
			return { ...step, status: LOADING_STEP_STATUSES.PENDING };
		}
		return step;
	});
}

/**
 * This function change the status of the steps in order to reflect the event
 * @param state redux state
 * @param action the redux action
 */
function handleEvent(state: StepperState, action: ProceedLoadingEventAction): StepperState {
	const loadingKey = getStepperKey(action);
	const loadingResource = get(state, [loadingKey], {});
	const steps: Step[] = get(loadingResource, 'steps', []);
	if (!isStepsLoading(steps)) {
		return state;
	}
	const isErrorTriggered = !!steps.find(step => isInStepAttribute(step.failureOn, action.event));
	let newSteps: Step[];
	if (isErrorTriggered) {
		newSteps = getNewStepsWithError(steps, action);
	} else {
		newSteps = steps.map(step => mapStepWithNoError(step, action));
	}

	return {
		...state,
		[loadingKey]: { ...loadingResource, steps: newSteps },
	};
}

/**
 * This function is a classic reducer
 * It handle the Loading Steps of a resource
 * @param state Redux state
 * @param action Redux Action
 */
export default function stepperReducer(
	state: StepperState = initialState,
	action: StepperActionTypes,
): StepperState {
	switch (action.type) {
		case LOADING_STEPS_INIT:
			return { ...state, [getStepperKey(action)]: { steps: checkSteps(action.steps) } };
		case LOADING_STEPS_REMOVE:
			return omit(state, getStepperKey(action));
		case LOADING_STEPS_PROCEED_EVENT:
			return handleEvent(state, action);
		default:
			return state;
	}
}
