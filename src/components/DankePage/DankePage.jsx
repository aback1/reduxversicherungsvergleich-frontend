import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../../features/auth/authSlice.js";
import {useEffect, useState} from "react";

export default function DankePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const [logoutInitiated, setLogoutInitiated] = useState(false);

    useEffect(() => {
        if (logoutInitiated && !isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate, logoutInitiated]);

    const handleBackToLogin = () => {
        dispatch(logout());
        setLogoutInitiated(true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-6 rounded-lg shadow-lg">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Vielen Dank für Ihren Versicherungswechsel!</h2>
                <p className="text-gray-600 mb-4">
                    Die Vertragsdetails werden Ihnen per E-Mail zugesandt.
                </p>
                <p className="text-gray-600 mb-4">
                    Wir freuen uns, Sie als Kunden zu haben!
                </p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleBackToLogin}
                >
                    Zurück zur Startseite
                </button>
            </div>
        </div>
    );
}
