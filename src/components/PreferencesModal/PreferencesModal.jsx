import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setZähne, setOsteopathie, setHomöopathie, setKrebsvorsorge } from "../../features/preferences/preferencesSlice.js";

export default function PreferencesModal() {
    const [isVisible, setIsVisible] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const [zähne, setZähneState] = useState(searchParams.get("Zähne") === "true");
    const [osteopathie, setOsteopathieState] = useState(searchParams.get("Osteopathie") === "true");
    const [krebsvorsorge, setKrebsvorsorgeState] = useState(searchParams.get("Krebsvorsorge") === "true");
    const [homöopathie, setHomöopathieState] = useState(searchParams.get("homöopathie") === "true");

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleCheckboxChange = (param, action, isChecked, setter) => {
        setter(isChecked);

        //set the search Params based on the previous params.
        //if a param defaults to false the param is deleted from the object
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            if (isChecked) {
                newParams.set(param, "true");
            } else {
                newParams.delete(param);
            }
            return newParams;
        });

        dispatch(action(isChecked));
    };

    useEffect(() => {
        setZähneState(searchParams.get("Zähne") === "true");
        setOsteopathieState(searchParams.get("Osteopathie") === "true");
        setKrebsvorsorgeState(searchParams.get("Krebsvorsorge") === "true");
        setHomöopathieState(searchParams.get("homöopathie") === "true");
    }, [searchParams]);

    return (
        <>
            <button
                onClick={toggleVisibility}
                className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded"
            >
                {isVisible ? "Preferenzen verbergen" : "Preferenzen anzeigen"}
            </button>
            <aside
                className={`fixed top-0 right-0 mt-20 h-full w-64 bg-white p-4 rounded-l-lg border-l-2 border-gray-300 shadow-lg overflow-y-auto md:w-72 lg:w-80 transition-transform transform z-40 ${isVisible ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Wählen Sie ihre Versicherungsleistungen</h2>
                </div>
                <div className="flex flex-col space-y-4 mt-20">
                    <div className="flex items-center border-b pb-2">
                        <input
                            type="checkbox"
                            id="zähne"
                            className="mr-2"
                            checked={zähne}
                            onChange={(e) => handleCheckboxChange("Zähne", setZähne, e.target.checked, setZähneState)}
                        />
                        <label htmlFor="zähne" className="text-gray-800">Zähne</label>
                        <div className="ml-auto tooltip relative group">
                            <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-500 cursor-pointer" />
                            <span className="tooltiptext hidden group-hover:block absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded py-1 px-3">
                                Versicherungsleistungen für die Zahnpflege enthalten: Kostenübernahme bei der professionellen Zahnreinigung, Kostenübernahme bei Zahnersatz und Paradontose Behandlung.
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center border-b pb-2">
                        <input
                            type="checkbox"
                            id="osteopathie"
                            className="mr-2"
                            checked={osteopathie}
                            onChange={(e) => handleCheckboxChange("Osteopathie", setOsteopathie, e.target.checked, setOsteopathieState)}
                        />
                        <label htmlFor="osteopathie" className="text-gray-800">Osteopathie</label>
                        <div className="ml-auto tooltip relative group">
                            <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-500 cursor-pointer" />
                            <span className="tooltiptext hidden group-hover:block absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded py-1 px-3">
                                Osteopathische Versicherungsleistungen: die Behandlung von Faszien und Gelenken, um Verspannungen zu lösen und die Beweglichkeit zu fördern. Haltungskorrekturen helfen, Fehlhaltungen zu korrigieren und so langfristig Rücken- und Nackenschmerzen vorzubeugen.
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center border-b pb-2">
                        <input
                            type="checkbox"
                            id="krebsvorsorge"
                            className="mr-2"
                            checked={krebsvorsorge}
                            onChange={(e) => handleCheckboxChange("Krebsvorsorge", setKrebsvorsorge, e.target.checked, setKrebsvorsorgeState)}
                        />
                        <label htmlFor="krebsvorsorge" className="text-gray-800">Krebsvorsorge</label>
                        <div className="ml-auto tooltip relative group">
                            <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-500 cursor-pointer" />
                            <span className="tooltiptext hidden group-hover:block absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded py-1 px-3">
                                Das Krebsvorsorge Untersuchungsangebot besteht in der Regel aus: Hautkrebs Screening, Lungenkrebs Vorsorge Untersuchung, Vorsorge Untersuchung Prostatakrebs (Mann), Vorsorge Untersuchung Brustkrebs (Frau)
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="homöopathie"
                            className="mr-2"
                            checked={homöopathie}
                            onChange={(e) => handleCheckboxChange("homöopathie", setHomöopathie, e.target.checked, setHomöopathieState)}
                        />
                        <label htmlFor="homöopathie" className="text-gray-800">Homöopathie</label>
                        <div className="ml-auto tooltip relative group">
                            <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-500 cursor-pointer" />
                            <span className="tooltiptext hidden group-hover:block absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded py-1 px-3">
                                Homöopathische Versicherungsleistungen umfassen die Beratung durch einen erfahrenen Heilpraktiker sowie die Verschreibung und Anwendung homöopathischer Arzneimittel. Diese Leistungen zielen darauf ab, die Selbstheilungskräfte des Körpers zu aktivieren und so die Gesundheit und das Wohlbefinden der Versicherten zu fördern.
                            </span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
