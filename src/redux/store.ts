import { createStore } from 'redux'
import LanguageState from './language/languageReducer'

const store = createStore(LanguageState);

export default store;