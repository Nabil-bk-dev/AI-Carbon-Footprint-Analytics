// src/components/SignupForm.tsx
import { useState } from "react";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Les mots de passe ne correspondent pas.");
    }

    try {
      await signup(email, password);
      navigate("/", { state: { showLogin: true } });
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Une erreur est survenue.";
      setError(msg);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="••••••••"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="••••••••"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 flex items-center justify-center transition"
      >
        Créer un compte
        <ArrowRight className="ml-2 h-5 w-5" />
      </button>
    </form>
  );
};

export default SignupForm;
