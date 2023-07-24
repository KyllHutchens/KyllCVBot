import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatBox from './components/ChatBox';
import Contact from './components/Contact';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal components
import './App.css';
import Cookies from 'js-cookie';


function App() {
  // State to control the visibility of the initial popup
  const [showInitialPopup, setShowInitialPopup] = useState(true);
  const [showContactPopup, setShowContactPopup] = useState(false);

  function handleOpenContactPopup() {
  setShowContactPopup(true);
}

  useEffect(() => {
    // Check if the cookie exists
    const popupShownBefore = Cookies.get('popupShownBefore');

    if (popupShownBefore) {
      // If the cookie exists, hide the initial popup
      setShowInitialPopup(false);
    } else {
      // If the cookie doesn't exist, show the initial popup and set the cookie to remember the user has seen it
      setShowInitialPopup(true);
      Cookies.set('popupShownBefore', 'true', { expires: 365 }); // Expires in 365 days
    }

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    axios
      .post('/api/set_timezone', { timezone }) // make a POST request to '/api/set_timezone' with the timezone
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Function to handle closing the initial popup
  const handleCloseInitialPopup = () => {
    setShowInitialPopup(false);
  };

  return (
    <Router>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route path="/" element={<ChatBox />} />
              <Route path="/contact-details" element={<Contact/>} />
            </Routes>
          </main>
        </div>
      </div>


            <Modal
        show={showInitialPopup}
        onHide={handleCloseInitialPopup}
        style={{ maxWidth: '180%' }} // Set the desired width using the style prop
      >
        <Modal.Header closeButton>
          <Modal.Title>Welcome Potential Future Employer!</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <p>
          My name is Kyll Hutchens <br />
          And this is a chatbot I created to tell you about me <br />
          <br />
          Ask it anything related to my personal or professional life <br />
          Not sure what to ask? Hit the Fun Fact button <br />
          <br />
          This bot is best viewed on a computer, mobile device optimisation is currently being worked on. <br />
          Lastly, the bot is not perfect and may make some strange responses. So I apologise if this happens and I would love to hear about them, so I can improve this product! <br />

          Website is created in JS React and python flask backend. Using GPT 3.5 turbo from OpenAI for responses

          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseInitialPopup}>
            Start Chatting
          </Button>
        </Modal.Footer>
      </Modal>
    </Router>
  );
}

export default App;