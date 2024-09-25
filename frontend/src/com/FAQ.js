import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const FAQ = () => {
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
                <h2 className="text-center mb-4" style={{ color: 'black' }}>Frequently Asked Questions</h2>
                <div className="bg-white rounded shadow p-4" style={{ opacity: 0.9 }}>
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
