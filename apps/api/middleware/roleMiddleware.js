
exports.adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access Denied",
    });
  }

  next();
};


exports.editorOrAdmin = (req, res, next) => {
  if (
    req.user.role === "admin" ||
    req.user.role === "editor"
  ) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access Denied",
  });
};