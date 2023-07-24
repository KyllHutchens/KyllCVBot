import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';

const ChatBox = () => {
  const [pageId, setPageId] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [promptCount, setPromptCount] = useState(0);
  const [systemMessageShown, setSystemMessageShown] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading status

  useEffect(() => {
    // Check if the system message flag is present in sessionStorage
    const systemMessageFlag = sessionStorage.getItem('systemMessageShown');

    if (systemMessageFlag) {
      // If the flag is present, set the state to prevent the system message from showing again
      setSystemMessageShown(true);
    }
  }, []);

  const sendPageInfo = () => {
    setLoading(true); // Set loading to true when a chatbox message is being fetched

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

        // Increment the prompt count
        setPromptCount(prevCount => prevCount + 1);

        // Check if the user has submitted 3 prompts and the system message hasn't been shown yet
        if (promptCount + 1 === 3 && !systemMessageShown) {
          // Add the system message after 3 prompts
          const systemMessage =
            "System: I appreciate you utilising my chatbot and learning more about me! I would love to meet with you further! You can email me at kyll.hutchens@gmail.com if you would like to discuss anything you've read today and more! Otherwise, please feel free to continue asking my resume questions.";

          const newSystemMessage = { user: "", ai: systemMessage };
          const updatedChatWithSystemMessage = [...trimmedChatHistory, newSystemMessage];
          setChatHistory(updatedChatWithSystemMessage);

          // Set the flag in sessionStorage to indicate that the system message has been shown
          sessionStorage.setItem('systemMessageShown', 'true');
          setSystemMessageShown(true);
        }

        setPageId('');
        setLoading(false); // Set loading to false after the chatbox message is fetched
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  };

  const handleKeyPress = event => {
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
          placeholder="What would you like to ask? Consider asking about projects I've worked on or why I am looking to change jobs"
          value={pageId}
          onChange={e => setPageId(e.target.value)}
          onKeyDown={handleKeyPress} // Handle Enter key press
        />
        <Button onClick={sendPageInfo}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Fetching...
            </>
          ) : (
            "Ask Question"
          )}
        </Button>
        <Button onClick={fetchFunFact} variant="secondary">Fun Fact!</Button>
      </div>
      {promptCount >= 3 && !systemMessageShown && (
        <div className="system-message">
        </div>
      )}
    </div>
  );
};

export default ChatBox;