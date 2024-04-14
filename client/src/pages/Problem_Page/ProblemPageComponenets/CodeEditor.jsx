import React, { useContext, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import UserContext from '../../../context/UserContext';

const CodeEditor = ({ setKey, setResultInfo , _id , }) => {
    const [language, setLanguage] = useState('cpp');
    const [theme, setTheme] = useState('vs-dark');
    const [fontSize, setFontSize] = useState(14);
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [code, setCode] = useState('');
    // const [submittedButton, setSubmittedButton] = useState(null);
    const [loadingRun, setLoadingRun] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)

    const {updateUser} = useContext(UserContext)


    const handleOutputChange = (e) => {
        setOutputValue(e.target.value);
    };

    async function runCode(e) {
        e.preventDefault()
        setLoadingRun(prev => true)
        const payload = {
            code,
            language,
            inputValue,
        }

        try {
            const { data } = await axios.post('/api/run', { payload });
            // console.log({ data });
            setOutputValue(data.output)
        } catch (e) {
            if (e.response) {
                // The request was made and the server responded with a status code

                const customError = e.response.data
                // console.log(e.response.data);
                if (customError.type == "compilation error") {
                    setOutputValue(customError.message)
                }
                else if (customError.type == "execution failure") {
                    setOutputValue(customError.message)
                }
            } else if (e.request) {
                // The request was made but no response was received
                // console.log(error.request);
                alert('No response received')
            } else {
                // Something happened in setting up the request that triggered an Error
                alert(e.message)
                console.log('Error', e.message);
            }
        }
        setLoadingRun(prev => false)
    }

    async function submitCode(e) {
        e.preventDefault()
        setLoadingSubmit(prev => true)
        const payload = {
            code,
            language,
        }

        try {
            // const { data } = await axios.post('/api/submit', { payload });
            const { data } = await axios.post(`/api/submit/${_id}`, { payload });
            console.log(data);
            setResultInfo(data)
            updateUser()
        } catch (e) {
            if (e.response) {
                // The request was made and the server responded with a status code

                const customError = e.response.data
                // console.log(e.response.data);
                if (customError.type == "compilation error") {
                    setResultInfo({ msg: customError.message })
                }
                else if (customError.type == "execution failure") {
                    setResultInfo({ msg: customError.message })
                }

            } else if (e.request) {
                // The request was made but no response was received
                // console.log(error.request);
                alert('No response received')
            } else {
                // Something happened in setting up the request that triggered an Error
                alert(e.message)
                console.log('Error', e.message);
            }
        }
        setLoadingSubmit(prev => false)
        setKey("Result")
    }


    return (
        <div className="container mt-5">

            <Row>
                <Col md={8}>
                    <Row>
                        <Col md={4}>
                            <div>
                                <label htmlFor="language" className="form-label">Language:</label>
                                <select id="language" value={language} onChange={(e) => setLanguage(prev => e.target.value)} className="form-select">
                                    <option value="cpp">C++</option>
                                    <option value="c">C</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                    {/* Add more language options as needed */}
                                </select>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div>
                                <label htmlFor="theme" className="form-label">Theme:</label>
                                <select id="theme" value={theme} onChange={(e) => setTheme(e.target.value)} className="form-select">
                                    <option value="vs-dark">Dark</option>
                                    <option value="vs-light">Light</option>
                                    {/* Add more theme options as needed */}
                                </select>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div>
                                <label htmlFor="fontSize" className="form-label">Font Size:</label>
                                <input
                                    id="fontSize"
                                    type="number"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                                    className="form-control"
                                />
                            </div>
                        </Col>
                    </Row>
                    <div className='border'>
                        <Editor
                            height="60vh"
                            // defaultLanguage={language}
                            language={language}
                            defaultValue={"//Write your code"}
                            value={code}
                            onChange={(value) => setCode(value)}
                            theme={theme}
                            options={{ fontSize }}
                        />
                    </div>
                </Col>
                <Col md={4}>

                    <div>
                        <label htmlFor="input" className="form-label">Input:</label>
                        <textarea
                            id="input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="form-control"
                            rows="8"
                        />
                    </div>
                    <div>
                        <label htmlFor="output" className="form-label">Output:</label>
                        <textarea
                            id="output"
                            value={outputValue}
                            // onChange={handleOutputChange}
                            className="form-control"
                            rows="8"
                            readOnly
                        />
                    </div>
                    <div className='mt-3'>
                        <button
                            onClick={runCode}
                            type='submit'
                            name='run'
                            className='btn btn-warning'>Run {loadingRun && (<Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />)}</button>{'        '}
                        <button
                            onClick={submitCode}
                            type='submit'
                            name='submit'
                            className='btn btn-success'>Submit {loadingSubmit && (<Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />)}</button>
                    </div>

                </Col>
            </Row>

        </div>
    );
};

export default CodeEditor;
