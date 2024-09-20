import { useState } from 'react'
import './App.css'
import HelloWrold from './HelloWorld'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import Footer from './components/Footer'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <HeaderComponent ></HeaderComponent>
      <Routes>
        <Route path='/' element={<ListEmployeeComponent />}></Route>
        <Route path='/employees' element={<ListEmployeeComponent />}></Route>

        <Route path='/add-employee' element={<EmployeeComponent />}></Route>
        <Route path='/edit-employee/:id' element={<EmployeeComponent />} ></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
    </>
  )
}

export default App
