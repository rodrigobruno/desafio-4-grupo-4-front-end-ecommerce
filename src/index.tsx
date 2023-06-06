import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <AppRoutes />
        </HelmetProvider>
    </React.StrictMode>
);
