import { MutableSnapshot } from 'recoil'

import User from 'lib/user'
import userState from './user'

export interface InitialState {
	user: User | null
}

const initializeState = (state: InitialState) => (
	snapshot: MutableSnapshot
) => {
	snapshot.set(userState, state.user)
}

export default initializeState
