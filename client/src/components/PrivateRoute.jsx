import React, { useContext, useEffect, useState } from 'react';
import { Navigate} from 'react-router-dom';
// import { useAuth } from './AuthContext';
import UserContext from '../context/UserContext';
import Loader from './Loader';

const PrivateRoute = ({ component : Component, redirectPath ,...rest }) => {
    const { user } = useContext(UserContext);
    const [loading , setLoading] = useState(true)


  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  } , [])

    if (loading) {
      return (
        <Loader color="black" />
      )
  }
  
    return user ? (
    //   <Route {...rest} element={element} />
    <Component {...rest} />
    ) : 
    <Navigate to={redirectPath}/>
  };
  

export default PrivateRoute;