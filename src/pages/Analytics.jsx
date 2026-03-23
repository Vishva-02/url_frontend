import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowLeft, Calendar, MousePointer2, Clock, Globe, ArrowRight } from 'lucide-react';

const Analytics = () => {
    const { id } = useParams();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAnalytics();
    }, [id]);

    const fetchAnalytics = async () => {
        try {
            const res = await api.get(`/api/url/${id}/analytics`);
            setAnalytics(res.data.data);
        } catch (err) {
            console.error('Failed to fetch analytics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading analytics report...</div>;
    if (!analytics) return <div className="loading">Analytics data not found.</div>;

    // Format daily clicks for chart
    const dailyData = analytics.dailyClicks.map(item => ({
        date: new Date(item._id).toLocaleDateString([], { month: 'short', day: 'numeric' }),
        clicks: item.count
    }));

    // If no data, provide some placeholders for the last 7 days
    const chartData = dailyData.length > 0 ? dailyData : [
        { date: 'No data', clicks: 0 }
    ];

    return (
        <div className="analytics-page">
            <Link to="/dashboard" className="back-link">
                <ArrowLeft size={18} /> Back to Dashboard
            </Link>

            <header className="analytics-header">
                <h1 className="title">Link Analytics</h1>
                <p className="subtitle">Detailed performance report for your short link</p>
            </header>

            <div className="stats-overview">
                <div className="card stat-card">
                    <div className="stat-icon primary">
                        <MousePointer2 size={24} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Total Clicks</span>
                        <span className="stat-value">{analytics.totalClicks}</span>
                    </div>
                </div>
                <div className="card stat-card">
                    <div className="stat-icon secondary">
                        <Clock size={24} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Last Visited</span>
                        <span className="stat-value">
                            {analytics.lastVisited ? new Date(analytics.lastVisited).toLocaleDateString() : 'No visits yet'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="analytics-grid">
                <div className="card chart-container">
                    <div className="card-header">
                        <h3>Daily Click Activity</h3>
                    </div>
                    <div style={{ width: '100%', height: 300, marginTop: '2rem' }}>
                        <ResponsiveContainer>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="clicks"
                                    stroke="var(--primary)"
                                    fillOpacity={1}
                                    fill="url(#colorClicks)"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card history-container">
                    <div className="card-header">
                        <h3>Recent Visit Logs</h3>
                    </div>
                    <div className="history-list">
                        {analytics.recentVisits.length === 0 ? (
                            <p className="empty-history">No visit history available.</p>
                        ) : (
                            analytics.recentVisits.map((visit) => (
                                <div key={visit._id} className="history-item">
                                    <div className="visit-info">
                                        <div className="visit-main">
                                            <Globe size={16} color="var(--gray)" />
                                            <span className="visit-ip">{visit.ip || 'Unknown IP'}</span>
                                        </div>
                                        <div className="visit-time">
                                            <Calendar size={14} />
                                            {new Date(visit.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                        </div>
                                    </div>
                                    <div className="visit-device" title={visit.userAgent}>
                                        {visit.userAgent?.split(') ')[0]?.split(' (')[1]?.substring(0, 30) || 'Device data unavailable'}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
