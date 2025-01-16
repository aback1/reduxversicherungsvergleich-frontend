import { useState } from "react";
import ProgressBar from "./ProgressBar";
import {
    setArbeitgeber,
    setFirstname,
    setLastname,
    setPhonenumber as setPhoneNumber,
    setEmail as setEmailAddress,
    setSeit24Angestellt,
    setArbeitgeberWechsel,
    setMehrAlsEinArbeitgeber
} from "../../features/insurancechange/insurancechangeSlice.js";
import { useDispatch } from "react-redux";
import VertragsAbschluss from "./VertragsAbschluss.jsx";
import { useSearchParams } from "react-router-dom";

export default function InsuranceChangeFormItem() {
    const dispatch = useDispatch();
    const [formStep, setFormStep] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const emailAddress = searchParams.get("emailAddress") || "";
    const firstName = searchParams.get("firstName") || "";
    const lastName = searchParams.get("lastName") || "";
    const phoneNumber = searchParams.get("phoneNumber") || "";
    const job = searchParams.get("job") || "";
    const jobChange = searchParams.get("jobChange") || "";
    const multipleJobs = searchParams.get("multipleJobs") || "";
    const employedSince24 = searchParams.get("employedSince24") || "";

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setArbeitgeber(job));
        dispatch(setEmailAddress(emailAddress));
        dispatch(setFirstname(firstName));
        dispatch(setLastname(lastName));
        dispatch(setPhoneNumber(phoneNumber));
        dispatch(setArbeitgeberWechsel(jobChange));
        dispatch(setMehrAlsEinArbeitgeber(multipleJobs));
        dispatch(setSeit24Angestellt(employedSince24));
        setFormStep((formStep) => formStep + 1);
    };

    const updateSearchParams = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(key, value);
        setSearchParams(newParams);
    };

    return (
        <>
            {formStep === 1 && (
                <>
                    <ProgressBar width={33} />
                    <form
                        className="max-w-4xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg"
                        onSubmit={handleSubmit}
                    >
                        <div className="relative z-0 w-full mb-8 group">
                            <input
                                type="email"
                                name="floating_email"
                                id="floating_email"
                                className="block py-3 px-4 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer autofill-bg"
                                placeholder=" "
                                required
                                onChange={(e) => updateSearchParams("emailAddress", e.target.value)}
                            />
                            <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 peer-focus:translate-y-[-2rem] peer-focus:translate-x-[0.5rem]"
                            >
                                Emailadresse
                            </label>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-8">
                            <div className="relative z-0 w-full mb-8 group">
                                <input
                                    type="text"
                                    name="floating_first_name"
                                    id="floating_first_name"
                                    className="block py-3 px-4 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer autofill-bg"
                                    placeholder=" "
                                    required
                                    onChange={(e) => updateSearchParams("firstName", e.target.value)}
                                />
                                <label
                                    htmlFor="floating_first_name"
                                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 peer-focus:translate-y-[-2rem] peer-focus:translate-x-[0.5rem]"
                                >
                                    First name
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-8 group">
                                <input
                                    type="text"
                                    name="floating_last_name"
                                    id="floating_last_name"
                                    className="block py-3 px-4 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer autofill-bg"
                                    placeholder=" "
                                    required
                                    onChange={(e) => updateSearchParams("lastName", e.target.value)}
                                />
                                <label
                                    htmlFor="floating_last_name"
                                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 peer-focus:translate-y-[-2rem] peer-focus:translate-x-[0.5rem]"
                                >
                                    Last name
                                </label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-8">
                            <div className="relative z-0 w-full mb-8 group">
                                <input
                                    type="tel"
                                    name="floating_phone"
                                    id="floating_phone"
                                    className="block py-3 px-4 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer autofill-bg"
                                    placeholder=" "
                                    onChange={(e) => updateSearchParams("phoneNumber", e.target.value)}
                                />
                                <label
                                    htmlFor="floating_phone"
                                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 peer-focus:translate-y-[-2rem] peer-focus:translate-x-[0.5rem]"
                                >
                                    Telefonnummer (optional)
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-8 group">
                                <input
                                    type="text"
                                    name="floating_company"
                                    id="floating_company"
                                    className="block py-3 px-4 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer autofill-bg"
                                    placeholder=" "
                                    required
                                    onChange={(e) => updateSearchParams("job", e.target.value)}
                                />
                                <label
                                    htmlFor="floating_company"
                                    className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 peer-focus:translate-y-[-2rem] peer-focus:translate-x-[0.5rem]"
                                >
                                    Arbeitgeber
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Weiter
                        </button>
                    </form>
                </>
            )}
            {formStep === 2 && (
                <>
                    <ProgressBar width={66} />
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                        <form
                            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl"
                            onSubmit={handleSubmit}
                        >
                            <fieldset>
                                <legend className="sr-only">Angaben Arbeitsverhältnis</legend>
                                <div className="mb-6">
                                    <h1 className="text-xl font-bold mb-4">
                                        Wechseln Sie bis zum 01.04.2025 ihren Arbeitgeber?
                                    </h1>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                id="jobChange-ja"
                                                type="radio"
                                                name="jobChange"
                                                value="ja"
                                                checked={jobChange === "ja"}
                                                onChange={() => updateSearchParams("jobChange", "ja")}
                                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="jobChange-ja"
                                                className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Ja
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="jobChange-nein"
                                                type="radio"
                                                name="jobChange"
                                                value="nein"
                                                checked={jobChange === "nein"}
                                                onChange={() => updateSearchParams("jobChange", "nein")}
                                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="jobChange-nein"
                                                className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Nein
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h1 className="text-xl font-bold mb-4">
                                        Sind Sie bei mehr als einem Arbeitgeber beschäftigt?
                                    </h1>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                id="multipleJobs-ja"
                                                type="radio"
                                                name="multipleJobs"
                                                value="ja"
                                                checked={multipleJobs === "ja"}
                                                onChange={() => updateSearchParams("multipleJobs", "ja")}
                                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="multipleJobs-ja"
                                                className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Ja
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="multipleJobs-nein"
                                                type="radio"
                                                name="multipleJobs"
                                                value="nein"
                                                checked={multipleJobs === "nein"}
                                                onChange={() => updateSearchParams("multipleJobs", "nein")}
                                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="multipleJobs-nein"
                                                className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Nein
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h1 className="text-xl font-bold mb-4">
                                        Haben Sie Ihre aktuelle Beschäftigung am 26.12.2024 oder
                                        später begonnen?
                                    </h1>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                id="employedSince24-ja"
                                                type="radio"
                                                name="employedSince24"
                                                value="ja"
                                                checked={employedSince24 === "ja"}
                                                onChange={() => updateSearchParams("employedSince24", "ja")}
                                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="employedSince24-ja"
                                                className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Ja
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="employedSince24-nein"
                                                type="radio"
                                                name="employedSince24"
                                                value="nein"
                                                checked={employedSince24 === "nein"}
                                                onChange={() => updateSearchParams("employedSince24", "nein")}
                                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="employedSince24-nein"
                                                className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Nein
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <button
                                type="submit"
                                className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Weiter
                            </button>
                        </form>
                    </div>
                </>
            )}
            {formStep === 3 && <VertragsAbschluss />}
        </>
    );
}
