// src/components/LoginForm.tsx
import { Lock, Mail, ArrowRight } from 'lucide-react';

const LoginForm = () => {
  return (
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
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 flex items-center justify-center transform hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl"
      >
        Se connecter
        <ArrowRight className="ml-2 h-5 w-5" />
      </button>
    </form>
  );
};

export default LoginForm;
