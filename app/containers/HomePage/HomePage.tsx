import React from 'react';
import Home from '../../components/Home/Home';
import * as actions from './actions';
import * as configActions from '../../reducers/configActions';

import { connect, ReactReduxContext } from 'react-redux';
import { bindActionCreators } from 'redux';
import config from '../../utils/config';

// class HomePage extends React.Component {

//     componentDidMount =() => {


//     }
//   render = () => {

//     return  <div>{JSON.stringify(this.props, true, 2)}</div>
//   }
// }
function mapStateToProps(state: MiddleMenuStateType) {
	return { ...state.settings, config: config }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(Object.assign(actions,configActions), dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
//
// export default connect(mapStateToProps, mapDispatchToProps)();

