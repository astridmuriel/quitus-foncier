import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Home, BarChart3, Users, FileText, LogOut, User, Layers, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Helper function to generate building data
const generateBuildings = () => {
    const buildings = [];
    const baseId = 1000;

    // Generate 250 buildings across Gombe district (on land, not river!)
    // Proper Gombe coordinates: lat -4.32 to -4.33, lng 15.29 to 15.31
    for (let i = 0; i < 250; i++) {
        const lat = -4.32 + (Math.random() * 0.01);  // -4.32 to -4.31 (land area)
        const lng = 15.29 + (Math.random() * 0.02);  // 15.29 to 15.31 (Gombe proper)
        const surface = Math.round(80 + Math.random() * 2000);  // 80-2000 m²
        const confidence = Math.round(65 + Math.random() * 30);
        const color = confidence >= 85 ? '#00aa00' : confidence >= 75 ? '#f5af19' : '#ff6600';
        const radius = Math.min(20, Math.max(4, Math.round(surface / 100)));

        buildings.push({
            id: `GOB-${String(baseId + i).padStart(6, '0')}`,
            lat: parseFloat(lat.toFixed(6)),
            lng: parseFloat(lng.toFixed(6)),
            surface: parseFloat(surface.toFixed(1)),
            confidence: parseFloat(confidence.toFixed(1)),
            color,
            radius
        });
    }

    return buildings;
};

export default function FiscalCartography() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Generate building data once
    const buildings = useMemo(() => generateBuildings(), []);

    // Calculate statistics
    const statistics = useMemo(() => {
        const totalBuildings = buildings.length;
        const totalSurfaceM2 = buildings.reduce((sum, b) => sum + b.surface, 0);
        const avgConfidence = buildings.reduce((sum, b) => sum + b.confidence, 0) / totalBuildings;

        // Tax calculation: 0.1% of property value
        // Property value estimated at $200 USD per m² (realistic for Gombe commercial/residential)
        const propertyValuePerM2USD = 200;
        const taxRate = 0.001; // 0.1%
        const totalPropertyValueUSD = totalSurfaceM2 * propertyValuePerM2USD;
        const potentialTaxRevenueUSD = totalPropertyValueUSD * taxRate;

        // Convert to CDF (approx 2,500 CDF per USD)
        const usdToCdf = 2500;
        const potentialTaxRevenueCDF = potentialTaxRevenueUSD * usdToCdf;

        return {
            totalBuildings,
            totalSurfaceM2: Math.round(totalSurfaceM2),
            avgConfidence: avgConfidence.toFixed(1),
            potentialTaxRevenueUSD: potentialTaxRevenueUSD.toFixed(2),
            potentialTaxRevenueCDF: Math.round(potentialTaxRevenueCDF).toLocaleString(),
            highCompliance: buildings.filter(b => b.confidence >= 85).length,
            mediumCompliance: buildings.filter(b => b.confidence >= 75 && b.confidence < 85).length,
            lowCompliance: buildings.filter(b => b.confidence < 75).length,
        };
    }, [buildings]);

    const zoneStats = {
        name: 'Centre Gombe - Boulevard du 30 Juin',
        totalBuildings: statistics.totalBuildings,
        displayedBuildings: buildings.length,
        surface: `${statistics.totalSurfaceM2.toLocaleString()} m²`,
        complianceRate: statistics.avgConfidence,
        source: 'Google Open Buildings (IA)'
    };

    const legend = [
        { label: '≥85%', color: 'bg-green-500', count: statistics.highCompliance, hex: '#00aa00' },
        { label: '75-85%', color: 'bg-yellow-500', count: statistics.mediumCompliance, hex: '#f5af19' },
        { label: '<75%', color: 'bg-red-500/80', count: statistics.lowCompliance, hex: '#ff6600' }
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
                                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                <Home className="h-5 w-5" />
                                <span>Tableau de Bord</span>
                            </button>
                            <button
                                onClick={() => navigate('/ministry/cartography')}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 bg-purple-50 rounded-lg font-medium"
                            >
                                <MapPin className="h-5 w-5" />
                                <span>Cartographie Fiscale</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
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
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Cartographie Fiscale</h2>
                                <p className="text-sm text-gray-600">Visualisation géographique du statut fiscal des bâtiments</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <Layers className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-8 overflow-hidden">
                    <div className="h-full flex gap-6">
                        {/* Left Panel with Zone Info and Tax Revenue */}
                        <div className="w-96 flex flex-col gap-6 flex-shrink-0 overflow-y-auto">
                            {/* Tax Revenue Card */}
                            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center space-x-3 mb-4">
                                    <DollarSign className="h-8 w-8" />
                                    <div>
                                        <h3 className="font-bold text-lg">Potentiel Fiscal</h3>
                                        <p className="text-sm opacity-90">Zone Gombe (Taux: 0.1%)</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white/20 rounded-lg p-4">
                                        <p className="text-xs opacity-75 font-semibold mb-1">Nombre de Bâtiments:</p>
                                        <p className="text-2xl font-bold">{statistics.totalBuildings.toLocaleString()}</p>
                                    </div>

                                    <div className="bg-white/20 rounded-lg p-4">
                                        <p className="text-xs opacity-75 font-semibold mb-1">Surface Totale:</p>
                                        <p className="text-2xl font-bold">{statistics.totalSurfaceM2.toLocaleString()} m²</p>
                                    </div>

                                    <div className="bg-white/20 rounded-lg p-4">
                                        <p className="text-xs opacity-75 font-semibold mb-1">Revenus Potentiels (USD):</p>
                                        <p className="text-3xl font-bold">${parseFloat(statistics.potentialTaxRevenueUSD).toLocaleString()} USD</p>
                                    </div>

                                    <div className="bg-white/20 rounded-lg p-4">
                                        <p className="text-xs opacity-75 font-semibold mb-1">Revenus Potentiels (CDF):</p>
                                        <p className="text-2xl font-bold">{statistics.potentialTaxRevenueCDF} FC</p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-white/30 text-xs opacity-75">
                                    <p>* Basé sur valeur estimée: $200 USD/m²</p>
                                    <p>* Taux de taxe: 0.1% de la valeur</p>
                                </div>
                            </div>

                            {/* Zone Info Card */}
                            <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                        <span className="text-teal-600 font-bold text-xl">QR</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Quitus RDC</h3>
                                        <p className="text-sm opacity-90">Centre Gombe - Boulevard du 30 Juin</p>
                                    </div>
                                </div>

                                <div className="bg-white/20 rounded-lg p-4 space-y-3 text-sm mb-4">
                                    <div className="flex items-start space-x-2">
                                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs opacity-75 font-semibold">Zone:</p>
                                            <p className="font-semibold">~1 km² Centre Gombe</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-2">
                                        <Building2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs opacity-75 font-semibold">Bâtiments:</p>
                                            <p className="font-semibold">{zoneStats.totalBuildings.toLocaleString()} (100% affichés!)</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-2">
                                        <Layers className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs opacity-75 font-semibold">Superficie:</p>
                                            <p className="font-semibold">{zoneStats.surface}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-2">
                                        <BarChart3 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs opacity-75 font-semibold">Confiance moy:</p>
                                            <p className="font-semibold">{zoneStats.complianceRate}%</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-2">
                                        <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs opacity-75 font-semibold">Source:</p>
                                            <p className="font-semibold text-xs">{zoneStats.source}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="pt-4 border-t border-white/30">
                                    <p className="text-xs font-bold mb-3">Confiance Google IA</p>
                                    <div className="space-y-2">
                                        {legend.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <div
                                                        className="w-4 h-4 rounded-full"
                                                        style={{ backgroundColor: item.hex }}
                                                    ></div>
                                                    <span className="text-sm font-medium">{item.label}</span>
                                                </div>
                                                <span className="text-sm font-bold">{item.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leaflet Map */}
                        <div className="flex-1 rounded-xl overflow-hidden shadow-lg" style={{ height: '100%' }}>
                            <MapContainer
                                center={[-4.323, 15.30]}
                                zoom={15}
                                style={{ height: '100%', width: '100%' }}
                                zoomControl={true}
                            >
                                {/* Satellite Imagery */}
                                <TileLayer
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                    attribution="Esri"
                                    maxZoom={18}
                                />

                                {/* OpenStreetMap overlay for labels */}
                                <TileLayer
                                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    opacity={0.3}
                                    maxZoom={19}
                                />

                                {/* Building Markers */}
                                {buildings.map((building) => (
                                    <CircleMarker
                                        key={building.id}
                                        center={[building.lat, building.lng]}
                                        radius={building.radius}
                                        pathOptions={{
                                            fillColor: building.color,
                                            fillOpacity: 0.7,
                                            color: building.color,
                                            weight: 2,
                                            opacity: 1.0
                                        }}
                                    >
                                        <Popup maxWidth={250}>
                                            <div style={{ fontFamily: 'Arial', fontSize: '12px', minWidth: '220px' }}>
                                                <div style={{ background: '#11998e', color: 'white', padding: '8px', margin: '-8px -8px 8px -8px', borderRadius: '4px 4px 0 0' }}>
                                                    <b>Quitus RDC</b> - Google IA
                                                </div>
                                                <table style={{ width: '100%' }}>
                                                    <tbody>
                                                        <tr><td><b>ID:</b></td><td>{building.id}</td></tr>
                                                        <tr><td><b>Superficie:</b></td><td>{building.surface} m²</td></tr>
                                                        <tr><td><b>Confiance:</b></td><td>{building.confidence}%</td></tr>
                                                        <tr><td><b>GPS:</b></td><td>{building.lat.toFixed(6)}, {building.lng.toFixed(6)}</td></tr>
                                                        <tr><td><b>Taxe (0.1%):</b></td><td>${(building.surface * 200 * 0.001).toFixed(2)} USD</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Popup>
                                        <Tooltip sticky>
                                            <div>
                                                {Math.round(building.surface)}m² - {Math.round(building.confidence)}%
                                            </div>
                                        </Tooltip>
                                    </CircleMarker>
                                ))}
                            </MapContainer>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
