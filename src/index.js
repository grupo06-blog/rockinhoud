import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './js/config/routes';
import { Provider } from 'react-redux';
import Store from './js/store';
import * as firebase from 'firebase';

import './sass/index.scss';
import ConfigSettings from '../src/js/helpers/credentials';

const StoreInstance = Store();

const config = ConfigSettings.firebase;
firebase.initializeApp(config);

ReactDOM.render(
    <Provider store={StoreInstance}>
        <Routes/>
    </Provider>,
    document.getElementById('root')
);
