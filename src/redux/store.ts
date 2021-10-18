import { createStore } from 'redux'
import LanguageState from './language/languageReducer'

const store = createStore(LanguageState);

export type RootState = ReturnType<typeof store.getState>;

export default store;