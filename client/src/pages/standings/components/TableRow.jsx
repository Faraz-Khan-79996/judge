import { useState } from "react";
import Solution from "./Solution";
import { formatDistanceToNow } from 'date-fns';

export default function TableRow({ _id, user, email,
    problemName, problemId, userId, language, code, status, message, createdAt }) {


    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <tr>
                <td>
                    <div className="d-flex align-items-center">
                        <img
                            src="https://avatars.githubusercontent.com/u/149095180?v=4"
                            alt=""
                            style={{ width: '45px', height: '45px' }}
                            className="rounded-circle"
                        />
                        <div className="ms-3">
                            <p className="fw-bold mb-1">{user}</p>
                            <p className="text-muted mb-0">{email}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <p className="fw-normal mb-1">{problemName}</p>
                </td>
                <td>
                    {status == "Rejected" ? (<span className="btn btn-danger">{status}</span>) : <span className="btn btn-success">{status}</span>}

                </td>
                <td>{message}</td>
                <td>
                    <h6 className="tw-font-semibold">{language}</h6>
                </td>
                <td>
                    <h6 className="tw-font-semibold">{formatDistanceToNow(createdAt, { addSuffix: true})}</h6>
                </td>
                <td>
                    <h6 className="tw-font-semibold">{_id}</h6>
                </td>
                <td>
                    <button onClick={() => setModalShow(true)} type="button" className="btn btn-primary btn-sm btn-rounded" >
                        {"</>"}
                    </button>
                </td>
            </tr>
            <Solution
                code={code}
                language={language}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}