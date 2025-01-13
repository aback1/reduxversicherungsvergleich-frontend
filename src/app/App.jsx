import InsuranceBoard from "../components/InsuranceBoard/InsuranceBoard.jsx";
import LoginForm from "../Components/Login/LoginForm";
import Header from "../Components/Header/Header";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import InsuranceForm from "../components/InsuranceForm/InsuranceForm.jsx";
import InsuranceChangeForm from "../components/InsuranceForm/InsuranceChangeForm.jsx";
import DankePage from "../components/DankePage/DankePage.jsx";

export default function App() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const insuranceDataCompleted = useSelector((state) => state.auth.insuranceDataComplete);
    const userWantsToChangeInsurance = useSelector((state) => state.insurancechange.userWantsToChangeInsurance);

    return (
        <Router>
            <div>
                {isLoggedIn && <Header />}
                <Routes>
                    <Route
                        path="/"
                        element={
                            isLoggedIn ? <Navigate to="/angaben" /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/login"
                        element={isLoggedIn ? <Navigate to="/angaben" /> : <LoginForm />}
                    />
                    <Route
                        path="/angaben"
                        element={
                            isLoggedIn ? (
                                insuranceDataCompleted ? (
                                    <Navigate to="/versicherungsangebot" />
                                ) : (
                                    <InsuranceForm />
                                )
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/versicherungsangebot"
                        element={
                            isLoggedIn && insuranceDataCompleted ? (
                                <InsuranceBoard />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/versicherungswechsel"
                        element={
                            userWantsToChangeInsurance ? (
                                <InsuranceChangeForm />
                            ) : (
                                <Navigate to="/angaben" />
                            )
                        }
                    />
                    <Route
                        path="/danke"
                        element={insuranceDataCompleted&&(<DankePage />)}
                    />
                </Routes>
            </div>
        </Router>
    );
}
