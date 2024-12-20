const initialState = {
    data: [],
    loading: false,
    error: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NOTES/REQUEST/PENDING":
            return {
                ...state,
                loading: true,
                error: null
            }
        case "NOTES/REQUEST/FULFILLED":
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload
            }
        case "NOTES/DELETE/FULFILLED":
            return {
                ...state,
                loading: false,
                error: null
            }
        case "NOTES/REQUEST/REJECTED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}