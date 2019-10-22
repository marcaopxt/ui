import { LOADING_STEP_STATUSES } from '../Stepper.constants';
import { StepperResourceInformation } from './Stepper.service.types';
import { Step } from '../Stepper.types';

/**
 * This function returns the key to point the loading step in the store
 * It's based on the resourceType / resourceId
 * internally usage only in the loading step service
 * @param action redux action
 */
export const getStepperKey = (action: StepperResourceInformation): string =>
	`${action.resourceType}-${action.resourceId}`;

/**
 * This function tells if there is an error in the steps
 * @param steps array of steps
 */
export const isErrorInSteps = (steps: Step[]): boolean =>
	steps.some(step => step.status === LOADING_STEP_STATUSES.FAILURE);

/**
 * This function tells if all the steps are successful
 * @param steps array of steps
 */
export const isAllSuccessful = (steps: Step[]): boolean =>
	steps.every(step => step.status === LOADING_STEP_STATUSES.SUCCESS);

/**
 * This function tells if the loading is done, by an error, a success ot not started
 * @param steps array of steps
 */
export const isStepsLoading = (steps: Step[]): boolean =>
	steps.length !== 0 && !isAllSuccessful(steps) && !isErrorInSteps(steps);
