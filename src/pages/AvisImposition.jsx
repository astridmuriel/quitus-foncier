import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AvisImposition() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Mock data - in real app, fetch based on id
    const avisData = {
        reference: id || '0010165480125',
        dateEmission: '16/04/2025',
        niu: 'M041814402351J',
        ribCentre: '1200100608111111107',
        nomRaison: user?.name || 'Patrick Kabongo',
        typeDeclaration: 'DSF Normal',
        adresse: '6000',
        quartier: 'Socimat',
        codePoste: '608',
        commune: 'Gombe',
        lieuDit: 'Avenue du Commerce',
        regime: 'SIMPLIFIÉ',
        centreRattachement: 'CSIPLI MFOUNDI',
        items: [
            {
                libelle: 'Depot tardif',
                principal: 250000,
                tauxCac: 0,
                cac: 0,
                penalite: 1.5,
                montant: 0
            },
            {
                libelle: 'Dépôt tardif de la DSF',
                principal: 0,
                tauxCac: 0,
                cac: 0,
                penalite: 250000,
                montant: 250000
            }
        ],
        totalPrincipal: 0,
        totalCac: 0,
        totalPenalite: 250000,
        totalMontant: 250000,
        devise: 'CDF',
        montantLettre: 'deux cent cinquante mille'
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header - hide on print */}
            <div className="bg-white shadow print:hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="inline-flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            Retour au tableau de bord
                        </button>
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            <Download className="h-5 w-5 mr-2" />
                            Télécharger / Imprimer
                        </button>
                    </div>
                </div>
            </div>

            {/* Tax Notice Document */}
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none">
                    <div className="p-8 md:p-12" style={{ fontFamily: 'Arial, sans-serif' }}>

                        {/* Header */}
                        <div className="flex justify-between items-start mb-6 text-sm">
                            <div className="text-center flex-1">
                                <p className="font-bold">DIRECTION GENERALE DES IMPOTS</p>
                                <div className="border-b-2 border-black w-16 mx-auto mt-1"></div>
                            </div>
                            <div className="text-center flex-1">
                                <p className="font-bold">DIRECTORATE GENERAL OF TAXATION</p>
                                <div className="border-b-2 border-black w-16 mx-auto mt-1"></div>
                            </div>
                        </div>

                        {/* Center info */}
                        <div className="mb-4">
                            <p className="text-sm font-semibold">CENTRE DE RATTACHEMENT: {avisData.centreRattachement}</p>
                        </div>

                        {/* Title */}
                        <div className="border-4 border-black p-4 mb-6 text-center">
                            <h1 className="text-3xl font-bold">AVIS D'IMPOSITION</h1>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-6 text-sm">
                            <div>
                                <p><span className="font-semibold">N° de Référence:</span> {avisData.reference}</p>
                                <p><span className="font-semibold">NIU:</span> {avisData.niu}</p>
                                <p className="mt-4"><span className="font-semibold">Nom / Raison sociale:</span> {avisData.nomRaison}</p>
                                <p><span className="font-semibold">Type de déclaration:</span> {avisData.typeDeclaration}</p>
                                <p><span className="font-semibold">Adresse:</span> {avisData.adresse}</p>
                                <p><span className="font-semibold">Quartier:</span> {avisData.quartier}</p>
                                <p><span className="font-semibold">Regime:</span> {avisData.regime}</p>
                            </div>
                            <div>
                                <p><span className="font-semibold">Date d'Emission:</span> {avisData.dateEmission}</p>
                                <p><span className="font-semibold">RIB Centre de Rattachement:</span> {avisData.ribCentre}</p>
                                <p className="mt-4"><span className="font-semibold">CRI:</span> undefined</p>
                                <p><span className="font-semibold">Code poste:</span> {avisData.codePoste}</p>
                                <p><span className="font-semibold">Commune:</span> {avisData.commune}</p>
                                <p><span className="font-semibold">Lieu dit:</span> {avisData.lieuDit}</p>
                            </div>
                        </div>

                        {/* Tax Table */}
                        <div className="border-2 border-black mb-6">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b-2 border-black">
                                        <th className="border-r border-black p-2 text-left">N°</th>
                                        <th className="border-r border-black p-2 text-left">LIBELLE</th>
                                        <th className="border-r border-black p-2 text-right">PRINCIPAL</th>
                                        <th className="border-r border-black p-2 text-right">TAUX CAC</th>
                                        <th className="border-r border-black p-2 text-right">CAC</th>
                                        <th className="border-r border-black p-2 text-right">PENALITE</th>
                                        <th className="p-2 text-right">MONTANT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {avisData.items.map((item, index) => (
                                        <tr key={index} className="border-b border-black">
                                            <td className="border-r border-black p-2">{index + 1}</td>
                                            <td className="border-r border-black p-2">{item.libelle}</td>
                                            <td className="border-r border-black p-2 text-right">{item.principal.toLocaleString()}</td>
                                            <td className="border-r border-black p-2 text-right">{item.tauxCac}</td>
                                            <td className="border-r border-black p-2 text-right">{item.cac}</td>
                                            <td className="border-r border-black p-2 text-right">{item.penalite.toLocaleString()}</td>
                                            <td className="p-2 text-right">{item.montant.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    <tr className="font-bold bg-gray-100">
                                        <td className="border-r border-black p-2" colSpan="2">TOTAL</td>
                                        <td className="border-r border-black p-2 text-right">{avisData.totalPrincipal}</td>
                                        <td className="border-r border-black p-2"></td>
                                        <td className="border-r border-black p-2 text-right">{avisData.totalCac}</td>
                                        <td className="border-r border-black p-2 text-right">{avisData.totalPenalite.toLocaleString()}</td>
                                        <td className="p-2 text-right">{avisData.totalMontant.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Amount in words */}
                        <div className="mb-6 text-sm">
                            <p><span className="font-semibold">Devise:</span> {avisData.devise}</p>
                            <p className="mt-2 italic">{avisData.montantLettre}</p>
                        </div>

                        {/* QR Code placeholder */}
                        <div className="flex justify-end mb-6">
                            <div className="w-32 h-32 border-2 border-gray-300 flex items-center justify-center bg-gray-50">
                                <p className="text-xs text-gray-500 text-center">QR Code<br />{new Date().toLocaleString('fr-FR')}</p>
                            </div>
                        </div>

                        {/* Payment Instructions */}
                        <div className="border-t-2 border-gray-300 pt-6 text-sm">
                            <h3 className="font-bold mb-3">COMMENT PAYER VOTRE DECLARATION APRES SOUMISSION</h3>
                            <ul className="space-y-1">
                                <li>• Via <span className="text-red-600 font-semibold">Orange Money (OM)</span> : Composez #150*3*4*2*2#</li>
                                <li>• Via <span className="text-red-600 font-semibold">MTN Mobile Money (MoMo)</span> : Composez *206*1# ou bien taper *126*2# puis 7, puis 2</li>
                                <li>• Via le télépaiement OTP à travers le lien <a href="http://www.otp.dgi.cm" className="text-blue-600 underline">http://www.otp.dgi.cm</a></li>
                                <li>• Via les applications mobiles de <span className="text-red-600 font-semibold">Yoomee</span> et <span className="text-red-600 font-semibold">Express Exchange</span> en les téléchargeant sur App Store ou Play Store</li>
                                <li>• Via le virement bancaire au RIB figurant sur votre avis d'imposition</li>
                                <li>• Via un versement en espèces auprès des guichets des banques ou des établissements financiers habilités (<span className="text-red-600 font-semibold">réseau GUCE</span>)</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            {/* Print styles */}
            <style jsx>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          body {
            background: white;
          }
        }
      `}</style>
        </div>
    );
}
