// importing react hooks
import {createContext,useEffect,useReducer} from 'react';

// importing reducer
import UserReducer from './UserReducer';

// initial state
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
};

// creating context
export const UserContext = createContext(INITIAL_STATE);

console.log(UserContext);

// creating provider
export const UserContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(UserReducer,INITIAL_STATE);

    // whenever user changes, update local storage
    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(state.user));
    },[state.user]);

    return (
        <UserContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}
        </UserContext.Provider>
    );
};
