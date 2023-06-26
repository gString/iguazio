import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {RecoilRoot} from "recoil";
import {ErrorBoundary} from "react-error-boundary";

import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ErrorBoundary fallback={<div>Something went wrong, try to refresh</div>}>
            <RecoilRoot>
                <Suspense fallback={<h1>Loading, please wait...</h1>}>
                    <App/>
                </Suspense>
            </RecoilRoot>
        </ErrorBoundary>
    </React.StrictMode>,
)
