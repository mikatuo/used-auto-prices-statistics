import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout/Layout';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Layout />, document.getElementById('root'));
registerServiceWorker();
