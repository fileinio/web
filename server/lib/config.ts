const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const region = process.env.AWS_REGION

if (!(accessKeyId && secretAccessKey && region))
	throw new Error('Missing AWS config')

export default { accessKeyId, secretAccessKey, region }
