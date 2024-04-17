import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';

function Problem_card({ _id , name , intro , difficulty}) {
  
  const {user} = useContext(UserContext)
  const [isPresent , setIsPresent] = useState(false)

  useEffect(()=>{
      if(user){
        if(user.solved.includes(_id)){
          setIsPresent(()=>true)
        }
      }
      else{
        setIsPresent(()=>false)
      }
  } , [user])
  
  const [forceUpdate, setForceUpdate] = useState(false);
  // Update the forceUpdate state when the user context changes
  useEffect(() => {
    setForceUpdate(prevState => !prevState);
  }, [user]);


  return (
    <Card className='mt-5'>
      <Card.Header as="h5"><span className='tw-text-lg tw-font-semibold'>{name}</span>{" "}{isPresent && (<Badge pill bg="warning" text="dark">
        Solved
      </Badge>)}</Card.Header>
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