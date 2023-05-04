import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom' 
import App from './App.jsx'
import './index.css'
import CreateInvoice from './pages/CreateInvoice.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/createInvoice' element={<CreateInvoice />}/>
        </Routes>
    </BrowserRouter>
)
