import React, { useState, createContext } from 'react';

export const UsuarioContexto = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({

    });

    return (
        <UsuarioContexto.Provider value={{ user, setUser }}>
            {children}
        </UsuarioContexto.Provider>
    );
};
