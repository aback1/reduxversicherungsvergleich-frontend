import ProgressBar from "./ProgressBar.jsx";
import { useState } from "react";
import { useGetInsurances } from "../../api/insuranceApi.js";
import { usePostSale } from "../../api/salesApi.js";
import { useSelector, useDispatch } from "react-redux";
import InsuranceItem from "../InsuranceBoard/InsuranceItem.jsx";
import {
    setArbeitgeber, setArbeitgeberWechsel,
    setEmail,
    setFirstname,
    setLastname, setMehrAlsEinArbeitgeber,
    setPhonenumber,
    setSeit24Angestellt,
    setInsuranceChangeFinished
} from "../../features/insurancechange/insurancechangeSlice.js";
import CustomerEntry from "./CustomerEntry.jsx";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function VertragsAbschluss() {
    const newInsuranceName = useSelector(state => state.insurancechange.chosenInsurance);
    const currentInsuranceName = useSelector(state => state.auth.aktuelleKrankenversicherung);
    const arbeitGeber = useSelector(state => state.insurancechange.arbeitgeber);
    const firstname = useSelector(state => state.insurancechange.firstname);
    const lastname = useSelector(state => state.insurancechange.lastname);
    const email = useSelector(state => state.insurancechange.email);
    const phonenumber = useSelector(state => state.insurancechange.phonenumber || "");
    const mehrAlsEinArbeitgeber = useSelector(state => state.insurancechange.mehrAlsEinArbeitgeber);
    const arbeitgeberWechsel = useSelector(state => state.insurancechange.arbeitgeberWechsel);
    const seit24angestellt = useSelector(state => state.insurancechange.seit24Angestellt);
    const currentUserID = useSelector(state => state.auth.currentUser);

    const {
        mutate: postSale,
        isLoading: isPosting,
        error: postError,
    } = usePostSale();

    const { data: insuranceData, error, isLoading } = useGetInsurances();

    let newInsurance = null;
    let currentInsurance = null;
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSeit24AngestelltChange = (e) => {
        dispatch(setSeit24Angestellt(e.target.value));
    };

    const handleFirstNameChange = (e) => {
        dispatch(setFirstname(e.target.value));
    }

    const handleLastNameChange = (e) => {
        dispatch(setLastname(e.target.value));
    }

    const handleTelefonNummerChange = (e) => {
        dispatch(setPhonenumber(e.target.value));
    }

    const handleMehrAlsEinArbeitgeberChange = (e) => {
        dispatch(setMehrAlsEinArbeitgeber(e.target.value));
    }

    const handleEmailChange = (e) => {
        dispatch(setEmail(e.target.value));
    }

    const handleArbeitgeberChange = (e) => {
        dispatch(setArbeitgeber(e.target.value));
    }

    const handleArbeitGeberWechsel = (e) => {
        dispatch(setArbeitgeberWechsel(e.target.value));
    }

    if (!isLoading && insuranceData) {
        newInsurance = insuranceData.find(insurance => insurance.name === newInsuranceName);
        currentInsurance = insuranceData.find(insurance => insurance.name === currentInsuranceName);
    }

    if (error) {
        return <p>Error: Couldn't fetch Insurance data!</p>
    }

    //alle Leistungen die ein ✅ enthalten und in der neuen Versicherung aber nicht in der aktuellen Versicherung sind
    //werden in das Improvements array aufgenommen.
    const calculateImprovements = () => {
        if (!newInsurance || !currentInsurance) return null;

        const improvements = [];

        const newZahnleistung = newInsurance.zahnleistung.split(",");
        const currentZahnleistung = currentInsurance.zahnleistung.split(",");

        newZahnleistung.forEach(item => {
            if (!currentZahnleistung.includes(item) && item.includes("✅")) {
                improvements.push(`Zähne: ${item.trim()}`);
            }
        });

        const newOsteopathieLeistung = newInsurance.osteopathieLeistung.split(",");
        const currentOsteopathieLeistung = currentInsurance.osteopathieLeistung.split(",");

        newOsteopathieLeistung.forEach(item => {
            if (!currentOsteopathieLeistung.includes(item) && item.includes("✅")) {
                improvements.push(`Osteopathie: ${item.trim()}`);
            }
        });

        const newKrebsvorsorgeLeistung = newInsurance.krebsvorsorgeLeistung.split(",");
        const currentKrebsvorsorgeLeistung = currentInsurance.krebsvorsorgeLeistung.split(",");

        newKrebsvorsorgeLeistung.forEach(item => {
            if (!currentKrebsvorsorgeLeistung.includes(item) && item.includes("✅")) {
                improvements.push(`Krebsvorsorge: ${item.trim()}`);
            }
        });

        const newHomöopathieLeistung = newInsurance.homöopathieLeistung.split(",");
        const currentHomöopathieLeistung = currentInsurance.homöopathieLeistung.split(",");

        newHomöopathieLeistung.forEach(item => {
            if (!currentHomöopathieLeistung.includes(item) && item.includes("✅")) {
                improvements.push(`Homöopathie: ${item.trim()}`);
            }
        });

        return improvements;
    };

    const improvements = calculateImprovements();
    const newSaleID = uuidv4();

    const handlePostSale = async (e) => {
        e.preventDefault();

        const newSale = {
            id: newSaleID,
            userID: currentUserID,
            firstname: firstname,
            lastname: lastname,
            newInsurance: newInsurance.name,
            email: email,
            phonenumber: phonenumber || "",
            arbeitGeber,
            habenSieMehrAlsEinenArbeitgeber: mehrAlsEinArbeitgeber,
            habenSieVorIhrenArbeitgeberZuWechseln: arbeitgeberWechsel,
            sindSieSeit2024angestellt: seit24angestellt,
        };

        try {
            await postSale(newSale);
            dispatch(setInsuranceChangeFinished(true));
            navigate("/danke");
        } catch (error) {
            console.error("Error during posting of sale", error);
            alert("Failed to post sale data. Please try again.");
        }
    };

    return (
        <>
            <ProgressBar width={100} />
            <div className="flex flex-col items-center p-8 space-y-8">
                <div className="flex w-full space-x-8">
                    <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Neue Versicherung</h2>
                        {newInsurance && (
                            <InsuranceItem
                                {...newInsurance}
                                isAktuelleVersicherung={false}
                                vertragsAbschluss={true}
                            />
                        )}
                    </div>
                    <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Aktuelle Versicherung</h2>
                        {currentInsurance && (
                            <InsuranceItem
                                {...currentInsurance}
                                isAktuelleVersicherung={true}
                            />
                        )}
                    </div>
                </div>
                <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Kundendaten</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <CustomerEntry entry={firstname} onChange={handleFirstNameChange} text={"Vorname"} />
                        <CustomerEntry entry={lastname} onChange={handleLastNameChange} text={"Nachname"} />
                        <CustomerEntry entry={phonenumber} onChange={handleTelefonNummerChange} text={"Telefonnummer"} />
                        <CustomerEntry entry={email} onChange={handleEmailChange} text={"Email Adresse"} />
                        <CustomerEntry entry={arbeitGeber} onChange={handleArbeitgeberChange} text={"Arbeitgeber"} />
                        <CustomerEntry entry={mehrAlsEinArbeitgeber} onChange={handleMehrAlsEinArbeitgeberChange} text={"Haben Sie mehr als einen Arbeitgeber?"} />
                        <CustomerEntry entry={arbeitgeberWechsel} onChange={handleArbeitGeberWechsel} text={"Haben Sie vor ihren Arbeitgeber zu wechseln?"} />
                        <CustomerEntry entry={seit24angestellt} onChange={handleSeit24AngestelltChange} text={"Sind Sie seit dem 26.12.2024 angestellt?"} />
                    </div>
                </div>
                <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                    <span>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-3 border border-green-700 rounded text-lg"
                            onClick={handlePostSale}
                        >
                            Jetzt Versicherungswechsel abschließen
                        </button>
                    </span>
                    <h2 className="text-xl font-bold mb-4">Ihre neuen Vorteile</h2>
                    <div className="flex justify-end mb-4"></div>

                    {improvements && improvements.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {improvements.map((improvement, index) => (
                                <li key={index} className="text-gray-600">
                                    {improvement}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Keine Verbesserungen gefunden.</p>
                    )}
                    <h3 className="text-lg font-bold mb-2">
                        Neuer Versicherungsbeitrag
                    </h3>
                    <p className="text-gray-600 flex items-center">
                  <span className="text-green-500">
                    {newInsurance.versicherungsbeitrag}%
                  </span>
                        <span className="mx-2">statt</span>
                        <span className="line-through">
                    {currentInsurance.versicherungsbeitrag}%
                  </span>
                    <span className="text-red-500">
                        {` (${(currentInsurance.versicherungsbeitrag + 2.6).toFixed(1)}%)`}
                     </span>
                    </p>
                </div>
            </div>
        </>
    );
}
