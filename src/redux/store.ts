import { createStore } from 'redux'
import LanguageState from './languageReducer'

const store = createStore(LanguageState);

export default store;