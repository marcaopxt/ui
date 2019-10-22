import { ResourceType, ResourceId, Step } from '../Stepper.types';

export const LOADING_STEPS_REMOVE = 'LOADING_STEPS_REMOVE';
export const LOADING_STEPS_INIT = 'LOADING_STEPS_INIT';
export const LOADING_STEPS_PROCEED_EVENT = 'LOADING_STEPS_PROCEED_EVENT';

export type StepperResource = {
	resourceType: ResourceType;
	resourceId: ResourceId;
};

export type InitStepperAction = {
	type: typeof LOADING_STEPS_INIT;
	resourceType: ResourceType;
	resourceId: ResourceId;
	steps: Step[];
};

export type ProceedLoadingEventAction = {
	type: typeof LOADING_STEPS_PROCEED_EVENT;
	resourceType: ResourceType;
	resourceId: ResourceId;
	event: string;
	message: {
		label?: string;
	};
};

export type RemoveStepperAction = {
	type: typeof LOADING_STEPS_REMOVE;
	resourceType: ResourceType;
	resourceId: ResourceId;
};

export type StepperActionTypes =
	| InitStepperAction
	| ProceedLoadingEventAction
	| RemoveStepperAction;

export type StepperResourceInformation = StepperResource | StepperActionTypes;

export type StepperState = {
	[key: string]: { steps: Step[] };
};
