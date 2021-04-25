import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand><Link to='/'><img alt="Hangman-Logo" src="/hangman-logo.png" height="40"></img></Link></Navbar.Brand>
        <Nav className="mr-auto">
          <Link to='/' className='nav-link'>
            Game Board
          </Link>
          <Link to='/scores' className='nav-link'>
            Top Scores
          </Link>
        </Nav>
      </Navbar>
    </Fragment>
  );
}

export default Navigation;
