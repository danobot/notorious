import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { ThemeProvider } from 'styled-components';
import { Store } from '../reducers/types';
import Routes from '../Routes';
import darkTheme from '../utils/dark_theme.json';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

export default hot(Root);
