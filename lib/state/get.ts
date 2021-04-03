import { NextPageContext } from 'next'

import getUser from '../user/get'
import { InitialState } from 'state'

const getInitialState = async (
	context: NextPageContext
): Promise<InitialState> => {
	try {
		return { user: await getUser(context) }
	} catch {
		return { user: null }
	}
}

export default getInitialState
