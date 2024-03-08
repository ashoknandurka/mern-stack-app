
import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <Link to={"/"}>Home</Link>
        <Link to={"/create"}>Create Employee</Link>
      </nav>
    </div>
  );
}