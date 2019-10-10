import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SchemaForm from '../src/compound/SchemaForm.component';
import Form from '../src/compound/Form.component';
import Input from '../src/compound/widgets/Input';
import schemaBuilder from '../src/compound/schema/builder';

storiesOf('Compound/validation', module)
	.add('compound', () => (
		<Form onSubmit={action('submit')} onChange={action('change')} initialProperties={{ age: 12 }}>
			<Input
				schema={schemaBuilder()
					.setKey('firstname')
					.setRequired()
					.build()}
				type="text"
				label="First name"
				required
			/>
			<Input
				schema={schemaBuilder()
					.setKey('lastname')
					.setRequired()
					.build()}
				type="text"
				label="Last name"
				required
			/>
			<Input
				schema={schemaBuilder()
					.setKey('age')
					.setType('number')
					.build()}
				type="number"
				label="Age"
			/>
			<Input
				schema={schemaBuilder()
					.setKey('email')
					.setType('string')
					.setPattern('^\\S+@\\S+$')
					.setRequired()
					.build()}
				type="email"
				label="Email"
				required
			/>
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
					email: { type: 'string', pattern: '^\\S+@\\S+$' },
				},
				required: ['firstname', 'lastname', 'email'],
			},
			uiSchema: [
				{ key: 'firstname', title: 'First name' },
				{ key: 'lastname', title: 'Last name' },
				{ key: 'age', title: 'Age' },
				{ key: 'email', title: 'Email' },
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
