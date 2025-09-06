import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import TripPlanner from './components/TripPlanner';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'planner'>('home');
  const [selectedDestination, setSelectedDestination] = useState('');

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleStartPlanning = (destination: string) => {
    setSelectedDestination(destination);
    setCurrentView('planner');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedDestination('');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
      
      {currentView === 'home' ? (
        <>
          <Hero onStartPlanning={handleStartPlanning} />
          <Features />
        </>
      ) : (
        <TripPlanner 
          destination={selectedDestination} 
          onBack={handleBackToHome}
        />
      )}
    </div>
  );
}

export default App;