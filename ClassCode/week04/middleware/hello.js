const hello = (req, res, next) => {
  console.log("hello");
  next();
};

module.exports = { hello };
//exports hello function as a module to be used later
