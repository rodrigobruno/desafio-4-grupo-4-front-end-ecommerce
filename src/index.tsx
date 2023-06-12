import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { store } from 'store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.scss';

import ScrollToTop from 'componentes/ScrollToTop';
import App from 'App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <Provider store={store}>
                    <ScrollToTop />
                    <App />
                </Provider>
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>
);
