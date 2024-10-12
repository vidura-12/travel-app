import React, { useState, useEffect } from 'react';
import './chatbot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes } from '@fortawesome/free-solid-svg-icons';

const TravelChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [isCityInputVisible, setIsCityInputVisible] = useState(false);
  const [city, setCity] = useState('');

  useEffect(() => {
    setMessages(prevMessages => [
      ...prevMessages,
      { text: 'Hello! Do You Want To Know About Weather Of the Places?', sender: 'bot' },
    ]);
  }, []);

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(`http://localhost:8081/apiwe/weather/${city}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      if (data.weather) {
        return `The weather in ${city} is currently ${data.weather[0].description} with a temperature of ${Math.round(data.main.temp)}°C.`;
      } else {
        return "I'm sorry, I couldn't find the weather for that location.";
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      return "I'm sorry, there was an error fetching the weather data.";
    }
  };

  const handleResponse = async (input) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("weather")) {
      setIsCityInputVisible(true);
      return "Please enter the city you want the weather for:";
    } else if (lowerInput.includes("book") || lowerInput.includes("reservation")) {
      return "I can help you with booking. What would you like to book: flights, hotels, or activities?";
    } else if (lowerInput.includes("destination")) {
      return "Here are some popular travel destinations: Bali, Paris, New York, Tokyo. Which one interests you?";
    } else if (lowerInput.includes("thank you")) {
      return "You're welcome! If you have any other questions, feel free to ask.";
    } else {
      return "I'm sorry, I didn't understand that. Can you please rephrase?";
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: input, sender: 'user' },
      ]);
      const userMessage = input;
      setInput('');

      const botResponse = await handleResponse(userMessage);
      
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: botResponse, sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  const handleCitySubmit = async () => {
    if (city.trim()) {
      const weatherResponse = await fetchWeather(city);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: weatherResponse, sender: 'bot' },
      ]);

      setCity('');
      setIsCityInputVisible(false);
    }
  };

  const toggleChatbot = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="unique-chatbot-container">
      <div className={`unique-chatbot ${isOpen ? 'unique-open' : 'unique-closed'}`}>
        {isOpen && (
          <div className="unique-chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`unique-chatbot-message unique-${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
        )}
        {isOpen && (
          <div className="unique-chatbot-input">
            {isCityInputVisible ? (
              <div className="unique-city-input">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name..."
                  className="unique-input"
                />
                <button onClick={handleCitySubmit} className="unique-send-button">
                  Get Weather
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="unique-input"
                />
                <button onClick={handleSend} className="unique-send-button">Send</button>
              </div>
            )}
          </div>
        )}
        <button className="unique-chatbot-toggle" onClick={toggleChatbot}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faComments} />
        </button>
      </div>
    </div>
  );
};

export default TravelChatbot;
