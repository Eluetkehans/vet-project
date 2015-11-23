module.exports = exports = function(err, res) {
  // Log out the error so we can see what went wrong, but give a very
  // vague response to user to prevent manipulation from hackers.
  console.log(err);
  res.send(500, "Server Error: Its not you, its us.");
};