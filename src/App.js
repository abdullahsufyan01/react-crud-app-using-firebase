import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import About from './pages/About';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';


function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
      <ToastContainer position='top-center'/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<AddEdit />} />
          <Route path='/update/:id' element={<AddEdit />} />
          <Route path='/view/:id' element={<View/>} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
