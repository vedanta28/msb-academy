const CoursesReducer = (state,action) => {
    switch(action.type){
        case "LOAD_START": 
            return {
                courses: null,
                isFetching: true,
                error: false
            }
        case "LOAD_SUCCESS": 
            return {
                courses: action.payload,
                isFetching: false,
                error: false
            }
        case "LOAD_FAILURE": 
            return {
                courses: null,
                isFetching: false,
                error: true
            }
        case "UPDATE_START": 
            return {
                ...state,
                isFetching: true
            }
        case "UPDATE_SUCCESS": 
            return {
                courses: action.payload,
                isFetching: false,
                error: false
            }
        case "UPDATE_FAILURE": 
            return {
                courses: state.user,
                isFetching: false,
                error: true
            }
        default:
            return state;
    }
};
export default CoursesReducer;