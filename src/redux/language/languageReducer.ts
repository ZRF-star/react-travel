import i18n from 'i18next';
import {CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionsType } from './languageActions'

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

export default (state = defaultState, action:LanguageActionsType) => {
    let newState;
    switch(action.type) {
        case CHANGE_LANGUAGE:
            i18n.changeLanguage(action.payload);
           newState = {...state, language:action.payload};
            return newState;
        case ADD_LANGUAGE:
            newState = {
                ...state, 
                languageList: [...state.languageList,  action.payload] 
            };
            return newState;
        default:
            return state;
    }
}