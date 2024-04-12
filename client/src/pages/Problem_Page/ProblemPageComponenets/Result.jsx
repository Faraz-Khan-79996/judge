import Alert from 'react-bootstrap/Alert';

export default function Result({ resultInfo }) {
    // console.log(resultInfo);
    if (resultInfo == null) {
        return <></>
    }
    if ("msg" in resultInfo) {
        return (
            <Alert variant="danger">
            <Alert.Heading>Error Occurred</Alert.Heading>
            <p>
                Fix your code bruh....
            </p>
            <hr />
            <p className="mb-0">
                {resultInfo.msg}
            </p>
        </Alert>
        )

    }

    if (resultInfo.verdict) {
        return (
            <div>
                <Alert variant="success">
                    <Alert.Heading>Solution Accepted</Alert.Heading>
                    <p>
                        Congratulations! Your solution has been accepted. You've shown exceptional problem-solving skills and a deep understanding of the concepts. This achievement reflects your dedication and perseverance. Keep up the fantastic work!
                    </p>
                    <hr />
                    <p className="mb-0">
                        Your ability to tackle complex coding challenges is truly impressive. Keep practicing and exploring new concepts. Your determination and skills are paving the way for your success.
                    </p>
                </Alert>
            </div >
        )
    }
    else {
        return (
            <Alert variant="danger">
            <Alert.Heading>Submission Failed</Alert.Heading>
            <p>
                Oh no! Your submission did not pass all the test cases. Don't be disheartened; this is an opportunity to learn and improve. Review the requirements and test cases carefully, and try again. Keep pushing yourself, and you'll overcome this challenge!
            </p>
            <hr />
            <p className="mb-0">
                Remember, every setback is a stepping stone to success. Stay determined and keep honing your coding skills. You're on the right track!
            </p>
        </Alert>
        )

    }

}