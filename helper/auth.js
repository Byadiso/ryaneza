import jwt from 'jwt-simple'
import moment from 'moment'
import dotenv from 'dotenv'
import server from './response'
dotenv.config()

const encodeToken = user => {
    const payload = {
        expiration: moment()
            .add(2, 'hour')
            .unix(),
        iat: moment().unix(),
        sub: user,
            }
    const token = jwt.encode(payload, process.env.SECRET_KEY)
        return token
}

const decodeToken = token => {
    const decoded = jwt.decode(token, process.env.SECRET_KEY)
    return decoded
}
// Access token required for a user
const UseraccessRequired = (req, res, next) => {
    const {
        token
    } = req.headers
    if (!token) {
        return server(res, 400, 'Token is needed to get access ')
    }
    const now = moment().unix()
    const decodedToken = decodeToken(token)
    if (now > decodedToken.expiration) {
        res.status(400).send({
            error: 'Oops, Your Token is  expired'
        })
    } else {
        req.body.userId = decodedToken.sub.userId
        req.body.isadmin = decodedToken.sub.isadmin
        if (decodedToken.sub.status == 'login') {
            next()
        } else {
            return server(
                res,
                403,
                'Not authorized , you must be login before accessing to your  page'
            )
        }
    }
}

export default {
    UseraccessRequired,
    encodeToken
}