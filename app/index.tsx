import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';

import './app.global.css';
// const apiConfig = { baseURL: "http://localhost:1337/parse", appId: 'yourappid', masterKey: 'yourmasterkey' }

const store = configureStore();

// Set an axios instance


// setApiInstance(
//   axios.create(apiConf)
// )
// // Set Dispatch - Optional, if you want to use actions with any place without worry about redux-connect
// setDispatch(store.dispatch)
// setDefaultIdKey('_id')
// setErrorHandler(
//   function(err) {
//     if(err  &&  err.response) {
//       console.log(err)
//     }
//   }

// )
const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
);
