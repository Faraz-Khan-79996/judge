import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from 'axios'
import Loader from "../components/Loader";

const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        // console.log("clicked!");
        setDarkMode(!darkMode);
        // Update the data-bs-theme attribute
        document.documentElement.setAttribute('data-bs-theme', darkMode ? 'light' : 'dark');
    };

    useEffect(() => {
        // console.log(loading);
        axios.get('/api/profile', {
            withCredentials: true
        })
            .then(({ data }) => {
                setUser(() => data)
                setLoading(() => false)
            })
            .catch(e => {
                //If there's no response, there's something wrong on making the request it self
                if (!e.response) {
                    alert(e.message)
                }
                setLoading(() => false)
            })
    }, [])


    // Received from backend '/api/login' and '/api/profile'
    const login = async (username, password) => {
        try {
            const { data } = await axios.post('/api/login', { username, password }, { withCredentials: true })
            setUser(() => data)
        } catch (error) {
            throw error
        }

    };

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/logout', { withCredentials: true })
            setUser(() => null)
        } catch (error) {
            throw error
        }
    };

    const signup = async (username, password, email) => {
        try {
            const { data } = await axios.post('/api/signup', { username, password, email }, { withCredentials: true })
            setUser(() => data)
        } catch (error) {
            throw error
        }
    }
    const updateUser = async () => {
        try {
            axios.get('/api/profile', {
                withCredentials: true
            })
                .then(({ data }) => {
                    setUser(() => data)
                    // console.log("happened");
                })
                .catch(e => {
                    //If there's no response, there's something wrong on making the request it self
                    if (!e.response) {
                        alert(e.message)
                    }
                })
        } catch (error) {
            throw error
        }
    }

    if (loading) {
        return <Loader />
    }
    else {
        return (
            <UserContext.Provider value={{ user, setUser, login, logout, signup, updateUser ,darkMode , toggleDarkMode }}>
                {children}
            </UserContext.Provider>
        );
    }

}

export default UserContextProvider;