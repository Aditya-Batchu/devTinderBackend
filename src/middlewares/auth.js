const adminAuth = (req, res, next) => {
  console.log("Admin auth is checking");
  const token = "xyz";
  const isAuthorised = token === "xyz";

  if (!isAuthorised) {
    res.status(401).send("Unauthorised");
  }
  next();
};

const userAuth = (req, res, next) => {
  console.log("user auth is checking");
  const token = "xyz";
  const isAuthorised = token === "xyz";

  if (!isAuthorised) {
    res.status(401).send("Unauthorised");
  }
  next();
};

module.exports = {
  adminAuth,
  userAuth,
}