import RTE from "../../components/RTE"
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import axios from 'axios';

import Solutions from "./components/Solutions";
import CheckBoxes from "./components/CheckBoxes";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Create({ params }) {

    const navigate = useNavigate();
    const [failure, setFailure] = useState(false)

    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm();

    async function onSubmit(problem) {
        try {
            console.log(problem);

            const { data } = await axios.post("http://localhost:3000/api/create", { problem })
            console.log(data);
            navigate(`/problem/${data._id}`)            
        } catch (error) {
            console.log(error);
            setFailure(error)
        }
    }

    if (failure) {
        return (
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              {failure.message}
            </p>
            <p>
              {failure.response?.data.message}
            </p>
            <Link to="/"><button className="btn btn-success btn-lg">Go back</button></Link> 
          </Alert>
        );
      }

    return (
        <div className="container mt-5 mb-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="inputField" className="form-label"><h3>Problem Name</h3></label>
                            <input {...register("name", { required: true })} type="text" className="form-control" id="inputField" placeholder="Enter text" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="textarea" className="form-label"><h3>Introduction</h3></label>
                            <textarea {...register("intro", { required: true })} className="form-control" id="textarea" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <h3>Difficulty</h3>
                    <CheckBoxes register={register}/>
                </div>
                <div className="row">
                    <h3>Description</h3>
                    <RTE control={control} name="description" errors={errors} />
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3 mt-5">
                            <label htmlFor="textarea1" className="form-label"><h4>Run Case input</h4></label>
                            <textarea {...register("runCases", { required: true })} className="form-control" id="textarea1" rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="textarea2" className="form-label"><h4>Test case input</h4> </label>
                            <textarea {...register("input", { required: true })} className="form-control" id="textarea2" rows="3"></textarea>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3 mt-5">
                            <label htmlFor="textarea3" className="form-label"><h4>Run case output</h4></label>
                            <textarea {...register("runOutput", { required: true })} className="form-control" id="textarea3" rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="textarea4" className="form-label"><h4>Test case output  </h4></label>
                            <textarea {...register("output", { required: true })} className="form-control" id="textarea4" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h3>Solutions</h3>
                    <Solutions control={control} errors={errors} />
                </div>
                <div className="row m-5">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>

            </form>
        </div>

    )
}