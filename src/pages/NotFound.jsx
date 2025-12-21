import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Introuvable</h1>
                <p className="text-gray-500 mb-8">
                    La page que vous recherchez n'existe pas ou a été déplacée.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                    >
                        <Home className="w-5 h-5" />
                        <span>Retour à l'accueil</span>
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full text-gray-600 font-medium px-6 py-3 hover:bg-gray-50 rounded-xl transition"
                    >
                        Retour en arrière
                    </button>
                </div>
            </div>
        </div>
    );
}
