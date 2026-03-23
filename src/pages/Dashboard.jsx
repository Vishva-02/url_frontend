import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const [urls, setUrls] = useState([]);
    const [longUrl, setLongUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [error, setError] = useState('');
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const fetchUrls = async () => {
        try {
            const res = await api.get('/api/url');
            setUrls(res.data.data);
        } catch (err) {
            setError('Could not load URLs. It might be a network error.');
        }
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    const handleShorten = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/api/url/shorten', { originalUrl: longUrl });
            setLongUrl('');
            showToast('URL successfully generated!');
            await fetchUrls();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to shorten URL');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to permanently delete this URL?')) {
            setDeleteLoading(id);
            try {
                await api.delete(`/api/url/${id}`);
                showToast('URL deleted successfully!');
                await fetchUrls();
            } catch (err) {
                setError('Failed to delete URL');
            } finally {
                setDeleteLoading(null);
            }
        }
    };

    const copyToClipboard = (shortCode) => {
        const baseUrl = import.meta.env.VITE_API_URL || 'https://url-0bp8.onrender.com';
        const shortUrl = `${baseUrl}/${shortCode}`;
        navigator.clipboard.writeText(shortUrl);
        showToast('Copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950 font-sans relative text-gray-100 overflow-x-hidden">

            {/* Custom Animated Premium Toast Notification */}
            {toast.show && (
                <div className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3.5 rounded-2xl shadow-2xl z-50 transform transition-all duration-300 ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'} text-white font-bold flex items-center space-x-3 border border-white/20 backdrop-blur-md`}>
                    <span className="text-xl">{toast.type === 'success' ? '✨' : '⚠️'}</span>
                    <span>{toast.message}</span>
                </div>
            )}

            {/* Premium Glassmorphism Navbar */}
            <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">

                        {/* Left side: Brand Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] transform -rotate-6">
                                <span className="text-xl">🚀</span>
                            </div>
                            <span className="text-2xl font-black tracking-tight text-white hidden sm:block drop-shadow-md">ShortifyPro</span>
                        </div>

                        {/* Right side: SaaS Profile Section */}
                        <div className="flex items-center space-x-4 sm:space-x-6">

                            <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-full pr-4 pl-1 py-1 shadow-inner hover:bg-white/10 transition-colors cursor-default">
                                {/* Dynamic Initial Avatar */}
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg border-2 border-slate-900 uppercase sm:text-lg">
                                    {user?.name ? user.name.charAt(0) : (user?.email ? user.email.charAt(0) : 'U')}
                                </div>
                                {/* Core User Identity block */}
                                <div className="hidden md:flex flex-col justify-center">
                                    <span className="text-sm font-bold text-white leading-tight capitalize">{user?.name || 'Pro User'}</span>
                                    <span className="text-[11px] font-medium text-indigo-300 truncate max-w-[140px] leading-tight mt-0.5">{user?.email || 'user@workspace.com'}</span>
                                </div>
                            </div>

                            {/* Elevated UX Logout */}
                            <button
                                onClick={logout}
                                className="p-2.5 sm:px-4 sm:py-2.5 bg-white/5 text-gray-300 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-300 shadow hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] group flex items-center gap-2"
                                title="Logout Securely"
                            >
                                <span className="hidden sm:block text-sm font-bold">Sign Out</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>

                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

                {/* Deep Glass URL Input Section */}
                <div className="bg-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/10 mb-12 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    <h2 className="text-3xl font-extrabold text-white mb-3 relative z-10">Create New Short Link</h2>
                    <p className="text-gray-400 mb-8 font-medium relative z-10">Paste your long unwieldy URL below to instantly generate a branded, trackable short link.</p>

                    {error && (
                        <div className="text-sm text-red-200 mb-6 bg-red-900/50 border border-red-500/30 p-4 rounded-xl font-medium flex items-center shadow-lg relative z-10">
                            <span className="mr-3 text-xl">⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleShorten} className="flex flex-col sm:flex-row gap-4 relative z-10">
                        <div className="flex-1 relative group/input">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within/input:text-indigo-400 transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <input
                                type="url"
                                required
                                value={longUrl}
                                onChange={(e) => setLongUrl(e.target.value)}
                                placeholder="https://your-extremely-long-url-goes-here.com/directory/path"
                                className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-500 focus:bg-white/10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-inner text-lg"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`sm:w-auto w-full px-8 py-5 text-lg font-bold rounded-2xl text-white transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center justify-center ${loading ? 'bg-indigo-500/50 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-1'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center space-x-2">
                                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    <span>Shortening...</span>
                                </span>
                            ) : 'Shorten URL'}
                        </button>
                    </form>
                </div>

                {/* Dynamic SaaS Link Database Component */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                            <span className="mr-3">🚀</span> Your Active Links
                        </h2>
                        <div className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-bold px-4 py-1.5 rounded-full shadow-inner">
                            {urls.length} Total
                        </div>
                    </div>

                    {urls.length === 0 ? (
                        /* Premium Empty State */
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-16 flex flex-col items-center justify-center text-center shadow-xl">
                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                                <span className="text-5xl text-gray-400 opacity-50">🔗</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">No links yet</h3>
                            <p className="text-gray-400 text-lg">Create your first short link above to start tracking clicks.</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {urls.map((url) => {
                                const baseUrl = import.meta.env.VITE_API_URL || 'https://url-0bp8.onrender.com';
                                const shortUrl = `${baseUrl}/${url.shortCode}`;
                                const isDeleting = deleteLoading === url._id;

                                return (
                                    /* SaaS Link Card Overlay */
                                    <div key={url._id} className={`bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-lg border border-white/10 hover:border-indigo-500/40 hover:bg-white/15 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(79,70,229,0.15)] transition-all duration-300 relative group overflow-hidden ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>

                                        {/* Background Ambient Glow */}
                                        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent group-hover:inset-0 transition-all duration-1000 -skew-x-12 opacity-0 group-hover:opacity-100 pointer-events-none"></div>

                                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 w-full">

                                            {/* Left: Strict Data Hierarchy */}
                                            <div className="flex-1 min-w-0 w-full lg:w-3/4 pr-0 lg:pr-6 space-y-4">

                                                {/* 1. SHORT LINK (MASSIVE FOCUS) */}
                                                <div>
                                                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1.5 flex items-center">
                                                        <span className="mr-2">🔗</span> Short Link
                                                    </p>
                                                    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-2xl font-black text-white hover:text-indigo-300 truncate block transition-colors w-full">
                                                        {shortUrl}
                                                    </a>
                                                </div>

                                                {/* 2. ORIGINAL URL (MUTED FOCUS) */}
                                                <div className="bg-white/5 rounded-xl p-3.5 border border-white/5 shadow-inner">
                                                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center">
                                                        <span className="mr-2">🌍</span> Original URL
                                                    </p>
                                                    <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-400 truncate block hover:text-white transition-colors w-full" title={url.originalUrl}>
                                                        {url.originalUrl}
                                                    </a>
                                                </div>

                                                {/* Metdata */}
                                                <div className="flex items-center text-xs font-medium text-gray-500">
                                                    <span className="px-2.5 py-1 bg-white/5 rounded-md border border-white/5">
                                                        Created {new Date(url.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Right: SaaS Actions Matrix */}
                                            <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 w-full lg:w-1/4 justify-between lg:justify-center border-t border-white/10 lg:border-t-0 pt-5 lg:pt-0">
                                                {/* Clicks Global Metric */}
                                                <div className="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-sm font-bold text-white shadow-inner flex items-center gap-2 border border-white/10 lg:mb-3">
                                                    <span className="text-base">👁️</span> {url.clicks} Clicks
                                                </div>

                                                <div className="flex items-center gap-2 w-full sm:w-auto lg:w-full lg:justify-end">
                                                    <button
                                                        onClick={() => copyToClipboard(url.shortCode)}
                                                        className="flex-1 sm:flex-none justify-center bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-all hover:scale-105"
                                                        title="Copy short link"
                                                    >
                                                        <span className="text-base">📋</span> Copy
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(url._id)}
                                                        disabled={isDeleting}
                                                        className="flex-1 sm:flex-none justify-center bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-all hover:scale-105"
                                                        title="Delete link"
                                                    >
                                                        <span className="text-base">🗑️</span> {isDeleting ? '...' : 'Delete'}
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}

export default Dashboard;
