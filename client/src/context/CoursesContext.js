// importing react hooks
import {createContext,useEffect,useReducer} from 'react';

// importing reducer
import CoursesReducer from './CoursesReducer';

// initial state
const INITIAL_STATE = {
    courses: JSON.parse(localStorage.getItem("courses")) || [],
    isFetching: false,
    error: false
};

// creating context
export const CoursesContext = createContext(INITIAL_STATE);

// creating provider
export const CoursesContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(CoursesReducer,INITIAL_STATE);

    // whenever user changes, update local storage
    useEffect(() => {
        localStorage.setItem("courses",JSON.stringify(state.courses));
    },[state.courses]);

    return (
        <CoursesContext.Provider value={{
            courses: state.courses,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}
        </CoursesContext.Provider>
    );
};
