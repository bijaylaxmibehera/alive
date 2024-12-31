const errorHandler = (error, req, res, next) => {
    console.log(error.stack)
    res.status(error.status || 500).json({
      success: false,
      message: error.message
    })
  }
  
  module.exports = errorHandler