import Description from "./ProblemPageComponenets/Description"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Link, useParams } from "react-router-dom";
import Solution_code from './ProblemPageComponenets/Solution_code'
import CodeEditor from "./ProblemPageComponenets/CodeEditor";
import { useEffect, useState } from "react";
import Result from "./ProblemPageComponenets/Result";
import FadeLoader from "react-spinners/FadeLoader";
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';

export default function ProblemPage() {

    const {id} = useParams()

    const [key, setKey] = useState('Description');
    const [resultInfo, setResultInfo] = useState(null);

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    const [problem, setProblem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [failure, setFailure] = useState(false)

    useEffect(() => {
        axios.get(`/api/problem/${id}`)
        .then(({ data }) => {
            console.log(data);
            setProblem(() => data)
            setLoading(() => false)
        })
        .catch(err => {
            console.log(err);
            setFailure(() => err)
            setLoading(() => false)
        })
    }, [])

    if (loading) {
        return (
            <div className="middle">
                <FadeLoader
                    color={"green"}
                    loading={loading}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        )
    }

    if (failure) {
        return (
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              {failure.message}
            </p>
            <p>
              {failure.response?.data}
            </p>
            <Link to="/"><button className="btn btn-success btn-lg">Go back</button></Link>
            
          </Alert>
        );
      }

    return (
        <div className="pt-1">
            <Link to="/"><Button style={{ position: 'absolute', top: "5px", left: "5px", zIndex: 1000,width : "60px" }} variant="secondary"><ArrowLeft /></Button></Link>
            <Tabs
                defaultActiveKey="Description"
                id="justify-tab-example"
                className="mb-3"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                justify
            >
                <Tab eventKey="Description" title="Description">
                    <Description {...problem} />
                </Tab>
                <Tab eventKey="Editor" title="Editor">
                    <CodeEditor setKey={setKey} setResultInfo={setResultInfo} {...problem} />
                </Tab>
                <Tab eventKey="Result" title="Result">
                    <div className="container">
                        <Result resultInfo={resultInfo} {...problem}/>

                    </div>
                </Tab>
                <Tab eventKey="Solution" title="Solution">
                    <Solution_code {...problem} />
                </Tab>
            </Tabs>

        </div>
    )
}