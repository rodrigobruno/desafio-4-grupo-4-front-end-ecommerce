import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AppRoutes />
    </React.StrictMode>
);
