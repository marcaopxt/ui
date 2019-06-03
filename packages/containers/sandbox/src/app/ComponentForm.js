import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';
import ComponentForm from '../../../src/ComponentForm/ComponentForm.component';
import { isComponentFormDirty } from '../../../src/ComponentForm/ComponentForm.selectors';
import { setComponentFormDirtyState } from '../../../src/ComponentForm/ComponentForm.actions';

const componentId = 'external';
function SandboxBody({ dirty, dispatch }) {
	const [example, setExample] = React.useState('titleMap');
	return (
		<div>
			<form className="form full-form">
				<fieldset>
					<legend>configuration</legend>

					<div className="form-group">
						<label>form schema</label>
						<select onChange={e => setExample(e.target.value)} className="form-control">
							<option value="titleMap">titleMap</option>
							<option value="validation">validation</option>
						</select>
						<p className="help-block">Choose the schema you want to use</p>
					</div>
					<div className="form-group">
						<p className="help-block">You can use the following button to test API to set the form state to Dirty without changing the form content. Current form state is Dirty : { dirty.toString() }</p>
						<button
							className="btn btn-default"
							onClick={() => dispatch(setComponentFormDirtyState(componentId, false))}
						>Reset dirty</button>

					</div>
				</fieldset>
			</form>
			<hr />
			<ComponentForm
				definitionURL={`api/v1/forms/${example}`}
				uiSpecPath="ui"
				triggerURL="/api/v1/application/action"
				className="full-form"
				componentId={componentId}
			/>
		</div>
	);
}
SandboxBody.displayName = 'SandboxBody';
SandboxBody.propTypes = {
	dirty: PropTypes.bool.isRequired,
	dispatch: PropTypes.func,
};

function mapStateToProps(state) {
	return { dirty: isComponentFormDirty(state, componentId) };
}

export default cmfConnect({ mapStateToProps, withDispatch: true })(SandboxBody);
