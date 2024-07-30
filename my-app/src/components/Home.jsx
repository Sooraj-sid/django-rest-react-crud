import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';



const Home = () => {
  const[books, setBooks] = useState([]);

  const getAllEntities = async () => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/allbook');
      setBooks(response.data);
    }catch(error){
      if (error.response) {
        console.error(`Error Status Code: ${error.response.status}`);
        console.log(error.response.data);
      }else {
        console.error('There was a problem with the axios request:', error.message);
    }
    }
  };

  useEffect(() => {
    getAllEntities();
  }, [])
  return (
    <div className='row'>
    {books.map((book,index) => (
        <Card className='col-2 m-2' key={book.book_id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`http://127.0.0.1:8000/${book.image}`} />
            <Card.Body>
                <Card.Title>{book.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">${book.price}</Card.Subtitle>
              
                <Card.Text>{book.author}</Card.Text>
                <Card.Text>{book.category}</Card.Text>
                <Link className="btn btn-primary" to={`/book/${book.book_id}`}>View Book</Link>

            </Card.Body>
        </Card>
    ))}
</div>
  )
}

export default Home