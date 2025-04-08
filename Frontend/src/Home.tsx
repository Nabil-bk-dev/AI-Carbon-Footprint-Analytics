import  { useState } from 'react';
import { Leaf, Users, Lock, Mail, ArrowRight, CheckCircle2, Globe, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './index.css';


function Home() {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-green-600">EcoApp</span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/dashboard')} className="text-gray-600 hover:text-green-600 transition-colors">Login</button>
              <button onClick={() => setIsSignup(true)} className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-y-0 left-1/2 bg-green-50 rounded-full w-96 h-96 -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
          <div className="absolute bottom-0 right-0 bg-green-50 rounded-full w-64 h-64 translate-x-1/2 translate-y-1/2 opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between py-16 lg:py-24">
            {/* Left side - Content */}
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full text-green-700 text-sm font-medium mb-6">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Déjà plus de 10,000 utilisateurs nous font confiance
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Construisons ensemble un{' '}
                <span className="text-green-600">avenir plus vert</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Notre application vous aide à suivre et réduire votre empreinte carbone au quotidien. 
                Rejoignez notre communauté d'utilisateurs engagés pour un monde plus durable.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transform hover:-translate-y-1 transition-transform">
                  <Users className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">+10k Utilisateurs</h3>
                  <p className="text-gray-600">Une communauté grandissante</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transform hover:-translate-y-1 transition-transform">
                  <Globe className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">Impact Global</h3>
                  <p className="text-gray-600">Présent dans 15 pays</p>
                </div>
              </div>
            </div>

            {/* Right side - Auth Form */}
            <div className="lg:w-5/12">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 backdrop-blur-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {isSignup ? 'Créer un compte' : 'Se connecter'}
                </h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="password"
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  {isSignup && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="password"
                          className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 flex items-center justify-center transform hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl"
                  >
                    {isSignup ? 'Créer un compte' : 'Se connecter'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                  {isSignup ? (
                    <>Déjà un compte? <button onClick={() => setIsSignup(false)} className="text-green-600 hover:text-green-700 font-medium">Se connecter</button></>
                  ) : (
                    <>Pas encore de compte? <button onClick={() => setIsSignup(true)} className="text-green-600 hover:text-green-700 font-medium">S'inscrire</button></>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-16 lg:py-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Pourquoi nous choisir?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Découvrez comment notre application vous aide à faire la différence au quotidien
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-all">
                <div className="bg-green-50 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <LineChart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Suivi Précis</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Mesurez votre impact environnemental avec précision grâce à nos outils avancés et nos analyses détaillées
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-all">
                <div className="bg-green-50 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Communauté Active</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Rejoignez une communauté dynamique et engagée, partagez vos expériences et apprenez des autres
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-all">
                <div className="bg-green-50 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Lock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Sécurité Garantie</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Vos données sont protégées et sécurisées avec les plus hauts standards de l'industrie
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;