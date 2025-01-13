import Greeter from "./Greeter.jsx";
import Logo from "./Logo.jsx";
import LogoutButton from "./LogoutButton.jsx";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-orange-700 p-4 text-white shadow-md">
      <div className="flex items-center">
          <Logo />
        <p className="ml-40 mr-40 text-3xl font-semibold">
          Jetzt Versicherung wechseln und bis zum 31.01. 30€ Cashback sichern!
        </p>

          <LogoutButton />

        <div className="mr-20"></div>
          <Greeter />
      </div>
    </header>
  );
}
