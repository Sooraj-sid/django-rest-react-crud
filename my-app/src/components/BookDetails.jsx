import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';


const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getEntityById = async () => {
    try{
      const response = await axios.get(`http://127.0.0.1:8000/book/${id}`);
      setBook(response.data);
      setLoading(false)
    } catch (error) {
      if (error.response) {
        setError(`Error Status Code: ${error.response.status} - ${error.response.data}`);
      } else {
        setError (`There Was a problem with the axios request: ${error.message}`);
      }
      setLoading(false);
    }
  };

  const deleteEntityById = async () => {
    try{
      await axios.delete(`http://127.0.0.1:8000/delete/${id}`);
      navigate('/');
    } catch (error) {
      if (error.response) {
        setError(`Error Status Code: ${error.response.status} - ${error.response.data}`);
      } else {
        setError(`There was a problem with the axios request: ${error.message}`);
      }
    }
  };

  const deleteBook = async () => {
    if (window.confirm('Are you sure you want to delete this book ?')) {
      await deleteEntityById();
    }
  };


  useEffect(() => {
    getEntityById();
  },[]);

  if (loading) {
    return <div>Loading......</div>;
  }

  if (error) {
    return <div>Error:</div>;
  }

  if (!book) {
    return <div>Book Not Found</div>
  }

  return (
    <div>
      <Card className='col-2 m-2' key={book.book_id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`http://127.0.0.1:8000/${book.image}`} />
            <Card.Body>
                <b><Card.Title>{book.name}</Card.Title></b>
                <Card.Subtitle className="mb-2 text-muted">${book.price}</Card.Subtitle>
                <Card.Text>{book.description}</Card.Text>
                <Card.Text>{book.author}</Card.Text>
                <Card.Text>{book.category}</Card.Text><br/>
                <Link className="btn btn-primary" to={`/book/${book.book_id}`}>Buy</Link><br/><br />
                <Link className="btn btn-info" to={`/book/${book.book_id}`}>Add To Cart</Link>


            </Card.Body>
        </Card>
    <Link className='btn btn-success m-2' to={`/update/${book.book_id}`}>Update Book</Link>
    <button onClick={deleteBook} className='btn btn-danger m-2'>
        Delete book
    </button>
    </div>
  )
}

export default BookDetails