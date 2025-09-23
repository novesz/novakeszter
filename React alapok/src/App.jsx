import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Home.jsx'
import Regiok from './Regiok.jsx'
import Reg from './Reg.jsx'
import Regk from './Regk.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/regiok" element={<Regiok />} />
            <Route path="/reg" element={<Reg/>} />
            <Route path="/regketto" element={<Regk/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
