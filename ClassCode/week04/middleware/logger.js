// moving logger into its own function
const logger = (req, res, next) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  console.log(`[${formattedDate}] ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = { logger };
//logger is exported as a module
//this means that it can be imported into other files to be used as middleware