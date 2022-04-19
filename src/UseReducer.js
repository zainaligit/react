const initialState = localStorage.getItem('token');

const reducer = (state, action) => {
    if (action.type === "USER") {
        return action.payload;
    }
    return state;
}
export { initialState, reducer };