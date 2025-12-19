import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Plus, Trash2, Save, Building2 } from 'lucide-react';

export default function DeclarationForm() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [properties, setProperties] = useState([{
        id: 1,
        ville: '',
        commune: '',
        quartier: '',
        lieuDit: '',
        numeroTitreFoncier: '',
        superficieTerrain: '',
        superficieConstruction: '',
        valeurTerrain: '',
        valeurConstruction: ''
    }]);

    const addProperty = () => {
        setProperties([...properties, {
            id: properties.length + 1,
            ville: '',
            commune: '',
            quartier: '',
            lieuDit: '',
            numeroTitreFoncier: '',
            superficieTerrain: '',
            superficieConstruction: '',
            valeurTerrain: '',
            valeurConstruction: ''
        }]);
    };

    const removeProperty = (id) => {
        if (properties.length > 1) {
            setProperties(properties.filter(p => p.id !== id));
        }
    };

    const updateProperty = (id, field, value) => {
        setProperties(properties.map(p =>
            p.id === id ? { ...p, [field]: value } : p
        ));
    };

    const calculateTotal = () => {
        return properties.reduce((total, prop) => {
            const terrainValue = parseFloat(prop.valeurTerrain) || 0;
            const constructionValue = parseFloat(prop.valeurConstruction) || 0;
            return total + terrainValue + constructionValue;
        }, 0);
    };

    const handleSubmit = () => {
        // Save declaration
        console.log('Submitting declaration:', properties);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="h-6 w-6" />
                            </button>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                            >
                                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                                    <Building2 className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-indigo-600">Quitus Foncier</h1>
                                    <p className="text-sm text-gray-500">Nouvelle Déclaration</p>
                                </div>
                            </button>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            <Save className="h-5 w-5 mr-2" />
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-center space-x-4 mb-8">
                    <div className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>1</div>
                        <span className="ml-2 font-medium">Propriétés</span>
                    </div>
                    <div className="w-16 h-1 bg-gray-200"></div>
                    <div className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>2</div>
                        <span className="ml-2 font-medium">Calcul</span>
                    </div>
                    <div className="w-16 h-1 bg-gray-200"></div>
                    <div className={`flex items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>3</div>
                        <span className="ml-2 font-medium">Certification</span>
                    </div>
                </div>

                {/* Step 1: Property Details */}
                {step === 1 && (
                    <div className="space-y-6">
                        {properties.map((property, index) => (
                            <div key={property.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Immeuble {index + 1}
                                    </h3>
                                    {properties.length > 1 && (
                                        <button
                                            onClick={() => removeProperty(property.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ville
                                        </label>
                                        <input
                                            type="text"
                                            value={property.ville}
                                            onChange={(e) => updateProperty(property.id, 'ville', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Ex: Kinshasa"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Commune
                                        </label>
                                        <input
                                            type="text"
                                            value={property.commune}
                                            onChange={(e) => updateProperty(property.id, 'commune', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Ex: Gombe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Quartier
                                        </label>
                                        <input
                                            type="text"
                                            value={property.quartier}
                                            onChange={(e) => updateProperty(property.id, 'quartier', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Ex: Socimat"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Lieu-dit
                                        </label>
                                        <input
                                            type="text"
                                            value={property.lieuDit}
                                            onChange={(e) => updateProperty(property.id, 'lieuDit', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            N° Titre Foncier
                                        </label>
                                        <input
                                            type="text"
                                            value={property.numeroTitreFoncier}
                                            onChange={(e) => updateProperty(property.id, 'numeroTitreFoncier', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Superficie Terrain (m²)
                                        </label>
                                        <input
                                            type="number"
                                            value={property.superficieTerrain}
                                            onChange={(e) => updateProperty(property.id, 'superficieTerrain', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Superficie Construction (m²)
                                        </label>
                                        <input
                                            type="number"
                                            value={property.superficieConstruction}
                                            onChange={(e) => updateProperty(property.id, 'superficieConstruction', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Valeur Terrain (CDF)
                                        </label>
                                        <input
                                            type="number"
                                            value={property.valeurTerrain}
                                            onChange={(e) => updateProperty(property.id, 'valeurTerrain', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Valeur Construction (CDF)
                                        </label>
                                        <input
                                            type="number"
                                            value={property.valeurConstruction}
                                            onChange={(e) => updateProperty(property.id, 'valeurConstruction', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={addProperty}
                            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition-colors flex items-center justify-center"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Ajouter un immeuble
                        </button>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setStep(2)}
                                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Suivant
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Tax Calculation */}
                {step === 2 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">
                            Calcul de la Taxe Foncière
                        </h3>

                        <div className="space-y-4">
                            <div className="flex justify-between py-3 border-b">
                                <span className="text-gray-600">Valeur Totale Imposable:</span>
                                <span className="font-semibold">{calculateTotal().toLocaleString()} CDF</span>
                            </div>
                            <div className="flex justify-between py-3 border-b">
                                <span className="text-gray-600">Taux:</span>
                                <span className="font-semibold">0.1%</span>
                            </div>
                            <div className="flex justify-between py-3 border-b">
                                <span className="text-gray-600">Principal:</span>
                                <span className="font-semibold">{(calculateTotal() * 0.001).toLocaleString()} CDF</span>
                            </div>
                            <div className="flex justify-between py-3 border-b">
                                <span className="text-gray-600">Pénalités:</span>
                                <span className="font-semibold">0 CDF</span>
                            </div>
                            <div className="flex justify-between py-4 bg-indigo-50 px-4 rounded-lg">
                                <span className="text-lg font-bold text-gray-900">Total à Payer:</span>
                                <span className="text-lg font-bold text-indigo-600">{(calculateTotal() * 0.001).toLocaleString()} CDF</span>
                            </div>
                        </div>

                        <div className="flex justify-between mt-8">
                            <button
                                onClick={() => setStep(1)}
                                className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Retour
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Suivant
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Certification */}
                {step === 3 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">
                            Certification et Soumission
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    id="attestation"
                                    className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="attestation" className="text-sm text-gray-700">
                                    J'atteste que toutes les informations fournies dans ce formulaire sont complètes et exactes.
                                </label>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-sm text-yellow-800">
                                    <strong>Attention:</strong> Une amende forfaitaire peut être appliquée en cas de fraude ou de fausse déclaration.
                                </p>
                            </div>

                            <div className="pt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Commentaire (optionnel)
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Votre commentaire ici..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-between mt-8">
                            <button
                                onClick={() => setStep(2)}
                                className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Retour
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                <Save className="h-5 w-5 mr-2" />
                                Soumettre la Déclaration
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
