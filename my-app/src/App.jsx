import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import BookDetails from './components/BookDetails';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';



function App() {
  return (
    <>
    <NavBar/>

    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/book/:id" element={<BookDetails/>}></Route>
      <Route path="/add" element={<AddBook />} />
      <Route path="/update/:id" element={<UpdateBook />} />



    </Routes>
    <Footer/>

    </>
  )
}

export default App
