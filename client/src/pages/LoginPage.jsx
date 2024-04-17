import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form"
import UserContext from "../context/UserContext";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft } from 'react-bootstrap-icons';

export default function LoginPage() {

    const {login} = useContext(UserContext)

    const Navigate = useNavigate()

    const {register , handleSubmit} = useForm()
    const [err , setErr] = useState(false)
    const [loading , setLoading] = useState(false)

    async function onSubmit(data) {
        setLoading(()=>true)
        console.log(data);
        const {username , password} = data

        try {
            await login(username, password)
            Navigate('/')
        } catch (error) {
            console.log(error);
            setErr(error)
        }
        setLoading(false)
    }


    return (
        <>
            {err && (<Alert variant="danger" onClose={() => setErr(false)} dismissible>
                <Alert.Heading>{err.response?.data || err.name}</Alert.Heading>
                <p>
                    {err.message}
                </p>
            </Alert>)}
            {/* ************************************* */}
            <Link to="/"><Button style={{ position: 'absolute', top: "5px", left: "5px", zIndex: 1000 , width : "60px"}} variant="secondary"><ArrowLeft /></Button></Link>
            <div className="row mt-5 pt-5">
                <h1 className="col-6 offset-3 tw-font-semibold tw-text-3xl tw-mb-8">Login <Link to="/signup"><button className="btn btn-lg btn-warning">Signup</button> </Link></h1>
                
                <div className="col-6 offset-3">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" id="username" {...register("username" , {required:true})} className="form-control"/>
                                    <div className="valid-feedback">Looks good</div>
                                    <div className="invalid-feedback">Invalid</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" id="password" {...register("password" , {required:true})} className="form-control"/>
                                    <div className="valid-feedback">Looks good</div>
                                    <div className="invalid-feedback">Invalid</div>
                            </div>


                            <button className="btn btn-success">Login{'  '}{loading && (<Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />)}</button>

                        </form>

                </div>
            </div>
        </>
    )
}