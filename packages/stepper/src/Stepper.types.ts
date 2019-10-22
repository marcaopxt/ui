import { LOADING_STEP_STATUSES } from './Stepper.constants';

export type StepHooks = string[] | string;

export interface Step {
	label: string;
	message: string;
	status: LOADING_STEP_STATUSES;
	loadingOn: StepHooks;
	failureOn: StepHooks;
	successOn: StepHooks;
}

export type ResourceType = string;
export type ResourceId = string;
