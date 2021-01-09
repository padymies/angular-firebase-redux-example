import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';
import * as authActions from '../actions';

export interface AuthState {
    user: User; 
}

export const authState: AuthState = {
   user: null,
}

const _authReducer = createReducer(authState,

    on(authActions.setUser, (state, { user }) => ({ ...state, user: user })),
    on(authActions.unSetUser, state => ({ ...state, user: null })),

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}