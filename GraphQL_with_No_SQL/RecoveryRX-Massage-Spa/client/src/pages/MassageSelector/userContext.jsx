import React, { useState, useEffect, useContext } from "react";

const UserPreferenceContext = React.createContext();

export const useUserPreferenceContext = () => useContext(UserPreferenceContext)

export const UserPreferenceProvider = ({ children })=>{
    
    const userPreference = {
        clientName: "",
        experience: "", 
        massageType: "",   
        intensity: "",     
        lookingFor: "",    
        wheresYourPain: "" 
    };


    return (
        <UserPreferenceContext.Provider value={{userPreference}}>
        {children}
        </UserPreferenceContext.Provider>
    )
}

// create reducers and actions