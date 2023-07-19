import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ChatBox = () => {
  const [pageId, setPageId] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendPageInfo = () => {
    axios
      .post('/api/aichat', {
        userInput: pageId,
      })
      .then(response => {
        console.log('Success:', response.data);
        const userQuestion = `Q: ${pageId}`;
        const aiResponse = `A: ${response.data.message}`;

        const newChatEntry = { user: userQuestion, ai: aiResponse };
        const updatedChatHistory = [...chatHistory, newChatEntry];
        const trimmedChatHistory = updatedChatHistory.slice(-5);

        setChatHistory(trimmedChatHistory);
        setPageId('');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
    const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendPageInfo(); // Trigger the "Send Message" button click
    }
  };
  const fetchFunFact = () => {
    axios
      .post('/api/funfact') // Make a POST request to the Flask endpoint
      .then(response => {
        console.log('Fun Fact:', response.data);

        const funFactResponse = `${response.data.message}`;

        const newChatEntry = { user: 'Here is a fun fact about Kyll: ', ai: funFactResponse };
        const updatedChatHistory = [...chatHistory, newChatEntry];
        const trimmedChatHistory = updatedChatHistory.slice(-5);

        setChatHistory(trimmedChatHistory);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="main-content">
      <h2 className="text-center">Chat with Kyll's Resume</h2>
      <div className="chatbox-div">
        <textarea
          className="textarea"
          readOnly
          value={chatHistory.map(entry => entry.user + '\n' + entry.ai).join('\n\n')}
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="What would you like to ask?"
          value={pageId}
          onChange={e => setPageId(e.target.value)}
          onKeyDown={handleKeyPress} // Handle Enter key press
        />
        <Button onClick={sendPageInfo}>Ask Question</Button>
        <Button onClick={fetchFunFact} variant="secondary">Fun Fact!</Button>
      </div>
    </div>
  );
};

export default ChatBox;