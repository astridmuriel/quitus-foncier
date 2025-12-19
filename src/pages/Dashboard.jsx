import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, FileText, PlusCircle, Eye, Building2, Filter, Home, User, Settings } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [selectedYear, setSelectedYear] = useState('2025');

    const handleLogout = () => {
        logout();
        navigate('/login/particulier');
    };

    // Sample declarations by year
    const declarationsByYear = {
        '2025': [
            {
                id: '0010165480125',
                date: '16/04/2025',
                status: 'Payé',
                statusColor: 'green',
                montant: '250,000',
                properties: [
                    {
                        ville: 'Kinshasa',
                        commune: 'Gombe',
                        quartier: 'Socimat',
                        numeroTitreFoncier: 'TF-12345',
                        valeurTotal: 150000
                    }
                ]
            },
            {
                id: '0010165480126',
                date: '10/03/2025',
                status: 'En attente',
                statusColor: 'yellow',
                montant: '500,000',
                properties: [
                    {
                        ville: 'Lubumbashi',
                        commune: 'Katuba',
                        quartier: 'Kenya',
                        numeroTitreFoncier: 'TF-67890',
                        valeurTotal: 500000
                    }
                ]
            }
        ],
        '2024': [
            {
                id: '0010165480001',
                date: '20/11/2024',
                status: 'Payé',
                statusColor: 'green',
                montant: '180,000',
                properties: [
                    {
                        ville: 'Kinshasa',
                        commune: 'Limete',
                        quartier: 'Industriel',
                        numeroTitreFoncier: 'TF-11223',
                        valeurTotal: 180000
                    }
                ]
            }
        ],
        '2023': [
            {
                id: '0010165479990',
                date: '15/06/2023',
                status: 'Payé',
                statusColor: 'green',
                montant: '120,000',
                properties: [
                    {
                        ville: 'Kinshasa',
                        commune: 'Gombe',
                        quartier: 'Centre',
                        numeroTitreFoncier: 'TF-98765',
                        valeurTotal: 120000
                    }
                ]
            }
        ]
    };

    const currentDeclarations = declarationsByYear[selectedYear] || [];

    if (!user) {
        return <div className="p-8 text-center text-gray-500">Chargement... (Ou redirection si non connecté)</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="p-6 border-b">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center space-x-3 w-full hover:opacity-80 transition-opacity"
                        >
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-left">
                                <h1 className="text-lg font-bold text-indigo-600">Quitus Foncier</h1>
                                <p className="text-xs text-gray-500">Portail Particulier</p>
                            </div>
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4">
                        <div className="space-y-2">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 bg-indigo-50 rounded-lg font-medium"
                            >
                                <Home className="h-5 w-5" />
                                <span>Mes Déclarations</span>
                            </button>
                            <button
                                onClick={() => navigate('/declaration/new')}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                <PlusCircle className="h-5 w-5" />
                                <span>Nouvelle Déclaration</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                                <User className="h-5 w-5" />
                                <span>Mon Profil</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                                <Settings className="h-5 w-5" />
                                <span>Paramètres</span>
                            </button>
                        </div>
                    </nav>

                    {/* User Info & Logout */}
                    <div className="p-4 border-t">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Déconnexion</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="px-8 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Mes Déclarations</h2>
                                <p className="text-sm text-gray-600">Gérez vos déclarations fiscales</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <Filter className="h-5 w-5 text-gray-500" />
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="2025">2025</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                    </select>
                                </div>
                                <button
                                    onClick={() => navigate('/declaration/new')}
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                                    <PlusCircle className="h-5 w-5 mr-2" />
                                    Nouvelle Déclaration
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {currentDeclarations.length > 0 ? (
                        <div className="space-y-4">
                            {currentDeclarations.map((declaration) => (
                                <div key={declaration.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <FileText className="h-10 w-10 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            Déclaration N° {declaration.id}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">Date: {declaration.date}</p>
                                                        <div className="mt-1">
                                                            {declaration.properties.map((prop, idx) => (
                                                                <p key={idx} className="text-sm text-gray-600">
                                                                    {prop.ville}, {prop.commune}, {prop.quartier}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-6">
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500">Montant</p>
                                                    <p className="text-lg font-bold text-gray-900">{declaration.montant} CDF</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${declaration.statusColor === 'green'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {declaration.status}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => navigate(`/avis/${declaration.id}`)}
                                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    Voir l'avis
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                            <div className="p-12 text-center">
                                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune déclaration</h3>
                                <p className="mt-1 text-sm text-gray-500">Aucune déclaration pour l'année {selectedYear}.</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
