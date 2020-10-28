import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";

import { ConnectedRouter } from "connected-react-router"
import { Provider } from "react-redux"

import store, {history} from "./redux/store"

(window as any).store = store

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)