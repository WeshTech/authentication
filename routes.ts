// these routes do not requre a user to logged in the system

export const publicRoutes = [
    "/"
]

// these are the routes that are used for authentication
/**
 * these are an array of routes that are used for authentication
 * these routes will redirect logged in users to /settings
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
]

/**
 * prefix for api authentication routees
 * routes that start with prefix are used for API
 */

export const apiAuthPrefix = "/api/auth"

/**
 * this is the path where users are redirected after loging in
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings"