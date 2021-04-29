import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './application/store';
import './views/style/index.css';
import './views/style/bootstrap.min3.css';
import App from './views/App';

import './views/i18n';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
