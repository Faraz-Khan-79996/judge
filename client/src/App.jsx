import { useState, useRef } from 'react'
import axios from 'axios';
import './App.css'
import SampleCode from './Code';
import Description from './Description';

import Editor from '@monaco-editor/react';
import Footer from './Footer';

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


function App() {
  const [loading, setLoading] = useState(false)
  const editorRef = useRef(null)

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  async function submit(ev) {
    setLoading(() => true)
    const response = await axios.post("/compile", { code: editorRef.current.getValue() })
    console.log(response);
    if(response.data.message){
      alert("compilation failed")
    }
    else if(response.data.verdict == true){
      alert("YOUR SOLUTION IS CORRECT!!!")
    }else{
      alert("YOUR SOLUTION IS INCORRECT!!!")
    }
    setLoading(() => false)
  };


  return (
    <>
      <Description />

      <div className="container mt-5">
        <SampleCode />

        <Editor
          height="80vh"
          // width="70vh" 
          defaultLanguage="cpp"
          defaultValue="//Write your code here"
          theme='vs-dark'
          onMount={handleEditorDidMount} />
    <button className='btn btn-lg btn-primary m-5 position-relative' onClick={submit} style={{ position: 'relative' }}>
      Submit {loading && (
        <ClipLoader
          color="white"
          loading={loading}
          css={override}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </button>
      </div>
      <Footer />
    </>
  )
}

export default App
