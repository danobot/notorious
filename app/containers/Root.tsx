import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { ThemeProvider } from 'styled-components';
import { Store } from '../reducers/types';
import Routes from '../Routes';
import darkTheme from '../utils/dark_theme.json';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <ConnectedRouter history={history}>
        <DndProvider backend={HTML5Backend}>
          <Routes />
        </DndProvider>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

export default hot(Root);
