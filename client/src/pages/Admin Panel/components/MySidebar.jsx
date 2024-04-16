import React, { useState } from 'react';
// import {
//     FaTh,
//     FaBars,
//     FaUserAlt,
//     FaRegChartBar,
//     FaCommentAlt,
//     FaShoppingBag,
//     FaThList
// }from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { ArrowRight , List } from 'react-bootstrap-icons';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/admin/dashboard",
            name:"Dashboard",
            icon:<ArrowRight/>
        },
        {
            path:"/admin/create",
            name:"Create Problem",
            icon:<ArrowRight/>
        },
        {
            path:"/admin/problems",
            name:"Problems",
            icon:<ArrowRight/>
        },
        {
            path:"/admin/users",
            name:"Users",
            icon:<ArrowRight/>
        },
        // {
        //     path:"/admin",
        //     name:"Product",
        //     icon:<ArrowRight/>
        // },
        // {
        //     path:"/admin",
        //     name:"Product List",
        //     icon:<ArrowRight/>
        // }
    ]
    return (
        <div className="">
           <div style={{width: isOpen ? "250px" : "50px"}} className="my-sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="my-logo">{"</>"}</h1>
                   <div style={{marginLeft: isOpen ? "130px" : "0px"}} className="my-bars">
                       <List size={30} onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="my-link" activeClassName="my-active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           {/* <div className="my-main">{children}</div> */}
        </div>
    );
};

export default Sidebar;