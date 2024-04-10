import NavbarComponent from "./components/NavbarComponent"
import {Outlet} from 'react-router-dom'

export default function HomeLayout() {
    return (
        <main>
            <NavbarComponent />
            <Outlet />
        </main>
    )
}