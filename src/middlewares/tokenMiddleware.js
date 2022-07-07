import jwt from "jsonwebtoken"

export async function verifyToken(req, res, next) {
    const authorization = req.headers.authorization
    const token = authorization?.replace("Bearer ", "")
  
    if (!token) {
        res.status(401).send("Falha na autenticação, faça login e tente novamente")
        return 
    }

    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        res.locals.userId = tokenData.userId
    } catch {
        res.status(401).send("Falha na autenticação, faça login e tente novamente")
        return
    }
  
    next()
}