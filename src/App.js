import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import About from './components/About';
import Contact from './components/Contact';
import Meditateathome from './components/Meditateathome';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
        <Route path="/" element={<MainContent              
              videos={[
                {
                  id: 'YdEubbf2SO8',
                  title: 'Quick and Easy Meditations',
                  thumbnail: 'far_left.jpg',
                  isHiddenInMobile: false,
                },
                {
                  id: 'Rrshyqs1czU',
                  title: 'Meditation for Stress Free Career',
                  thumbnail: 'hqdefault_new.jpg',
                  isHiddenInMobile: true,
                },
                {
                  id: 'RRO_0Aptwts',
                  title: 'How to Meditate for Beginners',
                  thumbnail: 'slight_left.jpg',
                  isHiddenInMobile: false,
                },
                {
                  id: 'UvjwfMsTDIc',
                  title: 'Life of founder: H.H. Shri Mataji Nirmala Devi',
                  thumbnail: 'image.png',
                  isHiddenInMobile: false,
                },
              ]}/>} />
        <Route path="/home" element={<MainContent 
              featuredVideo={{
                id: 'YdEubbf2SO8',
                title: 'How to Meditate - A Beginner\'s Guide',
                thumbnail: 'https://i.ytimg.com/vi/YdEubbf2SO8/mqdefault.jpg',
              }}
              videos={[
                {
                  id: 'YdEubbf2SO8',
                  title: 'Quick and Easy Meditations',
                  thumbnail: 'far_left.jpg',
                },
                {
                  id: 'Rrshyqs1czU',
                  title: 'Meditation for Stress Free Career',
                  thumbnail: 'hqdefault_new.jpg',
                },
                {
                  id: 'RRO_0Aptwts',
                  title: 'How to Meditate for Beginners',
                  thumbnail: 'slight_left.jpg',
                },
                {
                  id: 'UvjwfMsTDIc',
                  title: 'Life of founder: H.H. Shri Mataji Nirmala Devi',
                  thumbnail: 'image.png',
                },
              ]}/>} />
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
