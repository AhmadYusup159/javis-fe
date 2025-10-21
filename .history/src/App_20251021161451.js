import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import '@/App.css';

// Configure axios defaults
axios.defaults.baseURL = ':4000';
axios.defaults.withCredentials = true;

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="App">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: isDark ? '#1e293b' : '#fff',
            color: isDark ? '#fff' : '#000',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login isDark={isDark} setIsDark={setIsDark} />} />
          <Route path="/dashboard" element={<Dashboard isDark={isDark} setIsDark={setIsDark} />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
