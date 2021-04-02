export interface PublicUser {
	name: string
	email: string
}

export default interface User extends PublicUser {
	password: string
}

export const toPublicUser = (user: User): PublicUser => ({
	name: user.name,
	email: user.email
})
