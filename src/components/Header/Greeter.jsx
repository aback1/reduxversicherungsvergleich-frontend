import { useSelector } from "react-redux";

export default function Greeter() {
    const currentUserID = useSelector((state) => state.auth.currentUser || null);

    const users = useSelector((state) => state.auth.users || []);

    const currentUserName = users.find((current) => current.id === currentUserID);

    return <h2 className="text-xl font-semibold text-white-900 ">Hallo {currentUserName.name}</h2>;
}
