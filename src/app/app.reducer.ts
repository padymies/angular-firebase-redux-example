import { ActionReducerMap } from '@ngrx/store';
import * as reducer  from './store/reducers';


export interface AppState {
   user: reducer.AuthState,
   ui: reducer.UiState
}

export const appReducers: ActionReducerMap<AppState> = {
   user: reducer.authReducer,
   ui: reducer.uiReducer
}