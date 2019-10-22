import get from 'lodash/get';
import { STATE_KEY } from '../Stepper.constants';
import { getStepperKey, isStepsLoading } from './Stepper.utils';
import { StepperState } from './Stepper.service.types';

export function getStepsForResource(store: StepperState, resourceType: string, resourceId: string) {
	return get(store, [STATE_KEY, getStepperKey({ resourceType, resourceId }), 'steps'], []);
}

export function isResourceLoading(store: StepperState, resourceType: string, resourceId: string) {
	return isStepsLoading(getStepsForResource(store, resourceType, resourceId));
}
