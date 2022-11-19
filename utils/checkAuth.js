import jwt from "jsonwebtoken";

export const checkToken = async (req, res, next) => {
  const token = req.body.userid;

  if (!token) {
    res.json({ message: "You are not authenticated" });
  }
  await jwt.verify(token, process.env.JWTSECRET, (err, response) => {
    if (err) {
      res.send(err);
    }
    req.userid = response.id;
    next();
  });
};
