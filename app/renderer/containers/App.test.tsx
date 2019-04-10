import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {configureStore, history} from '../store';
import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore();
  ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
