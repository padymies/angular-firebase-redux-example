import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export const setUser = createAction('[AUTH Component] setUser', props<{ user: User }>());
export const unSetUser = createAction('[AUTH Component] unSetUser');