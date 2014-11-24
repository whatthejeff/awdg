'use strict';
/**
 * AWDG
 *
 * @copyright Atlanta Web Design Group 2014
 *
 * Auth Middleware
 */

/**
 * Authenticated
 * Check to see if the visitor is authenticated
 */
exports.requiresLogin = function(req, res, next) {
    if (req.isAuthenticated()) return next()
    if (req.method == 'GET') req.session.returnTo = req.originalUrl;
    res.redirect('/login');
}

/*
 *  User authorization routing middleware
 */
// exports.user = {
//   hasAuthorization: function (req, res, next) {
//     if (req.profile.id != req.user.id) {
//       req.flash('info', 'You are not authorized')
//       return res.redirect('/users/' + req.profile.id)
//     }
//     next()
//   }
