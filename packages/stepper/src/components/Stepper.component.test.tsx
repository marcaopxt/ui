import React from 'react';
import { shallow } from 'enzyme';
import { Stepper } from './Stepper.component';
import { LOADING_STEP_STATUSES } from '../Stepper.constants';
import { Step } from '../Stepper.types';

describe('Stepper Component', () => {
	describe('render', () => {
		it('should render when there is no errors in the steps', () => {
			// given
			const title = 'Test';
			const steps: Step[] = [
				{
					label: 'Fetch Sample',
					status: LOADING_STEP_STATUSES.SUCCESS,
					failureOn: [],
					loadingOn: [],
					successOn: [],
				},
				{
					label: 'Global Quality',
					status: LOADING_STEP_STATUSES.LOADING,
					failureOn: [],
					loadingOn: [],
					successOn: [],
				},
				{
					label: 'Flattening',
					status: LOADING_STEP_STATUSES.LOADING,
					failureOn: [],
					loadingOn: [],
					successOn: [],
				},
				{
					label: 'Column Quality',
					status: LOADING_STEP_STATUSES.PENDING,
					failureOn: [],
					loadingOn: [],
					successOn: [],
				},
			];
			const renderActions = jest.fn();
			// when
			const wrapper = shallow(
				<Stepper steps={steps} title={title} renderActions={renderActions} />,
			);
			// then
			expect(renderActions).toHaveBeenCalledWith(false);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render when there is an errors in the steps', () => {
			// given
			const title = 'Test';
			const steps: Step[] = [
				{
					label: 'Fetch Sample',
					status: LOADING_STEP_STATUSES.SUCCESS,
					failureOn: [],
					loadingOn: [],
					successOn: [],
				},
				{
					label: 'Global Quality',
					status: LOADING_STEP_STATUSES.FAILURE,
					message: { label: "We couldn't connect to the remote engine" },
					failureOn: [],
					loadingOn: [],
					successOn: [],
				},
				{
					label: 'Flattening',
					status: LOADING_STEP_STATUSES.ABORTED,
					failureOn: [],
					loadingOn: [],
					successOn: [],
				},
				{
					label: 'Column Quality',
					status: LOADING_STEP_STATUSES.ABORTED,
					failureOn: [],
					loadingOn: [],
					successOn: [],
				},
			];
			const renderActions = jest.fn();
			// when
			const wrapper = shallow(
				<Stepper steps={steps} title={title} renderActions={renderActions} />,
			);
			// then
			expect(renderActions).toHaveBeenCalledWith(true);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
