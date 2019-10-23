import { connect } from 'react-redux';

import { Stepper } from '../components/Stepper.component';
import { getStepsForResource } from '../service/Stepper.selectors';
import { StepperStore } from '../service/Stepper.service.types';

// TODO fix this any
export const mapStateToProps = (state: StepperStore, ownProps: any) => ({
	steps: getStepsForResource(state, ownProps.resourceType, ownProps.resourceId),
});

export default connect(mapStateToProps)(Stepper);
