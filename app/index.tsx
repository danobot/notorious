import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';


import PouchInit from "./PouchInit";


// Configure Store
export const store = configureStore();
export const pouchInit = new PouchInit(store);

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
    )
);

function close() {
  pouchInit.cancel();
}

document.addEventListener("online", (ev) =>{
    console.log("oneline")
});

document.addEventListener("offline", (ev) =>{
    console.log("offline")
});


// this causes mulitple windows to open
document.addEventListener("unload", (ev) =>
{
  console.log("Before closing")
  close()
//   // store.dispatch({type: SHUT_DOWN_APP})

//  // ev.preventDefault();
//   //alert("Before closing")
//   alert("after closing")
//     return true
//     // return ev.returnValue = 'Are you sure you want to close?';
});
