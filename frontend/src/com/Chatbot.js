import React, { useState, useEffect } from 'react';
import './chatbot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes } from '@fortawesome/free-solid-svg-icons';

const TravelChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [pendingCity, setPendingCity] = useState(null);

  useEffect(() => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: 'Hello! How can I assist you today?', sender: 'bot' },
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

    // Check if input contains a request for weather and possibly a city
    const weatherRegex = /(weather|forecast)\s*(in|at|for)?\s*(\w+)?/i;
    const match = lowerInput.match(weatherRegex);

    if (match) {
      const city = match[3];
      if (city) {
        // Fetch weather directly if the city is mentioned
        return await fetchWeather(city);
      } else {
        setPendingCity(true); // Ask user for city
        return "Please specify the city you'd like to know the weather for.";
      }
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
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: 'user' },
      ]);

      const userMessage = input;
      setInput('');

      let botResponse;
      if (pendingCity) {
        // Handle city response for weather
        botResponse = await fetchWeather(userMessage);
        setPendingCity(false);
      } else {
        botResponse = await handleResponse(userMessage);
      }

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  const toggleChatbot = () => {
    setIsOpen((prev) => !prev);
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
        <button className="unique-chatbot-toggle" onClick={toggleChatbot}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faComments} />
        </button>
      </div>
    </div>
  );
};

export default TravelChatbot;
