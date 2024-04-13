// import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage';
import HomeLayout from './HomeLayout'
import ProblemPage from './pages/Problem_Page/ProblemPage'
import Create from './pages/Create_Problem/Create';
import Signup from './pages/Signup';
import LoginPage from './pages/LoginPage';
import UserContextProvider from './context/UserContextProvider';

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path='/create' element={<Create />} />

          </Route>
          <Route path='/problem/:id' element={<ProblemPage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
