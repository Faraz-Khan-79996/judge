// import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage';
import HomeLayout from './HomeLayout'
import ProblemPage from './pages/Problem_Page/ProblemPage'
import Create from './pages/Create_Problem/Create';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <HomeLayout/> }>
          <Route index element={ <HomePage/> } />
          <Route path='/create' element={ <Create/> }/>

        </Route>
          <Route path='/problem/:id' element={ <ProblemPage/> } />
      </Routes>
    </>
  )
}

export default App
