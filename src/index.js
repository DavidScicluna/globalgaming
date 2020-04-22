// React library
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Redux Store
import store from './store/store';

// Components
import App from './container/App';

// Style sheet
import './index.css';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));