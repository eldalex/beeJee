const initialState = {
    counter: 0,
    todolist: [],
    currentPage:0,
    sortedBy:"idup",
    currentUser:"Guest",
    username:'',
    password:'',
    encodedAuth:'',
    emailIsValid:true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SETTODOLIST":
            return {
                ...state,
                todolist: action.payload
            }
        case "SETCURRENTUSER":
            return {
                ...state,
                currentUser: action.payload
            }
        case "SETUSERNAME":
            return {
                ...state,
                username: action.payload
            }
        case "SETPASSWORD":
            return {
                ...state,
                password: action.payload
            }
        case "SETENCODEAUTH":
            return {
                ...state,
                encodedAuth: action.payload
            }
        case "SETEMAILISVALID":
            return {
                ...state,
                emailIsValid: action.payload
            }
        default:
            return state;
    }
}

export default reducer;