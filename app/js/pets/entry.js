module.exports = function(app) {
  // This again is more for organization if we were to expand the app.
  // We would load additional controllers for this feature here.
  require('./pets_controller')(app);
};