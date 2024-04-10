import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Problem_card({ }) {
  return (
    <Card className='mt-5'>
      <Card.Header as="h5">Linear Search</Card.Header>
      <Card.Body>
        <Card.Title>Easy</Card.Title>
        <Card.Text>
        Linear search is a simple searching algorithm that checks each element in a list sequentially until the desired element is found or the list is exhausted. It is straightforward but can be inefficient for large lists as it has a time complexity of O(n), where n is the number of elements in the list.
        </Card.Text>
        <Link to="/problem">
          <Button variant="primary">Solve</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Problem_card;