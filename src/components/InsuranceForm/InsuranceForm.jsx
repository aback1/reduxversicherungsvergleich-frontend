import { useSelector, useDispatch } from "react-redux";
import { setInsuranceDataComplete, setbruttoAnnualPay, setJob, setAktuelleKrankenversicherung } from "../../features/auth/authSlice.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import '../../index.css';
import background from "../../assets/background.png";
import { useSearchParams } from "react-router-dom";

export default function InsuranceForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const insuranceDataComplete = useSelector(
      (state) => state.auth.insuranceDataComplete,
  );

  //useState ersetzt durch UseSearchParams
  const aktuelleVersicherung = searchParams.get("aktuelleVersicherung") || "Core Care";
  const jahresBrutto = searchParams.get("jahresBrutto") || "";
  const arbeitsverhältnis = searchParams.get("arbeitsverhältnis") || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setbruttoAnnualPay(jahresBrutto));
    dispatch(setJob(arbeitsverhältnis));
    dispatch(setAktuelleKrankenversicherung(aktuelleVersicherung));
    dispatch(setInsuranceDataComplete(true));
  };

  const updateSearchParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return (
      <>
        {!insuranceDataComplete && (
            <div
                className="flex items-center justify-center min-h-screen bg-cover bg-center"
                style={{
                  backgroundImage: `url(${background})`,
                }}
            >
              <div className="bg-orange-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Ihre Angaben</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-white mb-2">Aktuelle Krankenversicherung</label>
                    <div className="flex items-center">
                      <select
                          className="w-full p-2 border border-gray-300 rounded text-gray-800"
                          value={aktuelleVersicherung}
                          onChange={(e) => updateSearchParams("aktuelleVersicherung", e.target.value)}
                      >
                        <option value="Core Care">Core Care</option>
                        <option value="Lorem Ipsum">Lorem Ipsum</option>
                        <option value="Health Life">Health Life</option>
                        <option value="Guardian Care">Guardian Care</option>
                      </select>
                      <div className="ml-2 tooltip">
                        <FontAwesomeIcon icon={faQuestionCircle} className="text-white" />
                        <span className="tooltiptext">Wählen Sie Ihre aktuelle Krankenversicherung aus.</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-white mb-2">Jährliches Bruttogehalt</label>
                    <div className="flex items-center">
                      <input
                          type="number"
                          placeholder="Bitte geben Sie ihren Jahresbrutto Verdienst an."
                          className="w-full p-2 border border-gray-300 rounded text-gray-800"
                          value={jahresBrutto}
                          onChange={(e) => updateSearchParams("jahresBrutto", e.target.value)}
                      />
                      <div className="ml-2 tooltip">
                        <FontAwesomeIcon icon={faQuestionCircle} className="text-white" />
                        <span className="tooltiptext">Geben Sie Ihr jährliches Bruttogehalt an. Wenn Sie es nicht kennen, schätzen Sie es bitte.</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-white mb-2">Arbeitsverhältnis</label>
                    <div className="flex items-center">
                      <select
                          className="w-full p-2 border border-gray-300 rounded text-gray-800"
                          value={arbeitsverhältnis}
                          onChange={(e) => updateSearchParams("arbeitsverhältnis", e.target.value)}
                      >
                        <option value="schüler">Schüler</option>
                        <option value="arbeitnehmer">Arbeitnehmer</option>
                        <option value="selbstständig">Selbstständig</option>
                        <option value="rentner">Rentner</option>
                      </select>
                      <div className="ml-2 tooltip">
                        <FontAwesomeIcon icon={faQuestionCircle} className="text-white" />
                        <span className="tooltiptext">Wählen Sie Ihr Arbeitsverhältnis aus.</span>
                      </div>
                    </div>
                  </div>
                  <button
                      type="submit"
                      className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 mb-4"
                  >
                    Weiter
                  </button>
                </form>
              </div>
            </div>
        )}
      </>
  );
}
