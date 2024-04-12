import { useEffect, useState } from "react"
import Problem_card from "../components/Problem_card"
import axios from "axios"
import FadeLoader from "react-spinners/FadeLoader";
import Alert from 'react-bootstrap/Alert';

export default function HomePage() {

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    const [problems, setProblems] = useState(null)
    const [loading, setLoading] = useState(true)
    const [failure, setFailure] = useState(false)

    useEffect(() => {
        axios.get("/api/problems")
        .then(({ data }) => {
            setProblems(() => data)
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
          </Alert>
        );
      }

    return (
        <div>
            <div className="container">

                {problems.length >0 && problems.map((problem)=><Problem_card {...problem} key={problem._id} />)}
            </div>
        </div>
    )
}