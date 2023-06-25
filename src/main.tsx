import React from 'react'
import ReactDOM from 'react-dom/client'
import {RecoilRoot} from "recoil";
import {ErrorBoundary} from "react-error-boundary";

import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ErrorBoundary fallback={<div>Something went wrong, try to refresh</div>}>
            <RecoilRoot>
                <App/>
            </RecoilRoot>
        </ErrorBoundary>
    </React.StrictMode>,
)
