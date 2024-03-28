# Known Issues

Trying to log in with another user account without deleting device id will result in database error

TODO: Properly delete tokens on logout from the database, refactor auth controllers to properly handle the database search. Current selectors are no good.

After expiration of AccessToken the user profile won't fetch from the first attempt, resulting in Error 500:  "Invalid Refresh Token", which is just so weird because postman direct requests show no such error. 

TODO: Refactor this thing, probably add some loading screen or whatsoever