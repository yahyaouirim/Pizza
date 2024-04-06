import {  createContext, useState } from "react";
export const UserPContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        password: "",
        confirmPassword: "",
    });
    return(
        <UserPContext.Provider value={{user, setUser}}>
            {children}
        </UserPContext.Provider>
    )
}