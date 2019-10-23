import React, { useState } from 'react';
import Action from '@talend/react-components/lib/Actions/Action';
// eslint-disable-next-line
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { LanguageSwitcher } from './config/i18n';
import { Stepper } from '../src/components/Stepper.component';
import { StepperConstants } from '../src';

import './style.scss';
import { Step } from '../src/Stepper.types';

const stories = storiesOf('Stepper', module);

const title = 'Sample processing...';

function renderActions(isInError: boolean) {
	if (!isInError) {
		return null;
	}
	return (
		<React.Fragment>
			<Action label="retry" bsStyle="info" className="btn-inverse button-padding" />
			<Action label="edit dataset" bsStyle="info" className="button-padding" />
			<Action label="edit connection" bsStyle="info" className="button-padding" />
		</React.Fragment>
	);
}

stories
	.addDecorator(story => (
		<div style={{ backgroundColor: 'white', height: '400px' }} className="col-lg-offset-2 col-lg-8">
			<LanguageSwitcher />
			{story()}
		</div>
	))
	.add('Stepper default', () => {
		const steps: Step[] = [
			{
				label: 'Fetch Sample',
				status: StepperConstants.LOADING_STEP_STATUSES.SUCCESS,
				failureOn: [],
				successOn: [],
			},
			{
				label: 'Global Quality',
				status: StepperConstants.LOADING_STEP_STATUSES.LOADING,
				failureOn: [],
				successOn: [],
			},
			{
				label: 'Flattening',
				status: StepperConstants.LOADING_STEP_STATUSES.LOADING,
				failureOn: [],
				successOn: [],
			},
			{
				label: 'Column Quality',
				status: StepperConstants.LOADING_STEP_STATUSES.PENDING,
				failureOn: [],
				successOn: [],
			},
		];
		return <Stepper steps={steps} title={title} />;
	})
	.add('Stepper with error', () => {
		const steps = [
			{
				label: 'Fetch Sample',
				status: StepperConstants.LOADING_STEP_STATUSES.SUCCESS,
				message: { label: 'Everything is fine 🔥🐶' },
				failureOn: [],
				successOn: [],
			},
			{
				label: 'Global Quality',
				status: StepperConstants.LOADING_STEP_STATUSES.FAILURE,
				message: { label: "We couldn't connect to the remote engine" },
				failureOn: [],
				successOn: [],
			},
			{
				label: 'Flattening',
				status: StepperConstants.LOADING_STEP_STATUSES.ABORTED,
				failureOn: [],
				successOn: [],
			},
			{
				label: 'Column Quality',
				status: StepperConstants.LOADING_STEP_STATUSES.ABORTED,
				failureOn: [],
				successOn: [],
			},
		];
		return <Stepper steps={steps} title={title} renderActions={renderActions} />;
	})
	.add('Stepper without steps', () => (
		<Stepper steps={[]} title={title} renderActions={renderActions}>
			<p>No step to display here, it means content is already loaded.</p>
		</Stepper>
	))
	.add('Stepper successful', () => {
		const defaultSteps: Step[] = [
			{
				label: 'Fetch Sample',
				status: StepperConstants.LOADING_STEP_STATUSES.SUCCESS,
				failureOn: [],
				successOn: [],
			},
			{
				label: 'Global Quality',
				status: StepperConstants.LOADING_STEP_STATUSES.SUCCESS,
				failureOn: [],
				successOn: [],
			},
			{
				label: 'Flattening',
				status: StepperConstants.LOADING_STEP_STATUSES.SUCCESS,
				failureOn: [],
				successOn: [],
			},
			{
				label: 'Column Quality',
				status: StepperConstants.LOADING_STEP_STATUSES.LOADING,
				failureOn: [],
				successOn: [],
			},
		];

		function GetSteps(props: any) {
			const [steps, setSteps] = useState<Step[]>(defaultSteps);

			const init = () => {
				setSteps([
					{
						label: 'Fetch Sample',
						status: StepperConstants.LOADING_STEP_STATUSES.SUCCESS,
						failureOn: [],
						successOn: [],
					},
					{
						label: 'Global Quality',
						status: StepperConstants.LOADING_STEP_STATUSES.SUCCESS,
						failureOn: [],
						successOn: [],
					},
					{
						label: 'Flattening',
						status: StepperConstants.LOADING_STEP_STATUSES.SUCCESS,
						failureOn: [],
						successOn: [],
					},
					{
						label: 'Column Quality',
						status: StepperConstants.LOADING_STEP_STATUSES.LOADING,
						failureOn: [],
						successOn: [],
					},
				]);
			};

			const end = () => {
				setSteps([
					{
						label: 'Fetch Sample',
						status: StepperConstants.LOADING_STEP_STATUSES.SUCCESS,
						failureOn: [],
						successOn: [],
					},
					{
						label: 'Global Quality',
						status: StepperConstants.LOADING_STEP_STATUSES.SUCCESS,
						failureOn: [],
						successOn: [],
					},
					{
						label: 'Flattening',
						status: StepperConstants.LOADING_STEP_STATUSES.SUCCESS,
						failureOn: [],
						successOn: [],
					},
					{
						label: 'Column Quality',
						status: StepperConstants.LOADING_STEP_STATUSES.SUCCESS,
						failureOn: [],
						successOn: [],
					},
				]);
			};

			return (
				<div>
					<div>
						<Action onClick={init} label="init" />
						<Action onClick={end} label="end" />
					</div>
					{props.children(steps)}
				</div>
			);
		}

		return (
			<GetSteps>
				{(steps: Step[]) => (
					<Stepper steps={steps} title={title}>
						<div>
							Content is loaded.
							<div>
								<Action
									label="Action"
									bsStyle="info"
									className="btn-inverse button-padding"
									onClick={action('click')}
								/>
							</div>
						</div>
					</Stepper>
				)}
			</GetSteps>
		);
	});
