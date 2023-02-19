import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import PageLayout from './components/layouts/Page/PageLayout'
import Header from './components/header/Header'
import ListComponent from './components/lists/list/ListComponent'

function App() {
    const [count, setCount] = useState(0)

    return (
        <BrowserRouter>
            <PageLayout
                header={<Header></Header>}
                blocCenter={
                    <Routes>
                        <Route path="/" element={<ListComponent/>}/>
                        <Route path="/info" element={<div>Here is some info!</div>}/>
                    </Routes>
                }
            />
        </BrowserRouter>
    )
}

export default App
