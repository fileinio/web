import { NextPageContext } from 'next'

import User from 'lib/user'
import fetch from 'lib/fetch'

const getUser = async ({ req }: NextPageContext) => {
	const cookie = req?.headers.cookie

	return fetch<User | null>('auth', {
		headers: cookie ? { cookie } : undefined
	})
}

export default getUser
