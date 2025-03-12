"use client"
import React,{useState,useContext,createContext} from 'react'
const UpdateContext = createContext<{
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
  } | undefined>(undefined);

export const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    return <UpdateContext.Provider value={{token,setToken}}>
        {children}
    </UpdateContext.Provider>

}
export const useUpdate = () => {
    const context = useContext(UpdateContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};