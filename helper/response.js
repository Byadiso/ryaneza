const server = (res, status, message, data) =>
    res.status(status).send({ status, message, data })

export default server
