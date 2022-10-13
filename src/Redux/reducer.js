import { VALIDATE } from "./ActionType";

const initialState = {
    data:{}
};

const reducer = (state= initialState , action) =>{
    console.log(sessionStorage.getItem("data"));
    switch (action.type) {
        case VALIDATE:
            return {
              ...state,
              data: {...JSON.parse(sessionStorage.getItem("data"))}
            };
        default:
          return state;
      }
}
export default reducer;