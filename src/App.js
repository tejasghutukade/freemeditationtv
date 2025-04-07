import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import About from './components/About';
import Contact from './components/Contact';
import Meditateathome from './components/Meditateathome';
import Footer from './components/Footer';

const videos = [ {
  id: 'YdEubbf2SO8',
  title: 'Quick and Easy Meditations',
  thumbnail: `${process.env.PUBLIC_URL}/far_left.jpg`,
  isHiddenInMobile: false,
},
{
  id: 'Rrshyqs1czU',
  title: 'Meditation for Stress Free Career',
  thumbnail: `${process.env.PUBLIC_URL}/hqdefault_new.jpg`,
  isHiddenInMobile: true,
},
{
  id: 'RRO_0Aptwts',
  title: 'How to Meditate for Beginners',
  thumbnail: `${process.env.PUBLIC_URL}/slight_left.jpg`,
  isHiddenInMobile: false,
},
{
  id: 'UvjwfMsTDIc',
  title: 'Life of founder: H.H. Shri Mataji Nirmala Devi',
  thumbnail: `${process.env.PUBLIC_URL}/image.png`,
  isHiddenInMobile: false,
}];

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <NavBar/>
        <Routes>
        <Route path="/" element={<MainContent              
              videos={videos}/>} />
        <Route path="/home" element={<MainContent         
              videos={videos}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/meditateathome" element={<Meditateathome />} />
        </Routes>        
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
