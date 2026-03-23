import React from 'react';

function Button({ children, type = 'button', disabled = false, loading = false, onClick, className = '' }) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`relative w-full py-2.5 flex justify-center items-center rounded-lg text-white font-semibold transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-700 ${className}`}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white absolute left-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            <span>{children}</span>
        </button>
    );
}

export default Button;
