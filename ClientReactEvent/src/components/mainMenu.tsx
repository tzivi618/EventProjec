import { NavLink, Outlet } from "react-router-dom";

export const MainMenuComponent = () => {
    console.log("MainMenu");
    
    return (
        <div>
            <NavLink to="/">בית</NavLink><br />
            <NavLink to="/producer">מפיקים</NavLink><br />
            <NavLink to="/users">משתמשים</NavLink>
            <Outlet /> {/* ודא שיש כאן Outlet */}
        </div>
    );
};
