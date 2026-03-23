import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/api/auth/login', { email, password });
            login(response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Decorative Animated Blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="relative max-w-md w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-white/50 p-8 sm:p-10 z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 shadow-lg text-white mb-6 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Welcome Back</h2>
                    <p className="text-gray-500 font-medium">Log in to your dashboard</p>
                </div>

                {error && (
                    <div className="bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500 text-red-700 p-4 rounded-xl mb-6 flex items-start shadow-sm" role="alert">
                        <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                        <p className="font-medium text-sm leading-tight">{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Advanced Floating Email Input */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors z-10">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="peer w-full pl-11 pr-4 py-4 bg-white/60 border border-gray-200 rounded-2xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-transparent shadow-sm"
                            placeholder="Email Address"
                            required
                            autoComplete="off"
                        />
                        <label htmlFor="email" className="absolute left-11 -top-2.5 bg-white/90 backdrop-blur-sm px-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest peer-placeholder-shown:text-base peer-placeholder-shown:lowercase peer-placeholder-shown:tracking-normal peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-indigo-600 transition-all rounded z-10 pointer-events-none">Email</label>
                    </div>

                    {/* Advanced Floating Password Input */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors z-10">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="peer w-full pl-11 pr-12 py-4 bg-white/60 border border-gray-200 rounded-2xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-transparent shadow-sm"
                            placeholder="Password"
                            required
                            autoComplete="new-password"
                        />
                        <label htmlFor="password" className="absolute left-11 -top-2.5 bg-white/90 backdrop-blur-sm px-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest peer-placeholder-shown:text-base peer-placeholder-shown:lowercase peer-placeholder-shown:tracking-normal peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-indigo-600 transition-all rounded z-10 pointer-events-none">Password</label>

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm leading-5 text-gray-400 hover:text-indigo-600 focus:outline-none transition z-10"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0a10.05 10.05 0 015.188-1.56c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0l-3.29-3.29" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            )}
                        </button>
                    </div>

                    <div className="flex justify-end pt-1">
                        <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">Forgot password?</a>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-extrabold rounded-2xl text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-[0_8px_20px_rgb(79,70,229,0.3)] hover:shadow-[0_12px_25px_rgb(79,70,229,0.4)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                        >
                            {loading ? (
                                <span className="flex items-center space-x-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    <span>Authenticating...</span>
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 tracking-wide">
                                    Sign In to Dashboard
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </span>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center border-t border-gray-100/50 pt-6">
                    <p className="text-gray-500 font-medium">
                        New to ShortifyPro?{' '}
                        <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline underline-offset-4 transition-colors relative z-20">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
