import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, TrendingUp, TrendingDown, DollarSign, MapPin, Filter, Download, Home, BarChart3, Users, FileText, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MinistryDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState('kinshasa');
    const [selectedCommune, setSelectedCommune] = useState('all');
    const [selectedYear, setSelectedYear] = useState('2025');

    // Mock data for cities and communes
    const cities = [
        { id: 'kinshasa', name: 'Kinshasa' },
        { id: 'lubumbashi', name: 'Lubumbashi' },
        { id: 'goma', name: 'Goma' },
        { id: 'kisangani', name: 'Kisangani' }
    ];

    const communes = {
        kinshasa: ['Gombe', 'Limete', 'Bandalungwa', 'Kalamu', 'Ngaliema'],
        lubumbashi: ['Katuba', 'Kampemba', 'Kenya', 'Lubumbashi'],
        goma: ['Goma', 'Karisimbi', 'Nyiragongo'],
        kisangani: ['Makiso', 'Mangobo', 'Tshopo']
    };

    // Mock statistics
    const stats = {
        totalDeclarations: 15420,
        totalCollected: 2850000000,
        totalExpected: 3500000000,
        paidPercentage: 81.4,
        unpaidPercentage: 18.6,
        complianceRate: 76.2
    };

    const communeStats = [
        { name: 'Gombe', declarations: 3420, collected: 850000000, expected: 1000000000, rate: 85 },
        { name: 'Limete', declarations: 2850, collected: 650000000, expected: 800000000, rate: 81.3 },
        { name: 'Bandalungwa', declarations: 1920, collected: 420000000, expected: 550000000, rate: 76.4 },
        { name: 'Kalamu', declarations: 2150, collected: 380000000, expected: 500000000, rate: 76 },
        { name: 'Ngaliema', declarations: 3180, collected: 550000000, expected: 650000000, rate: 84.6 }
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="p-6 border-b">
                        <button
                            onClick={() => navigate('/ministry')}
                            className="flex items-center space-x-3 w-full hover:opacity-80 transition-opacity"
                        >
                            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-left">
                                <h1 className="text-lg font-bold text-purple-600">Quitus Foncier</h1>
                                <p className="text-xs text-gray-500">Portail Ministère</p>
                            </div>
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4">
                        <div className="space-y-2">
                            <button
                                onClick={() => navigate('/ministry')}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 bg-purple-50 rounded-lg font-medium"
                            >
                                <Home className="h-5 w-5" />
                                <span>Tableau de Bord</span>
                            </button>
                            <button
                                onClick={() => navigate('/ministry/cartography')}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                                <MapPin className="h-5 w-5" />
                                <span>Cartographie Fiscale</span>
                            </button>
                            <button
                                onClick={() => navigate('/ministry/analyses')}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                <BarChart3 className="h-5 w-5" />
                                <span>Analyses</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                                <FileText className="h-5 w-5" />
                                <span>Rapports</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                                <Users className="h-5 w-5" />
                                <span>Contribuables</span>
                            </button>
                        </div>
                    </nav>

                    {/* User Info & Logout */}
                    <div className="p-4 border-t">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Administrateur'}</p>
                                <p className="text-xs text-purple-600 font-medium">Ministère</p>
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
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Tableau de Bord - Collecte Fiscale</h2>
                            <p className="text-sm text-gray-600">Vue d'ensemble des taxes foncières collectées</p>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {/* Filters */}
                    <div className="mb-6">
                        <div className="bg-white p-4 rounded-lg shadow flex gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <MapPin className="inline h-4 w-4 mr-1" />
                                    Ville
                                </label>
                                <select
                                    value={selectedCity}
                                    onChange={(e) => {
                                        setSelectedCity(e.target.value);
                                        setSelectedCommune('all');
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                >
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Filter className="inline h-4 w-4 mr-1" />
                                    Commune
                                </label>
                                <select
                                    value={selectedCommune}
                                    onChange={(e) => setSelectedCommune(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                >
                                    <option value="all">Toutes les communes</option>
                                    {communes[selectedCity]?.map((commune) => (
                                        <option key={commune} value={commune.toLowerCase()}>{commune}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Année</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                >
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                </select>
                            </div>
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center">
                                <Download className="h-4 w-4 mr-2" />
                                Exporter
                            </button>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Déclarations</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.totalDeclarations.toLocaleString()}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Building2 className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Montant Collecté</p>
                                        <p className="text-2xl font-bold text-green-600">${(stats.totalCollected / 2500 / 1000).toFixed(1)}K USD</p>
                                        <p className="text-xs text-gray-500">{(stats.totalCollected / 1000000).toFixed(1)}M CDF</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <TrendingUp className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">{stats.paidPercentage}% du total attendu</p>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Taxes Impayées</p>
                                        <p className="text-2xl font-bold text-red-600">${((stats.totalExpected - stats.totalCollected) / 2500 / 1000).toFixed(1)}K USD</p>
                                        <p className="text-xs text-gray-500">{((stats.totalExpected - stats.totalCollected) / 1000000).toFixed(1)}M CDF</p>
                                    </div>
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                        <TrendingDown className="h-6 w-6 text-red-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">{stats.unpaidPercentage}% non collecté</p>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Taux de Conformité</p>
                                        <p className="text-2xl font-bold text-purple-600">{stats.complianceRate}%</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <DollarSign className="h-6 w-6 text-purple-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Commune Breakdown */}
                    <div>
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Détails par Commune</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commune</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Déclarations</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Collecté</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendu</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taux</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {communeStats.map((commune, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{commune.name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{commune.declarations.toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-semibold text-green-600">${(commune.collected / 2500 / 1000).toFixed(1)}K USD</div>
                                                    <div className="text-xs text-gray-500">{(commune.collected / 1000000).toFixed(1)}M CDF</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-600">${(commune.expected / 2500 / 1000).toFixed(1)}K USD</div>
                                                    <div className="text-xs text-gray-500">{(commune.expected / 1000000).toFixed(1)}M CDF</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                                            <div
                                                                className={`h-2 rounded-full ${commune.rate >= 80 ? 'bg-green-500' : commune.rate >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                                style={{ width: `${commune.rate}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900">{commune.rate}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Action Items */}
                        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-yellow-800">Actions Recommandées</h3>
                                    <div className="mt-2 text-sm text-yellow-700">
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Relance nécessaire pour <strong>Bandalungwa</strong> (taux: 76.4%)</li>
                                            <li>Campagne de sensibilisation à <strong>Kalamu</strong> (650M CDF non collectés)</li>
                                            <li><strong>120M CDF</strong> en retard de paiement sur l'ensemble de Kinshasa</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
