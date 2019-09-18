import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SchemaForm from '../src/compound/SchemaForm.component';
import Form from '../src/compound/Form.component';
import Input from '../src/compound/widgets/Input';

storiesOf('Compound/UIForm', module)
	.add('compound', () => (
		<Form onSubmit={action('submit')} onChange={action('change')} initialProperties={{ age: 12 }}>
			<Input schema={{ key: ['firstname'] }} type="text" label="First name" required />
			<Input schema={{ key: ['lastname'] }} type="text" label="Last name" required />
			<Input schema={{ key: ['age'] }} type="number" label="Age" />
			<Form.Buttons>
				<button type="reset" className="btn btn-default btn-tertiary">
					Reset
				</button>
				<button type="submit" className="btn btn-success right">
					Submit
				</button>
			</Form.Buttons>
		</Form>
	))
	.add('schema', () => {
		const schema = {
			jsonSchema: {
				type: 'object',
				properties: {
					firstname: { type: 'string' },
					lastname: { type: 'string' },
					age: { type: 'number' },
				},
				required: ['firstname', 'lastname'],
			},
			uiSchema: [
				{ key: 'firstname', title: 'First name' },
				{ key: 'lastname', title: 'Last name' },
				{ key: 'age', title: 'Age' },
			],
			properties: { age: 12 },
		};
		return (
			<SchemaForm schema={schema} onSubmit={action('submit')} onChange={action('change')}>
				<Form.Buttons>
					<button type="reset" className="btn btn-default btn-tertiary">
						Reset
					</button>
					<button type="submit" className="btn btn-success right">
						Submit
					</button>
				</Form.Buttons>
			</SchemaForm>
		);
	});
