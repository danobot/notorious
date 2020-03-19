import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type mainMenuStateType = {
  counter: number;
  mainMenu: object;
};

export type GetState = () => mainMenuStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<mainMenuStateType, Action<string>>;
