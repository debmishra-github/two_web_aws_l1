import {NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
    const path = useLocation().pathname;

    return (
        <nav className="flex w-full h-[5rem] bg-white shadow-md p-4 font-bold">
            <div className="flex flex-row w-full items-center h-full justify-between">

                <div>
                    <a className="logo">
                        <img src="/TWO.png" alt="Logo" />
                    </a>
                </div>


                <div className="flex">
                    <NavLink
                        className={ path.split("/")[1] === "" ? "nav-link-active" : "nav-link"}
                        to={"/"}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        className={ path.split("/")[1] === "sites" ? "nav-link-active" : "nav-link"}
                        to="/sites"
                    >
                        Sites
                    </NavLink>

                    <NavLink
                        className={ path.split("/")[1] === "data" ? "nav-link-active" : "nav-link"}
                        to="/data"
                    >
                        Data
                    </NavLink>

                    <NavLink
                        className={path.split("/")[1] === "metadata" ? "nav-link-active" : "nav-link"}
                        to="/metadata"
                    >
                        Metadata
                    </NavLink>

                    <NavLink
                        className={ path.split("/")[1] === "people" ? "nav-link-active" : "nav-link"}
                        to="/people"
                    >
                        People
                    </NavLink>

                    <NavLink
                        className={ path.split("/")[1] === "resources" ? "nav-link-active" : "nav-link"}
                        to="/resources"
                    >
                        Resources
                    </NavLink>

                </div>


                {/* <div className="nav-links">
                    <Link to="/"> Home </Link>
                    <Link to="/sites"> Sites </Link>
                    <Link to="/data"> Data </Link>
                    <Link to="/metadata"> Metadata </Link>
                    <Link to="/people"> People </Link>
                    <Link to="/resources"> Resources </Link>
                </div> */}
            </div>
        </nav>
    );
}
