import Description from "./ProblemPageComponenets/Description"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import Solution_code from './ProblemPageComponenets/Solution_code'
import CodeEditor from "./ProblemPageComponenets/CodeEditor";
import { useState } from "react";
import Result from "./ProblemPageComponenets/Result";

export default function ProblemPage() {

    const [key, setKey] = useState('Description');
    const [resultInfo, setResultInfo] = useState(null);


    return (
        <div className="pt-1">
            <Link to="/"><Button style={{ position: 'absolute', top: "5px", left: "5px", zIndex: 1000 }} variant="secondary"><ArrowLeft /></Button></Link>
            <Tabs
                defaultActiveKey="Description"
                id="justify-tab-example"
                className="mb-3"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                justify
            >
                <Tab eventKey="Description" title="Description">
                    <Description />
                </Tab>
                <Tab eventKey="Editor" title="Editor">
                <CodeEditor setKey={setKey} setResultInfo={setResultInfo}/>
                </Tab>
                <Tab eventKey="Result" title="Result">
                    <div className="container">
                <Result  resultInfo={resultInfo}/>

                    </div>
                </Tab>
                <Tab eventKey="Solution" title="Solution">
                <Solution_code />
                </Tab>
            </Tabs>

        </div>
    )
}