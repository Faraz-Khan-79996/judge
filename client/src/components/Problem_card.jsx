import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Problem_card({ _id , name , intro , difficulty}) {
  return (
    <Card className='mt-5'>
      <Card.Header as="h5">{name}</Card.Header>
      <Card.Body>
        <Card.Title>{difficulty}</Card.Title>
        <Card.Text>
        {intro}
        </Card.Text>
        <Link to={`/problem/${_id}`}>
          <Button variant="primary">Solve</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Problem_card;