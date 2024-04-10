// import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage';
import HomeLayout from './HomeLayout'
import ProblemPage from './pages/Problem_Page/ProblemPage'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <HomeLayout/> }>
          <Route index element={ <HomePage/> } />

        </Route>
          <Route path='/problem' element={ <ProblemPage/> } />
      </Routes>
    </>
  )
}

export default App
