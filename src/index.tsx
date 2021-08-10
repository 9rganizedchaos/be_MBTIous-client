import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from "./assets/styles/global-styles";
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from "./store"

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle/>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);