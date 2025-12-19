import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Building2, Home, MapPin, BarChart3, Users, FileText, LogOut, User,
    TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, XCircle,
    DollarSign, Target, Clock, MapPinned
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Analyses() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    // Mock analytics data
    const complianceTrends = [
        { month: 'Juil', rate: 72, collected: 280000, target: 350000 },
        { month: 'Août', rate: 75, collected: 310000, target: 350000 },
        { month: 'Sept', rate: 78, collected: 330000, target: 350000 },
        { month: 'Oct', rate: 81, collected: 340000, target: 350000 },
        { month: 'Nov', rate: 84, collected: 360000, target: 370000 },
        { month: 'Déc', rate: 87, collected: 390000, target: 400000 },
    ];

    // Priority zones for enforcement
    const priorityZones = [
        {
            commune: 'Bandalungwa',
            complianceRate: 62,
            unpaid: 85000,
            unpaidCDF: 212500000,
            buildingCount: 450,
            priority: 'URGENT',
            action: 'Campagne de sensibilisation immédiate'
        },
        {
            commune: 'Kalamu',
            complianceRate: 68,
            unpaid: 72000,
            unpaidCDF: 180000000,
            buildingCount: 380,
            priority: 'HIGH',
            action: 'Renforcer la collecte sur le terrain'
        },
        {
            commune: 'Limete',
            complianceRate: 74,
            unpaid: 56000,
            unpaidCDF: 140000000,
            buildingCount: 320,
            priority: 'MEDIUM',
            action: 'Rappels de paiement ciblés'
        },
        {
            commune: 'Ngaliema',
            complianceRate: 79,
            unpaid: 42000,
            unpaidCDF: 105000000,
            buildingCount: 290,
            priority: 'LOW',
            action: 'Suivi mensuel standard'
        },
    ];

    // Actionable recommendations
    const recommendations = [
        {
            title: 'Collections Manquantes Critiques',
            value: '$254,000 USD',
            valueCDF: '635,000,000 FC',
            impact: 'HIGH',
            description: '1,440 bâtiments en retard de paiement depuis +90 jours',
            action: 'Lancer campagne de recouvrement ciblée',
            icon: AlertTriangle,
            color: 'red'
        },
        {
            title: 'Opportunité de Revenus',
            value: '$128,000 USD',
            valueCDF: '320,000,000 FC',
            impact: 'MEDIUM',
            description: '750 nouveaux bâtiments identifiés non encore déclarés',
            action: 'Enregistrement et sensibilisation prioritaire',
            icon: Target,
            color: 'yellow'
        },
        {
            title: 'Zones à Haute Performance',
            value: '$420,000 USD',
            valueCDF: '1,050,000,000 FC',
            impact: 'POSITIVE',
            description: 'Gombe: 87% de conformité - modèle à répliquer',
            action: 'Documenter best practices pour autres communes',
            icon: CheckCircle2,
            color: 'green'
        },
    ];

    // Collection efficiency metrics
    const efficiencyMetrics = {
        avgCollectionTime: '23 jours',
        fastestCommune: 'Gombe (15 jours)',
        slowestCommune: 'Bandalungwa (38 jours)',
        digitalPaymentRate: '34%',
        fieldCollectionRate: '66%'
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'URGENT': return 'bg-red-100 text-red-700 border-red-300';
            case 'HIGH': return 'bg-orange-100 text-orange-700 border-orange-300';
            case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'LOW': return 'bg-green-100 text-green-700 border-green-300';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getImpactIcon = (impact) => {
        switch (impact) {
            case 'HIGH': return <AlertTriangle className="h-5 w-5" />;
            case 'MEDIUM': return <Target className="h-5 w-5" />;
            case 'POSITIVE': return <CheckCircle2 className="h-5 w-5" />;
            default: return null;
        }
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
                                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                <Home className="h-5 w-5" />
                                <span>Tableau de Bord</span>
                            </button>
                            <button
                                onClick={() => navigate('/ministry/cartography')}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                <MapPin className="h-5 w-5" />
                                <span>Cartographie Fiscale</span>
                            </button>
                            <button
                                onClick={() => navigate('/ministry/analyses')}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 bg-purple-50 rounded-lg font-medium"
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
            <div className="flex-1 overflow-auto">
                {/* Header */}
                <header className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="px-8 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Analyses & Insights</h2>
                                <p className="text-sm text-gray-600">Indicateurs clés et actions recommandées</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <select
                                    value={selectedPeriod}
                                    onChange={(e) => setSelectedPeriod(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="week">Cette semaine</option>
                                    <option value="month">Ce mois</option>
                                    <option value="quarter">Ce trimestre</option>
                                    <option value="year">Cette année</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-8 space-y-8">
                    {/* Actionable Recommendations */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Prioritaires Recommandées</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recommendations.map((rec, index) => (
                                <div key={index} className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${rec.color === 'red' ? 'border-red-500' :
                                    rec.color === 'yellow' ? 'border-yellow-500' :
                                        'border-green-500'
                                    }`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-2 rounded-lg ${rec.color === 'red' ? 'bg-red-100 text-red-600' :
                                            rec.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-green-100 text-green-600'
                                            }`}>
                                            <rec.icon className="h-6 w-6" />
                                        </div>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded ${rec.impact === 'HIGH' ? 'bg-red-100 text-red-700' :
                                            rec.impact === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                            {rec.impact}
                                        </span>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">{rec.title}</h4>
                                    <div className="mb-3">
                                        <p className="text-2xl font-bold text-gray-900">{rec.value}</p>
                                        <p className="text-sm text-gray-600">{rec.valueCDF}</p>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">{rec.description}</p>
                                    <div className="pt-4 border-t border-gray-200">
                                        <p className="text-xs font-semibold text-gray-700 mb-1">Action recommandée:</p>
                                        <p className="text-sm text-purple-600 font-medium">{rec.action}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Priority Zones */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Zones Prioritaires pour Enforcement</h3>
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Commune</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Taux Conformité</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Impayés (USD)</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Impayés (CDF)</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Bâtiments</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Priorité</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {priorityZones.map((zone, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <MapPinned className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="font-medium text-gray-900">{zone.commune}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-semibold text-gray-900">{zone.complianceRate}%</span>
                                                    {zone.complianceRate < 70 ?
                                                        <TrendingDown className="h-4 w-4 text-red-500 ml-2" /> :
                                                        <TrendingUp className="h-4 w-4 text-green-500 ml-2" />
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                ${zone.unpaid.toLocaleString()} USD
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {zone.unpaidCDF.toLocaleString()} FC
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {zone.buildingCount}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(zone.priority)}`}>
                                                    {zone.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-purple-600">
                                                {zone.action}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Compliance Trends */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendances de Conformité (6 derniers mois)</h3>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="grid grid-cols-6 gap-4">
                                {complianceTrends.map((trend, index) => (
                                    <div key={index} className="text-center">
                                        <div className="mb-3">
                                            {/* Simple bar chart */}
                                            <div className="relative h-40 flex items-end justify-center">
                                                <div className="w-16 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg"
                                                    style={{ height: `${trend.rate}%` }}>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs font-semibold text-gray-700 mb-1">{trend.month}</p>
                                        <p className="text-lg font-bold text-purple-600">{trend.rate}%</p>
                                        <p className="text-xs text-gray-600">${trend.collected.toLocaleString()} USD</p>
                                        <p className="text-xs text-gray-500">/ ${trend.target.toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Amélioration sur 6 mois:</p>
                                        <p className="text-2xl font-bold text-green-600">+15%</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Objectif Q1 2026:</p>
                                        <p className="text-2xl font-bold text-gray-900">90%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Collection Efficiency */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Efficacité de la Collecte</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <Clock className="h-8 w-8 text-blue-600" />
                                    <TrendingDown className="h-5 w-5 text-green-600" />
                                </div>
                                <h4 className="text-sm font-semibold text-gray-600 mb-2">Temps Moyen de Collecte</h4>
                                <p className="text-3xl font-bold text-gray-900">{efficiencyMetrics.avgCollectionTime}</p>
                                <p className="text-sm text-gray-600 mt-2">↓ 4 jours vs mois dernier</p>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                                    <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded">TOP</span>
                                </div>
                                <h4 className="text-sm font-semibold text-gray-600 mb-2">Commune la Plus Rapide</h4>
                                <p className="text-xl font-bold text-gray-900">{efficiencyMetrics.fastestCommune}</p>
                                <p className="text-sm text-purple-600 mt-2">Modèle à répliquer</p>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <XCircle className="h-8 w-8 text-red-600" />
                                    <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-700 rounded">SLOW</span>
                                </div>
                                <h4 className="text-sm font-semibold text-gray-600 mb-2">Commune la Plus Lente</h4>
                                <p className="text-xl font-bold text-gray-900">{efficiencyMetrics.slowestCommune}</p>
                                <p className="text-sm text-red-600 mt-2">Nécessite intervention</p>
                            </div>
                        </div>
                    </section>

                    {/* Digital vs Field Collection */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mode de Paiement</h3>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-semibold text-gray-700">Paiement Digital</h4>
                                        <span className="text-2xl font-bold text-purple-600">{efficiencyMetrics.digitalPaymentRate}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div className="bg-purple-600 h-4 rounded-full" style={{ width: efficiencyMetrics.digitalPaymentRate }}></div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">Tendance: +8% ce mois</p>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-semibold text-gray-700">Collecte Terrain</h4>
                                        <span className="text-2xl font-bold text-gray-900">{efficiencyMetrics.fieldCollectionRate}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div className="bg-gray-400 h-4 rounded-full" style={{ width: efficiencyMetrics.fieldCollectionRate }}></div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">Tendance: -8% ce mois</p>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t">
                                <p className="text-sm font-semibold text-purple-600">
                                    💡 Recommandation: Promouvoir davantage les moyens de paiement digital pour réduire les coûts operationnels
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
