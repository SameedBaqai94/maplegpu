import { Link } from "react-router";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to={"/"}><h1 className="text-xl">MapleGpu</h1></Link>
            </div>
            <div className="flex-10">
                <ul className="menu menu-horizontal px-1">
                    <li> <Link to={"/"}>Home</Link></li>
                    <li><p>About</p></li>
                </ul>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">

                    <li> <Link to={"login"}>Login</Link></li>
                    <li> <Link to={"register"}>Register</Link></li>
                </ul>
            </div>
        </div>
    )
}