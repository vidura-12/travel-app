import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const FAQ = () => {
    const [isHovered, setIsHovered] = useState(false); // State to track hover

    const faqs = [
        {
            question: "1. How do I manage my bookings through the travel management system?",
            answer: "Managing your bookings is simple. Log in to your account, navigate to the \"My Bookings\" section, and you’ll see a list of all your upcoming and past trips. From here, you can view details, make changes, or cancel bookings as needed. You can also download itineraries and invoices directly from this section."
        },
        {
            question: "2. Can I integrate my company’s travel policy into the system?",
            answer: "Yes, our travel management system allows you to integrate your company’s travel policy seamlessly. During the setup process, you can define travel rules, preferred vendors, budget limits, and approval workflows to ensure all bookings comply with your company's guidelines."
        },
        {
            question: "3. Is there a mobile app available for on-the-go access?",
            answer: "Absolutely! Our travel management system is available on both iOS and Android devices. The mobile app allows you to manage your bookings, receive real-time travel updates, and contact support from anywhere in the world, making travel management convenient and accessible."
        },
        {
            question: "4. What kind of support is available if I encounter issues?",
            answer: "We offer 24/7 customer support to assist you with any issues or questions you may have. You can reach out via our live chat, email, or phone support, and our dedicated team will ensure your concerns are addressed promptly and effectively."
        },
        {
            question: "5. How can I book a trip through the travel management system?",
            answer: "Booking a trip is straightforward. Simply log in to your account and go to the \"Book a Trip\" section. From there, you can enter your travel details such as destination, travel dates, and preferences. The system will provide you with a list of available options, allowing you to select flights, accommodations, and other services that suit your needs. Once you've made your selections, proceed to checkout to finalize your booking."
        },
        {
            question: "6. Can I customize my travel itinerary?",
            answer: "Yes, our system allows you to customize your travel itinerary to fit your specific needs. You can add or remove activities, choose different accommodations, and modify transportation options. Once your itinerary is set, you can save and download it or share it with others directly from the platform."
        },
        {
            question: "7. What payment options are available for booking?",
            answer: "We offer multiple payment options for your convenience. You can choose to pay via credit/debit card, PayPal, or direct bank transfer. Additionally, if your company has a corporate account with us, you may also have the option to bill your bookings directly to your company's account."
        },
    ];

    return (
        <div
            style={{
                backgroundImage: 'url(/img/sl28.jpg)', // Replace with your image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div className="container">
                <h2 className="text-center mb-4" style={{ color: 'black', marginTop: '80px' }}> Frequently Asked Questions</h2>
                <div
                    className="bg-white rounded shadow p-4"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        opacity: 0.8,
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)', // Enlarge on hover
                        transition: 'transform 0.3s ease-in-out', // Smooth transition
                    }}
                    onMouseEnter={() => setIsHovered(true)} // Set hover state to true
                    onMouseLeave={() => setIsHovered(false)} // Reset hover state
                >
                    {faqs.map((item, index) => (
                        <div key={index} className="mb-4">
                            <h5 className="font-weight-bold">{item.question}</h5>
                            <p>{item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
