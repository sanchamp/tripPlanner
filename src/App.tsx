import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import TripPlanner from './components/TripPlanner';
import Destinations from './components/Destinations';
import MyTrips from './components/MyTrips';
import About from './components/About';
import SignIn from './components/SignIn';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'planner' | 'destinations' | 'mytrips' | 'about' | 'signin'>('home');
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

  const handleNavigation = (view: 'home' | 'destinations' | 'mytrips' | 'about' | 'signin') => {
    setCurrentView(view);
    setIsMenuOpen(false); // Close mobile menu when navigating
  };
  return (
    <div className="min-h-screen bg-white">
      <Header 
        onMenuToggle={handleMenuToggle} 
        isMenuOpen={isMenuOpen} 
        onNavigation={handleNavigation}
        currentView={currentView}
      />
      
      {currentView === 'home' ? (
        <>
          <Hero onStartPlanning={handleStartPlanning} />
          <Features />
        </>
      ) : currentView === 'destinations' ? (
        <Destinations />
      ) : currentView === 'mytrips' ? (
        <MyTrips />
      ) : currentView === 'about' ? (
        <About />
      ) : currentView === 'signin' ? (
        <SignIn onBack={() => handleNavigation('home')} />
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