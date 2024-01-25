import Hero from "../Hero/Hero";
import { MassageSelector } from "../MassageSelector/massageSelector";
import Booking from "../Booking";
import { Footer } from "../footer/footer";
import Nav from "../Nav/Nav";
import { useState, useRef, useEffect } from 'react'
import { useLocation, Outlet} from 'react-router-dom';

const Home = () =>{
    const massageSelectorRef = useRef(null);
    const contactRef = useRef(null);
    const [title, setTitle] = useState('');

    const [authStatus, setAuthStatus] = useState('checking');
  
  
    useEffect(() => {
      
      const token = localStorage.getItem('id_token');
      if (token) {
        // Check if the token is valid, etc.
        setAuthStatus('authenticated');
      } else {
        setAuthStatus('unauthenticated');
      }
    }, []);

    const scrollTo = (e) => {
        e.preventDefault();
        const clickedItem = e.target.innerHTML;
        if (massageSelectorRef.current) {
          massageSelectorRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        if (contactRef.current && clickedItem === 'Contact') {
          console.log(clickedItem)
            contactRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };

    return (
        <>
            <Nav onBookNowClick={scrollTo} />
            <Hero onBookNowClick={scrollTo} />
            <MassageSelector ref={massageSelectorRef} setTitle={setTitle} />
            <Booking title={title} />
            <Footer ref={contactRef}/>
            {/* <Outlet /> */}
        </>
    );

}

export default Home;