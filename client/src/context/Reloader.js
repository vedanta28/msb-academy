// importing react hooks
import {createContext, useReducer} from 'react';

// defining reducer
const Reloader = (state,{type}) => {
    switch(type){
        case "RELOAD":
            return {
                reload: !state.reload
            }
        default:
            return state;
    }
};

// initial state
const INITIAL_STATE = {
    reload: 0
};

// creating context
export const ReloaderContext = createContext(INITIAL_STATE);

// creating provider
export const ReloaderContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(Reloader,INITIAL_STATE);

    return (
        <ReloaderContext.Provider value={{
            reload: state.reload,
            dispatch
        }}>
            {children}
        </ReloaderContext.Provider>
    );
};
