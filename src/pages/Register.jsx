import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import InputField from '../components/InputField';
import Button from '../components/Button';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/api/auth/signup', { name, email, password });
            if (response.data.token) {
                login(response.data.token);
                navigate('/dashboard');
            } else {
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-50/50">
                <div className="p-8 sm:p-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Create Account</h2>
                        <p className="text-gray-500 font-medium">Join us and start shortening URLs</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 animate-[pulse_1s_ease-in-out_1]" role="alert">
                            <p className="font-medium text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-5">
                        <InputField
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="off"
                        />

                        <InputField
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="off"
                        />

                        <InputField
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />

                        <div className="pt-3">
                            <Button type="submit" loading={loading}>
                                Create Account
                            </Button>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-sm">
                        <span className="text-gray-500">Already have an account? </span>
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition">
                            Sign in instead
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
