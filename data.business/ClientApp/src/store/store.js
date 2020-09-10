import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import {createEpicMiddleware} from 'redux-observable';
import {epics} from '../services/rootEpics';
import {reducers} from "../reducers/rootReducer";
import {configureStore} from "@reduxjs/toolkit";

export default function configure(history, preloadedState) {
    const simpleRouter = routerMiddleware(history);
    const epicMiddleware = createEpicMiddleware();

    const logger = createLogger({
        collapsed: true,
    });

    const middleware = [thunkMiddleware, simpleRouter, logger, epicMiddleware];
    const middlewareEnhancer = applyMiddleware(...middleware);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);
    
    const store = configureStore({
        reducer: reducers,
        middleware,
        devTools: process.env.NODE_ENV !== 'production',
    });
    
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('../reducers/rootReducer', () => {
            const nextRootEpic = require('../services/rootEpics').epics;
            const nextRootReducer = require('../reducers/rootReducer').reducers;

            epicMiddleware.replaceEpic(epics);
            store.replaceReducer(nextRootReducer);
        })
    }

    epicMiddleware.run(epics);

    return store
}

