import { useGetInsurances } from "../../api/insuranceApi.js";
import InsuranceItem from "./InsuranceItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import PreferencesModal from "../PreferencesModal/PreferencesModal.jsx"; // Import the PreferencesModal component
import { setInsurances } from "../../features/insurancechange/insurancechangeSlice.js";
import Loader from "../Loader/Loader.jsx";
import { useEffect, useState } from "react";

export default function InsuranceBoard() {
    const { data: insuranceData, error, isLoading } = useGetInsurances();
    const dispatch = useDispatch();
    const aktuelleVersicherung = useSelector((state) => state.auth.aktuelleKrankenversicherung);
    const zähne = useSelector(state => state.preferences.zähneImportant);
    const krebsvorsorge = useSelector(state => state.preferences.krebsvorsorgeImportant);
    const osteopathie = useSelector(state => state.preferences.osteopathieImportant);
    const homöopathie = useSelector(state => state.preferences.homöopathieImportant);

    const [sortedInsuranceData, setSortedInsuranceData] = useState([]);
    const [besteVersicherung, setBesteVersicherung] = useState(null);

    useEffect(() => {
        if (isLoading || error || !insuranceData) return;

        const leistungsbewertung = (leistung) => {
            if (!leistung) return 0;
            const items = leistung.split(",");
            return items.reduce((score, current) => {
                if (current.includes("✅")) {
                    return score + 1;
                }
                if (current.includes("❌")) {
                    return score - 1;
                }
                dispatch(setInsurances(insuranceData));
                return score;
            }, 0);
        };

        const adjustedInsuranceData = insuranceData.map(insurance => {
            let totalBewertung = 0;
            if (zähne) totalBewertung += leistungsbewertung(insurance.zahnleistung);
            if (krebsvorsorge) totalBewertung += leistungsbewertung(insurance.krebsvorsorgeLeistung);
            if (osteopathie) totalBewertung += leistungsbewertung(insurance.osteopathieLeistung);
            if (homöopathie) totalBewertung += leistungsbewertung(insurance.homöopathieLeistung);
            if (aktuelleVersicherung === insurance.name) totalBewertung -= 20;

            const adjustedBeitragssatz = insurance.versicherungsbeitrag - (totalBewertung * 0.25);

            return { ...insurance, adjustedBeitragssatz };
        });

        // Sortiert die Versicherungen nach dem adjusted Beitragssatz
        let sortedData = [...adjustedInsuranceData].sort((a, b) => a.adjustedBeitragssatz - b.adjustedBeitragssatz);

        // Index der aktuellen Versicherung in dem Array der Versicherungen
        const currentInsuranceIndex = sortedData.findIndex(insurance => insurance.name === aktuelleVersicherung);

        // Wenn die aktuelle Versicherung die erste in der Liste ist wird sie auf Platz 2 verschoben.
        if (currentInsuranceIndex > 0) {
            const currentInsurance = sortedData.splice(currentInsuranceIndex, 1)[0];
            sortedData.splice(1, 0, currentInsurance);
        }

        // Wenn die aktuelle Versicherung die beste ist wird die beste ein Element verschoben.
        let bestInsurance = sortedData[0];
        if (bestInsurance.name === aktuelleVersicherung && sortedData.length > 1) {
            bestInsurance = sortedData[1];
        }

        setSortedInsuranceData(sortedData);
        setBesteVersicherung(bestInsurance);
    }, [insuranceData, zähne, krebsvorsorge, osteopathie, homöopathie, aktuelleVersicherung, isLoading, error]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p>Could not fetch insurances</p>;
    }

    return (
        <div className="flex">
            <div className="flex-1 overflow-y-auto max-h-screen p-4 mr-64 md:mr-72 lg:mr-80">
                {sortedInsuranceData.map((insurance) => (
                    <InsuranceItem
                        key={insurance.id}
                        id={insurance.id}
                        name={insurance.name}
                        zahnleistung={insurance.zahnleistung}
                        versicherungsbeitrag={insurance.versicherungsbeitrag}
                        osteopathieLeistung={insurance.osteopathieLeistung}
                        krebsvorsorgeLeistung={insurance.krebsvorsorgeLeistung}
                        homöopathieLeistung={insurance.homöopathieLeistung}
                        isAktuelleVersicherung={insurance.name === aktuelleVersicherung}
                        besteVersicherung={besteVersicherung}
                        vertragsAbschluss={false}
                    />
                ))}
            </div>
            <PreferencesModal />
        </div>
    );
}
