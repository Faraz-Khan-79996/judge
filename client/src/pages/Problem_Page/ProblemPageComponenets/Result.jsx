import Alert from 'react-bootstrap/Alert';
import './result.css'

export default function Result({ resultInfo, submissionDoc = null }) {
    // console.log(resultInfo);
    if (resultInfo != null) {
        return (<>
            <div className="container">
                <div className="result-container">
                    <h2 className="result-heading">Submission Result</h2>
                    <div className="result-details">
                        <p><strong>Username :</strong> {resultInfo.submissionDoc.user}</p>
                        <p><strong>Submission Time : </strong>{resultInfo.submissionDoc.createdAt}</p>
                        <p><strong>Submission Id : </strong>{resultInfo.submissionDoc._id}</p>
                        <p><strong>Problem : </strong>{resultInfo.submissionDoc.problemName}</p>
                        <p><strong>Problem Id : </strong>{resultInfo.submissionDoc.problemId}</p>
                        <p><strong>Email :</strong> {resultInfo.submissionDoc.email}</p>
                        <p><strong>Language :</strong>{resultInfo.submissionDoc.language}</p>
                        <p><strong>Status :</strong> {resultInfo.submissionDoc.status == "Accepted" ? <span class="badge rounded-pill bg-success">Accepted</span> : <span class="badge rounded-pill bg-danger">Rejected</span>}</p>
                        <p><strong>Message :</strong> {resultInfo.submissionDoc.message}</p>
                    </div>
                    <div className="result-code">
                        <pre><code>{resultInfo.submissionDoc.code}</code></pre>
                    </div>
                    <div>
                        {"message" in resultInfo ? (
                            <Alert variant="danger">
                                <Alert.Heading>{resultInfo.type}</Alert.Heading>
                                <p>
                                    Fix your code bruh....
                                </p>
                                <hr />
                                <p className="mb-0">
                                    {resultInfo.message}
                                </p>
                            </Alert>
                        )
                            : null}
                        
                    </div>
                    {/* <button className="btn btn-custom">Submit Another Problem</button> */}
                </div>
            </div>
        </>)
    }

}