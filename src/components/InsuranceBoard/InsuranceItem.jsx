import InsuranceLogo from "./InsuranceLogo.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserWantsToChangeInsurance, setChosenInsurance } from "../../features/insurancechange/insurancechangeSlice.js";

export default function InsuranceItem({
                                          id,
                                          name,
                                          versicherungsbeitrag,
                                          zahnleistung,
                                          osteopathieLeistung,
                                          krebsvorsorgeLeistung,
                                          homöopathieLeistung,
                                          isAktuelleVersicherung = false,
                                          besteVersicherung = null,
                                          vertragsAbschluss = false,
                                      }) {

    // Jeder string wird bei einem Komma gesplittet und getrimmt und als <p> tag ausgegeben.
    const splitInsuranceOffers = (leistung) => {
        if (!leistung) return null;
        const items = leistung.split(",");
        return items.map((item, index) => (
            <p key={index} className="text-gray-600">
                {item.trim()}
            </p>
        ));
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bruttoEinkommen = useSelector((state) => state.auth.bruttoAnnualPay);
    const versicherungsBeitragNominal = (bruttoEinkommen / 100) * versicherungsbeitrag;

    const handleChangeVersicherung = (name) => {
        dispatch(setChosenInsurance(name));
        dispatch(setUserWantsToChangeInsurance(true));
        navigate("/versicherungswechsel");
    };

    return (
        <div
            className={`p-4 border rounded-lg shadow-md mb-4 flex items-start relative ${
                isAktuelleVersicherung ? "bg-gray-200" : ""
            }`}
        >
            <div className="flex-1">
                {isAktuelleVersicherung && !vertragsAbschluss &&  (
                    <p className="text-white bg-red-500 px-2 py-1 rounded-md shadow-md mb-2 text-center">
                        Ihre aktuelle Versicherung steigt (+2,6%)
                    </p>
                )}
                {besteVersicherung && !vertragsAbschluss && name === besteVersicherung.name && (
                    <p className="text-white bg-green-500 px-2 py-1 rounded-md shadow-md mb-2 text-center">
                        Die beste Versicherung für ihre Bedürfnisse.
                    </p>
                )}
                <div className="flex items-center mb-4">
                    <h2 className="text-xl font-bold mr-4">{name}</h2>
                    {!isAktuelleVersicherung && !vertragsAbschluss && (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => handleChangeVersicherung(name)}
                        >
                            Jetzt wechseln!
                        </button>
                    )}
                </div>
                <div className="relative">
                    <InsuranceLogo name={name} />
                </div>
                <span>
          <h2 className="text-xl font-bold">Beitragssatz</h2>
        </span>
                <p className="text-gray-600">
                    {versicherungsbeitrag}% monatlich ({(versicherungsBeitragNominal / 24).toFixed(2)})
                </p>
                <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mt-4">Zähne</h2>
                {splitInsuranceOffers(zahnleistung)}
                <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mt-4">Osteopathie</h2>
                {splitInsuranceOffers(osteopathieLeistung)}
                <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mt-4">Krebsvorsorge</h2>
                {splitInsuranceOffers(krebsvorsorgeLeistung)}
                <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mt-4">Homöopathie</h2>
                {splitInsuranceOffers(homöopathieLeistung)}
            </div>
        </div>
    );
}
