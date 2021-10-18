export interface LanguageState {
    language:"en" | "zh",
    languageList:{name:string, code:string}[]
}

const defaultState:LanguageState = {
    language:'zh',
    languageList:[
        {name:"中文", code:"zh"},
        {name:"English", code:"en"},
    ]
};

export default (state = defaultState, action) => {
    let newState;
    switch(action.type) {
        case "change_language":
           newState = {...state, language:action.payload};
            return newState;
        case "add_language":
            newState = {
                ...state, 
                languageList: [...state.languageList,  action.payload] 
            };
            return newState;
        default:
            return state;
    }
}