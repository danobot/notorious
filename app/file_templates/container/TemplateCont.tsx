import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Template from '../components/Template/Template';
import * as actions from './actions';

import { TemplateStateType } from '../../reducers/types';
class TemplateCont extends PureComponent {
  componentDidMount = () => {
    console.log('TemplateCont will mount');
    dispatchAction.Read({
      targetKey: URL,
      url: URL
    })
  }
  render() {
    return <Template {...this.props}/>;

  }
}


function mapStateToProps(state: TemplateStateType) {
  return {
    Template: []
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateCont);
