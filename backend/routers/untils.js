import jwt from "jsonwebtoken";
export const generateToken = user => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    },
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET || "acan",
    {
      expiresIn: "30d"
    }
  );
};
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // 7 is bearer
    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.JWT_SECRET || "acan", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "invalid token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "no Token" });
  }
};
