import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {RecoilRoot} from "recoil";
import {ErrorBoundary} from "react-error-boundary";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ErrorBoundary fallback={<div>Something went wrong, try to refresh</div>}>
            <RecoilRoot>
                <App/>
            </RecoilRoot>
        </ErrorBoundary>
    </React.StrictMode>,
)
