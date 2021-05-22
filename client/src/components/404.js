import react from 'react';
import { Container, Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className='text-center my-5'>
      <h1>Error 404: Page Not Found</h1>
      <Button href='/' className="btn-primary-color mt-4">Back</Button>
    </Container>
  );
}

export default NotFound;