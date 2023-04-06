import { useState, useEffect } from 'react';
import './App.scss';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const mockIncomingMessages = [
	"Hi! Let us know how we can help and we'all get someone connected to you in right away!",
	"Let me know the topic you need more information on so ican help",
	"Great we'll get you connected with someone as soon as they are free",
	"Hi my name is Roberta, can i get yourname",
	"Let me know the topic you need more information on so ican help",
	"Great we'll get you connected with someone as soon as they are free",
	"Hi my name is Roberta, can i get yourname",
	"Hi! Let us know how we can help and we'all get someone connected to you in right away!",
	"Let me know the topic you need more information on so ican help",
	"Great we'll get you connected with someone as soon as they are free",
	"Great we'll get you connected with someone as soon as they are free",
	"Hi my name is Roberta, can i get yourname",
	"Let me know the topic you need more information on so ican help",
	"Great we'll get you connected with someone as soon as they are free",
	"Hi my name is Roberta, can i get yourname",
	"Hi! Let us know how we can help and we'all get someone connected to you in right away!",
	"Let me know the topic you need more information on so ican help",
];

  const handleTextareaChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleSendButtonClick = () => {
    if (currentMessage.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'outgoing', content: currentMessage },
      ]);
    }
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.type === 'outgoing') {
      const replyContent = mockIncomingMessages[messages.length - 1];
      const reply = { type: 'incoming', content: replyContent };
      setTimeout(() => setMessages([...messages, reply]), 1000);
	  setCurrentMessage("");
    }
  }, [messages]);

  const handleEnterPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendButtonClick();
    }
  };

  const renderMessage = (message, index) => {
    const messageType = message.type === 'incoming' ? 'incoming' : 'outgoing';
    return (
      <div key={index} className={`chat-bubble ${messageType}`}>
        <div className={`message ${messageType}`}>{message.content}</div>
      </div>
    );
  };

  return (
    <div className="chat-window">
      <div className="titlebar">
        <div className="title">Chat</div>
        <div className="actions">
          <button className="close">x</button>
        </div>
      </div>
      <div className="chat-wrapper">{messages.map(renderMessage)}</div>
      <div className="message-area">
        <textarea
          rows="1"
          className="text-field"
          value={currentMessage}
          placeholder="How can I help you"
          onKeyDown={handleEnterPress}
          onChange={handleTextareaChange}
        />
        <button type="button" onClick={handleSendButtonClick}>
          <img src="https://img.icons8.com/material/24/null/sent--v1.png"  alt="send"/>
        </button>
      </div>
    </div>
  );
}

function App() {
  const DemoWrapper = ({ children }) => (
    <div className="demo-wrapper">
      <div className="demo-wrapper-content">{children}</div>
    </div>
  );

  return (
    <DemoWrapper>
      <ChatWindow />
    </DemoWrapper>
  );
}

export default App;



