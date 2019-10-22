import { connect } from 'react-redux';

import { default as Stepper } from '../components/Stepper.component';
import { getStepsForResource } from '../service/Stepper.selectors';
import { StepperState } from '../service/Stepper.service.types';

// TODO fix this any
export const mapStateToProps = (state: StepperState, ownProps: any) => ({
	steps: getStepsForResource(state, ownProps.resourceType, ownProps.resourceId),
});

export default connect(mapStateToProps)(Stepper);
