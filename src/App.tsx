import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Menu, X, ChevronDown, Star, Shield, Users, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { LatLng, Icon } from 'leaflet';
import { PaymentModal } from './components/PaymentModal';
import { DriverForm } from './components/DriverForm';

import 'leaflet/dist/leaflet.css';

type BookingStep = 'location' | 'vehicle' | 'payment';

// Fix for default marker icon
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} />
  );
}

function App() {
  const [bookingStep, setBookingStep] = useState<BookingStep>('location');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [driverGender, setDriverGender] = useState<'any' | 'male' | 'female'>('any');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.span
              className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Urban Ride
            </motion.span>
            <div className="hidden md:block">
              <nav className="flex space-x-8">
                <a href="#home" className="text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors">Accueil</a>
                <a href="#booking" className="text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors">Réserver</a>
                <a href="#driver" className="text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors">Devenir Chauffeur</a>
                <a href="#contact" className="text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors">Contact</a>
              </nav>
            </div>
            <button onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={toggleMenu}></div>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-16 right-0 bottom-0 w-64 bg-white shadow-lg"
            >
              <nav className="px-4 py-2 space-y-2">
                <a href="#home" className="block text-gray-700 hover:text-purple-600 py-2">Accueil</a>
                <a href="#booking" className="block text-gray-700 hover:text-purple-600 py-2">Réserver</a>
                <a href="#driver" className="block text-gray-700 hover:text-purple-600 py-2">Devenir Chauffeur</a>
                <a href="#contact" className="block text-gray-700 hover:text-purple-600 py-2">Contact</a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:pt-32 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Votre trajet en toute{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
              simplicité
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Urban Ride vous connecte avec des chauffeurs professionnels pour des trajets sûrs et confortables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Réserver maintenant
            </motion.a>
            <motion.button
              onClick={() => setShowDriverForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-6 py-3 border border-purple-600 text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 transition-colors"
            >
              Devenir chauffeur
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Réserver votre trajet</h2>
                
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Point de départ"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-700">Préférence chauffeur :</p>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="driver-gender"
                        value="any"
                        checked={driverGender === 'any'}
                        onChange={(e) => setDriverGender('any')}
                        className="text-purple-600"
                      />
                      <span className="ml-2">Indifférent</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="driver-gender"
                        value="male"
                        checked={driverGender === 'male'}
                        onChange={(e) => setDriverGender('male')}
                        className="text-purple-600"
                      />
                      <span className="ml-2">Homme</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="driver-gender"
                        value="female"
                        checked={driverGender === 'female'}
                        onChange={(e) => setDriverGender('female')}
                        className="text-purple-600"
                      />
                      <span className="ml-2">Femme</span>
                    </label>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Prix estimé:</span>
                    <span className="text-xl font-semibold text-gray-900">25,00 €</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                  onClick={() => setShowPaymentModal(true)}
                >
                  Réserver maintenant
                </motion.button>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden h-[500px]"
            >
              <MapContainer
                center={[48.8566, 2.3522]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
              </MapContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir Urban Ride ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sécurité garantie</h3>
              <p className="text-gray-600">Chauffeurs vérifiés et trajets sécurisés pour votre tranquillité.</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Disponible 24/7</h3>
              <p className="text-gray-600">Service disponible à toute heure, tous les jours de la semaine.</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Service premium</h3>
              <p className="text-gray-600">Une expérience de qualité avec des véhicules confortables.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Driver Section */}
      <section id="driver" className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Devenez chauffeur Urban Ride</h2>
            <p className="text-xl text-gray-600">Rejoignez notre communauté de chauffeurs professionnels</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Users className="h-6 w-6 text-purple-600 mr-2" />
                  Avantages chauffeurs
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <ChevronDown className="h-4 w-4 text-purple-600 mr-2" />
                    Revenus attractifs et flexibles
                  </li>
                  <li className="flex items-center">
                    <ChevronDown className="h-4 w-4 text-purple-600 mr-2" />
                    Planification horaire libre
                  </li>
                  <li className="flex items-center">
                    <ChevronDown className="h-4 w-4 text-purple-600 mr-2" />
                    Support technique 24/7
                  </li>
                  <li className="flex items-center">
                    <ChevronDown className="h-4 w-4 text-purple-600 mr-2" />
                    Formation continue
                  </li>
                </ul>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDriverForm(true)}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Postuler maintenant
              </motion.button>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-4">Conditions requises</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <ChevronDown className="h-4 w-4 text-purple-600 mr-2 mt-1" />
                  <div>
                    <span className="font-medium">Permis de conduire valide</span>
                    <p className="text-sm">Minimum 3 ans d'expérience de conduite</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronDown className="h-4 w-4 text-purple-600 mr-2 mt-1" />
                  <div>
                    <span className="font-medium">Véhicule éligible</span>
                    <p className="text-sm">Moins de 7 ans, 4 portes minimum</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronDown className="h-4 w-4 text-purple-600 mr-2 mt-1" />
                  <div>
                    <span className="font-medium">Carte professionnelle VTC</span>
                    <p className="text-sm">En cours de validité</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ChevronDown className="h-4 w-4 text-purple-600 mr-2 mt-1" />
                  <div>
                    <span className="font-medium">Casier judiciaire vierge</span>
                    <p className="text-sm">Obligatoire pour l'inscription</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
            <p className="text-xl text-gray-600">Notre équipe est à votre écoute</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Envoyer
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-purple-50 p-6 rounded-lg"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Assistance téléphonique</h3>
                  <p className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-2" />
                    07 44 12 98 31
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">jordanbe3721@gmail.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Horaires du support</h3>
                  <p className="text-gray-600">7j/7, 24h/24</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text"
              >
                Urban Ride
              </motion.span>
              <p className="text-gray-400 mt-4">Votre partenaire de confiance pour tous vos déplacements.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-purple-400 transition-colors">Accueil</a></li>
                <li><a href="#booking" className="hover:text-purple-400 transition-colors">Réserver</a></li>
                <li><a href="#driver" className="hover:text-purple-400 transition-colors">Devenir Chauffeur</a></li>
                <li><a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">CGU</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Mentions légales</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }} href="#"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Urban Ride. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {showPaymentModal && (
          <PaymentModal
            onClose={() => setShowPaymentModal(false)}
            amount={25.00}
          />
        )}
        {showDriverForm && (
          <DriverForm
            onClose={() => setShowDriverForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;