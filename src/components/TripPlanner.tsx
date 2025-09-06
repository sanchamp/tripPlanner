import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, DollarSign, ArrowLeft, Clock, Star, Bed, Camera, Utensils, Car } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface TripPlannerProps {
  destination: string;
  onBack: () => void;
}

interface Activity {
  id: string;
  name: string;
  type: 'attraction' | 'restaurant' | 'activity' | 'transport';
  time: string;
  duration: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  tips?: string;
}

interface Accommodation {
  id: string;
  name: string;
  type: string;
  rating: number;
  price: string;
  description: string;
  image: string;
  amenities: string[];
}

interface DayItinerary {
  day: number;
  date: string;
  activities: Activity[];
  accommodation?: Accommodation;
  totalCost: string;
}

const TripPlanner: React.FC<TripPlannerProps> = ({ destination, onBack }) => {
  const { formatPrice } = useCurrency();
  const [tripDetails, setTripDetails] = useState({
    startDate: '',
    endDate: '',
    travelers: 2,
    budget: 'medium',
    interests: [] as string[]
  });
  
  const [itinerary, setItinerary] = useState<DayItinerary[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'details' | 'preferences' | 'itinerary'>('details');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const interestOptions = [
    'Culture & History', 'Food & Dining', 'Nature & Outdoors', 'Shopping', 
    'Nightlife', 'Museums', 'Architecture', 'Adventure Sports', 'Photography', 'Local Experiences'
  ];

  const toggleInterest = (interest: string) => {
    setTripDetails(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = () => {
    setLoading(true);
    setStep('itinerary');
    
    setTimeout(() => {
      const startDate = new Date(tripDetails.startDate);
      const endDate = new Date(tripDetails.endDate);
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      const mockItinerary: DayItinerary[] = [];
      
      for (let i = 0; i < days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        const dayActivities: Activity[] = [
          {
            id: `${i}-1`,
            name: i === 0 ? 'Airport Transfer & Hotel Check-in' : 'Morning Exploration',
            type: i === 0 ? 'transport' : 'activity',
            time: i === 0 ? '10:00 AM' : '9:00 AM',
            duration: i === 0 ? '2 hours' : '3 hours',
            description: i === 0 ? 'Private transfer from airport to hotel' : 'Start your day exploring the local neighborhood',
            price: formatPrice(i === 0 ? 3750 : 2080), // Converted to INR equivalent
            rating: 4.5,
            image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400',
            tips: i === 0 ? 'Keep your passport and documents handy' : 'Wear comfortable walking shoes'
          },
          {
            id: `${i}-2`,
            name: `${destination} Famous Landmark`,
            type: 'attraction',
            time: '1:00 PM',
            duration: '2.5 hours',
            description: 'Visit the most iconic landmark with guided tour',
            price: formatPrice(2900), // Converted to INR equivalent
            rating: 4.7,
            image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=400',
            tips: 'Book tickets in advance to skip the line'
          },
          {
            id: `${i}-3`,
            name: 'Local Cuisine Experience',
            type: 'restaurant',
            time: '7:00 PM',
            duration: '2 hours',
            description: 'Authentic local dining experience at a highly-rated restaurant',
            price: formatPrice(5400), // Converted to INR equivalent
            rating: 4.8,
            image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400',
            tips: 'Try the chef\'s special menu for the best experience'
          }
        ];

        const accommodation: Accommodation = {
          id: `hotel-${i}`,
          name: `${destination} Grand Hotel`,
          type: 'Luxury Hotel',
          rating: 4.6,
          price: `${formatPrice(14950)}/night`, // Converted to INR equivalent
          description: 'Centrally located luxury hotel with modern amenities',
          image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=400',
          amenities: ['Free WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Room Service']
        };

        mockItinerary.push({
          day: i + 1,
          date: currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          activities: dayActivities,
          accommodation: accommodation,
          totalCost: formatPrice(20330) // Converted to INR equivalent
        });
      }
      
      setItinerary(mockItinerary);
      setLoading(false);
    }, 3000);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'attraction': return Camera;
      case 'restaurant': return Utensils;
      case 'transport': return Car;
      default: return MapPin;
    }
  };

  const downloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;
      
      // Add title
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${destination} Travel Itinerary`, margin, yPosition);
      yPosition += 15;
      
      // Add trip details
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Dates: ${tripDetails.startDate} - ${tripDetails.endDate}`, margin, yPosition);
      yPosition += 8;
      pdf.text(`Travelers: ${tripDetails.travelers}`, margin, yPosition);
      yPosition += 8;
      pdf.text(`Budget: ${tripDetails.budget}`, margin, yPosition);
      yPosition += 15;
      
      // Add interests
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Selected Interests:', margin, yPosition);
      yPosition += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const interestsText = tripDetails.interests.join(', ');
      const splitInterests = pdf.splitTextToSize(interestsText, pageWidth - 2 * margin);
      pdf.text(splitInterests, margin, yPosition);
      yPosition += splitInterests.length * 5 + 10;
      
      // Add itinerary days
      itinerary.forEach((day, dayIndex) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 60) {
          pdf.addPage();
          yPosition = margin;
        }
        
        // Day header
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Day ${day.day} - ${day.date}`, margin, yPosition);
        yPosition += 10;
        
        pdf.setFontSize(12);
        pdf.text(`Daily Budget: ${day.totalCost}`, margin, yPosition);
        yPosition += 15;
        
        // Activities
        day.activities.forEach((activity, actIndex) => {
          // Check if we need a new page
          if (yPosition > pageHeight - 40) {
            pdf.addPage();
            yPosition = margin;
          }
          
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${activity.time} - ${activity.name}`, margin + 5, yPosition);
          yPosition += 8;
          
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.text(`Duration: ${activity.duration} | Price: ${activity.price} | Rating: ${activity.rating}★`, margin + 5, yPosition);
          yPosition += 6;
          
          const descriptionLines = pdf.splitTextToSize(activity.description, pageWidth - 2 * margin - 10);
          pdf.text(descriptionLines, margin + 5, yPosition);
          yPosition += descriptionLines.length * 4;
          
          if (activity.tips) {
            pdf.setFont('helvetica', 'italic');
            pdf.text(`Tip: ${activity.tips}`, margin + 5, yPosition);
            yPosition += 6;
          }
          
          yPosition += 5;
        });
        
        // Accommodation
        if (day.accommodation) {
          if (yPosition > pageHeight - 30) {
            pdf.addPage();
            yPosition = margin;
          }
          
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`Accommodation: ${day.accommodation.name}`, margin + 5, yPosition);
          yPosition += 8;
          
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.text(`${day.accommodation.type} | ${day.accommodation.price} | ${day.accommodation.rating}★`, margin + 5, yPosition);
          yPosition += 6;
          
          const accommodationDesc = pdf.splitTextToSize(day.accommodation.description, pageWidth - 2 * margin - 10);
          pdf.text(accommodationDesc, margin + 5, yPosition);
          yPosition += accommodationDesc.length * 4;
          
          pdf.text(`Amenities: ${day.accommodation.amenities.join(', ')}`, margin + 5, yPosition);
          yPosition += 10;
        }
        
        yPosition += 10;
      });
      
      // Add footer
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Generated by TRIPPING - Page ${i} of ${totalPages}`, margin, pageHeight - 10);
      }
      
      // Save the PDF
      pdf.save(`${destination.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_itinerary.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (step === 'details') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Search
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900">
              Plan Your Trip to {destination}
            </h1>
            <p className="text-gray-600 mt-2">Let's start with some basic details about your trip</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={tripDetails.startDate}
                    onChange={(e) => setTripDetails({...tripDetails, startDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={tripDetails.endDate}
                    onChange={(e) => setTripDetails({...tripDetails, endDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline h-4 w-4 mr-1" />
                    Number of Travelers
                  </label>
                  <select
                    value={tripDetails.travelers}
                    onChange={(e) => setTripDetails({...tripDetails, travelers: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={1}>1 Traveler</option>
                    <option value={2}>2 Travelers</option>
                    <option value={3}>3-4 Travelers</option>
                    <option value={5}>5+ Travelers</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="inline h-4 w-4 mr-1" />
                    Budget Range
                  </label>
                  <select
                    value={tripDetails.budget}
                    onChange={(e) => setTripDetails({...tripDetails, budget: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="budget">Budget ($50-100/day)</option>
                    <option value="medium">Medium ($100-300/day)</option>
                    <option value="luxury">Luxury ($300+/day)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setStep('preferences')}
                disabled={!tripDetails.startDate || !tripDetails.endDate}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                Continue to Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'preferences') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setStep('details')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Details
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900">
              What interests you?
            </h1>
            <p className="text-gray-600 mt-2">Select your interests to get personalized recommendations</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`p-4 rounded-lg border-2 transition-all text-sm font-medium ${
                    tripDetails.interests.includes(interest)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>

            <button
              onClick={generateItinerary}
              disabled={tripDetails.interests.length === 0}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
            >
              Generate My Itinerary
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => setStep('preferences')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Preferences
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Your {destination} Itinerary
              </h1>
              <p className="text-gray-600 mt-1">
                {tripDetails.startDate} - {tripDetails.endDate} • {tripDetails.travelers} travelers
              </p>
            </div>
            
            {!loading && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Estimated Total Cost</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatPrice(itinerary.length * 20330)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Perfect Itinerary</h3>
            <p className="text-gray-600 text-center max-w-md">
              Our AI is analyzing your preferences and creating a personalized day-by-day plan with the best recommendations for {destination}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {itinerary.map((day) => (
              <div key={day.day} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Day {day.day}</h2>
                      <p className="text-blue-100">{day.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-100">Daily Budget</p>
                      <p className="text-xl font-semibold">{day.totalCost}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    {day.activities.map((activity, index) => {
                      const IconComponent = getActivityIcon(activity.type);
                      return (
                        <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <IconComponent className="h-6 w-6 text-blue-600" />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Clock className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm font-medium text-gray-900">{activity.time}</span>
                                  <span className="text-sm text-gray-500">({activity.duration})</span>
                                </div>
                                
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {activity.name}
                                </h3>
                                
                                <p className="text-gray-600 mb-2">{activity.description}</p>
                                
                                <div className="flex items-center space-x-4 text-sm">
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                    <span className="font-medium">{activity.rating}</span>
                                  </div>
                                  <span className="font-medium text-green-600">{activity.price}</span>
                                </div>
                                
                                {activity.tips && (
                                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                                    <strong>Tip:</strong> {activity.tips}
                                  </div>
                                )}
                              </div>
                              
                              <img
                                src={activity.image}
                                alt={activity.name}
                                className="w-20 h-20 object-cover rounded-lg ml-4"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {day.accommodation && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Bed className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {day.accommodation.name}
                              </h3>
                              <p className="text-gray-600 mb-2">{day.accommodation.description}</p>
                              
                              <div className="flex items-center space-x-4 text-sm mb-2">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                  <span className="font-medium">{day.accommodation.rating}</span>
                                </div>
                                <span className="font-medium text-green-600">{day.accommodation.price}</span>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                {day.accommodation.amenities.map((amenity, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 bg-white text-xs text-gray-600 rounded border"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <img
                              src={day.accommodation.image}
                              alt={day.accommodation.name}
                              className="w-20 h-20 object-cover rounded-lg ml-4"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to book your trip?</h3>
              <p className="text-gray-600 mb-4">
                Your personalized itinerary is ready! You can now proceed to book your accommodations and activities.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Book This Trip
                </button>
                <button 
                  onClick={downloadPDF}
                  disabled={isGeneratingPDF}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;