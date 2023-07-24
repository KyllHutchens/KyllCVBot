import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ChatBox = () => {
  const [pageId, setPageId] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [promptCount, setPromptCount] = useState(0);

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
            setPromptCount(prevCount => prevCount + 1);

      // Check if the user has submitted 4 prompts
      if (promptCount + 1 === 4) {
        // Add the system message after 3 prompts
        const systemMessage = "System: I appreciate you utilizing my chatbot and learning more about me! I would love to meet with you further! You can email me at kyll.hutchens@gmail.com if you would like to discuss anything you've read today and more! Otherwise, please feel free to continue asking questions of my CV.";

        const newChatEntry = { user: "", ai: systemMessage };
        const updatedChatHistory = [...chatHistory, newChatEntry];
        const trimmedChatHistory = updatedChatHistory.slice(-5);

        setChatHistory(trimmedChatHistory);
      }

      setPageId('');
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
          placeholder="What would you like to ask? Consider asking about projects I've worked on or why I am looking to change jobs"
          value={pageId}
          onChange={e => setPageId(e.target.value)}
          onKeyDown={handleKeyPress} // Handle Enter key press
        />
        {promptCount >= 3 && <div className="system-message"></div>}
        <Button onClick={sendPageInfo}>Ask Question</Button>
        <Button onClick={fetchFunFact} variant="secondary">Fun Fact!</Button>
      </div>
    </div>
  );
};

export default ChatBox;