import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SchemaForm from '../src/compound/SchemaForm.component';
import Form from '../src/compound/Form.component';
import Input from '../src/compound/widgets/Input';
import schemaBuilder from '../src/compound/schema/schema-builder';

storiesOf('Compound/validation', module)
	.add('compound', () => (
		<Form onSubmit={action('submit')} onChange={action('change')}>
			<Input name="firstname" type="text" label="First name" required />
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
				initialValue={12}
			/>
			<Input name="email1" pattern="^\\S+@\\S+$" type="email" label="Email" required />
			{/* <Fieldset condition={properties => true}></Fieldset> */}
			{/* <Formif condition={properties => properties.firstname === 'lol'}>
				<Fieldset></Fieldset>
			</Formif> */}
			{/* <Formif condition={condition1}>
				<Fieldset>
					<Formif condition={condition2}>
						<Input></Input>
					</Formif>
					<Input></Input>
					<Input></Input>
					<Input></Input>
					<Input></Input>
					<Input></Input>
					<Input></Input>
				</Fieldset>
			</Formif> */}
			{/* with children as function */}
			{condition && (
				<Fieldset>
					{condition2 && <Input />}
					<Input></Input>
					<Input></Input>
					<Input></Input>
					<Input></Input>
					<Input></Input>
					<Input></Input>
				</Fieldset>
			)}
			<Input
				condition={properties => true}
				name="email2"
				type="email"
				label="Email"
				onValidate={(event, value) => true}
				required
				initialValue="lol@lol.com"
			/>
			}{/*
			 build schema from props
			 propagate initialValue + onValidate on mount
			  */}
			<Input name="email" pattern="^\\S+@\\S+$" type="email" label="Email" required />
			<Form.Buttons>
				<button type="reset" className="btn btn-default btn-tertiary">
					Reset
				</button>
				#
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
