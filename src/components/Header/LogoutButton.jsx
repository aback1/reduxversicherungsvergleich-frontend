import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn || false);

    function handleLogout() {
        dispatch(logout());
        navigate("/login");
    }

    return isLoggedIn ? (
        <button
            className="bg-blue-400 text-white p-2 rounded hover:bg-blue-200"
            onClick={handleLogout}
        >
            Logout
        </button>
    ) : null;
}
