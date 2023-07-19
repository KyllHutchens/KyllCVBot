import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function Contact() {
  const navigate = useNavigate(); // Initialize useNavigate

  // State to control the visibility of the contact details popup
  const [showContactPopup, setShowContactPopup] = useState(true);

  // Function to handle closing the contact details popup and navigate back to "/"
  const handleCloseContactPopup = () => {
    setShowContactPopup(false);
    navigate('/'); // Navigate back to the homepage
  };

  return (
    <Modal
      show={showContactPopup}
      onHide={handleCloseContactPopup}
      style={{ maxWidth: '180%' }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Name: Kyll Hutchens <br />
          Email: kyll.hutchens@gmail.com <br />
          Phone: 0408 992 374 <br />
          LinkedIn: <a href="https://www.linkedin.com/in/kyll-hutchens-39323a106/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/kyll-hutchens</a> <br />
          Address: Croydon, Melbourne ... Moving to Adelaide in a few months
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseContactPopup}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Contact;