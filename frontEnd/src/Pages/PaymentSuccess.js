import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';
import { Axios } from '../App';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const sessionId = queryParams.get('session_id');

        if (sessionId) {
            Axios.post('/api/users/confirm-payment', { sessionId });
        } else {
            toast.error('No session ID found.');
            navigate('/');
        }
    }, [location.search, navigate]);

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(to right, #e0f7fa, #b2ebf2)',
                padding: '3rem 1.5rem'
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '2rem',
                    maxWidth: '28rem',
                    textAlign: 'center'
                }}
            >
                <>
                    <FaCheckCircle
                        style={{
                            color: '#4caf50',
                            fontSize: '3.75rem',
                            margin: '0 auto 1rem auto'
                        }}
                    />
                    <h1
                        style={{
                            fontSize: '1.875rem',
                            fontWeight: '700',
                            color: '#4a4a4a',
                            marginBottom: '1rem'
                        }}
                    >
                        Payment Successful!
                    </h1>
                    <p
                        style={{
                            fontSize: '1.125rem',
                            color: '#757575',
                            marginBottom: '1.5rem'
                        }}
                    >
                        Thank you for your payment. Your Order is confirmed.
                    </p>
                    <button
                        onClick={handleHomeClick}
                        style={{
                            backgroundColor: '#0097a7',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            fontWeight: '600',
                            transition: 'background-color 0.3s, transform 0.3s',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#007c91';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#0097a7';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        Go to Homepage
                    </button>
                </>
            </div>
        </div>
    );
};

export default PaymentSuccess;
