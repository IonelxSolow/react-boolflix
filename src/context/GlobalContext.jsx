import { createContext, useContext, useEffect, useState } from "react";
const GlobalContext = createContext();


export function GlobalContextProvider({children}) {
    return (
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
    )
    
}