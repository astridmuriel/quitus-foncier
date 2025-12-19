import { Link } from 'react-router-dom';
import { Building2, User, Building, Users, BarChart3 } from 'lucide-react';

export default function Home() {
    const userTypes = [
        {
            type: 'particulier',
            title: 'Particulier',
            description: 'Déclaration individuelle',
            icon: User,
            color: 'indigo',
            path: '/login/particulier'
        },
        {
            type: 'entreprise',
            title: 'Entreprise',
            description: 'Déclaration professionnelle',
            icon: Building,
            color: 'blue',
            path: '/login/entreprise'
        },
        {
            type: 'ministry',
            title: 'Ministère des Finances',
            description: 'Portail administratif',
            icon: BarChart3,
            color: 'purple',
            path: '/login/ministry'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-3 mb-4">
                        <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <Building2 className="h-9 w-9 text-white" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-4xl font-bold text-indigo-600">Quitus Foncier</h1>
                            <p className="text-lg text-gray-500">Télé-déclaration</p>
                        </div>
                    </div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Plateforme de gestion des taxes foncières
                    </p>
                </div>

                {/* User Type Cards */}
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                        Sélectionnez votre profil
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {userTypes.map((userType) => {
                            const Icon = userType.icon;
                            return (
                                <Link
                                    key={userType.type}
                                    to={userType.path}
                                    className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border-2 border-transparent hover:border-${userType.color}-500 group`}
                                >
                                    <div className="text-center">
                                        <div className={`w-16 h-16 mx-auto mb-4 bg-${userType.color}-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            <Icon className={`h-8 w-8 text-${userType.color}-600`} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {userType.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {userType.description}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
