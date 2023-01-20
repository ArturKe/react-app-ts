import { useState } from 'react'
import './App.css'
import List from './components/list/list'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import PageLayout from './components/layouts/Page/PageLayout'
import Header from './components/header/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={
                <PageLayout
                    header={<Header></Header>}
                    // blocCenter={<ListComponent/>}
                    blocCenter={<List/>}
                />}
            />
            <Route path="/info" element={
                <PageLayout
                    header={<Header></Header>}
                    blocCenter={<div>Here is some info!</div>}
                />}
            />
        </Routes>

    </BrowserRouter>
  )
  // return (
  //   <div className="App">
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src="/vite.svg" className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://reactjs.org" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <List/>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </div>
  // )
}

export default App
