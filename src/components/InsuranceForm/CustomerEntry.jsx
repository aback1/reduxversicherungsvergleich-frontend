import {useState} from "react";


export default function CustomerEntry({entry, onChange, text}) {
    const [isEditable, setIsEditable] = useState(false);

    const handleEditToggle = () => {
        setIsEditable((prevState) => !prevState);
    };


    return (
        <div className="flex items-center">
            <p className="text-lg font-bold">{text}</p>
            {isEditable ? (
                <input
                    type="text"
                    value={entry}
                    onChange={onChange}
                    className="text-lg ml-2 border border-gray-300 rounded p-1"
                />
            ) : (
                <p className="text-lg ml-2">{entry}</p>
            )}
            <button className="ml-auto" onClick={handleEditToggle}>
                <svg
                    className="h-6 w-6 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 102.828 2.828L11.828 15H18a2 2 0 002-2v-5.172z"
                    />
                </svg>
            </button>
        </div>
    );
}