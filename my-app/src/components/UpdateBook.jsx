import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UpdateBook = () => {
    const {id} = useParams()
    const [book,setBook]= useState({})
    const navigate = useNavigate()

const getEntityById = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/book/${id}`);
        console.log(response.data);


        let result = response.data;
        delete result.image;
        console.log(result);

        setBook(result)
    } catch (error) {
        if (error.response) {
            console.error(`Error status Code: ${error.response.status}`);
            console.error(error.response.data);
        } else {
            console.error('There was a problem with the axios request:', error.message);
        }
    }
};
const InputData = (e)=>{

    console.log(e.target);
    let name = e.target.name;
    let value = e.target.value;
    let files = e.target.files;
    console.log(name);
    console.log(files);
    console.log(value);


    let newData = {...book,[name]:files ? files[0]:value}
    setBook(newData)


}

const replaceEntity = async () => {
    try{
        const response = await axios.put(`http://127.0.0.1:8000/update/${id}`, book, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        navigate('/')
    } catch (error) {
        if (error.response) {
            console.error(`Error Status Code: ${error.response.status}`);
            console.error(error.response.data);
        } else {
            console.error('There was a problem with the axios request:', error.message);
        }
    }
};


useEffect(() =>{
    getEntityById();
},[]);


const bookUpdate = () => {
    replaceEntity()
};
  return (
    <div className="container mt-5">
    <h2 className="mb-4">Add a New Book</h2>
    <form  >
      <div className="form-group">
        <label htmlFor="name">Book Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={book.name}
          onChange={InputData}

          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Author:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="author"
          value={book.author}
          onChange={InputData}

          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Book Category:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="category"
          value={book.category}
          onChange={InputData}

          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Book Description:</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={book.description}
          onChange={InputData}
         
         
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="price">Book Price:</label>
        <input
          type="number"
          className="form-control"
          id="price"
          name="price"
          value={book.price}
          onChange={InputData}
        

          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Book Image:</label>
        <input
          type="file"
          className="form-control-file"
          id="image"
          name="image"
          onChange={InputData}
       
          required
        />
        <img src={`http://127.0.0.1:8000/${book.image}`} alt="" />
      </div>
      <button type="button" onClick={bookUpdate}  className="btn btn-primary">Submit</button>
    </form>
  </div>
  )
}

export default UpdateBook