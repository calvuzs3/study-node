# Authentication

Let's go on with the important part of Authorization

-   how to store an encrypted password
-   how to pass a JWT Java Web Tocken

# Autorization

Let's handle some autorizations

NOTE: A utility library for javascript is Lodash
// npm i lodash
// it has been used in the users.js

# First of all _bcrypt_

When we create a token, in the payload we insert the values we need
But, when this for some reasons have to be changed, we must change in every
place we used it..
so..

# Generate token

const token = jwt.sign({ \_id: user.\_id }, config.get("jwtPrivateKey"));

how to do this?

We remembre: Information Expert Principle
we need a method in the user module, to encapsulate all properties of a user ( and methods)

//
Then we need some logic in the auth process
First: the genres module. Get the token and verify the user,
then insert the user data in the req.body
This is a piece of middleware.. so let's create a folder named middleware
and insert a file into it, module.exorts = f()

// Protecting the routes
Not all the routes need to be protected
router.post("/", auth, async (req, res) => {
let's insert this middleware ...in the middle :)
--> PERFECT

# Now Get the user

let's add the .get() to this user http endpoint..
// router.get("/:id", async (req, res) => {
this is not good. for security reasons we should not provide user iinfos
in the url..
router.get("/me", auth, async (req, res) => {
// At this point we have a user in the req
const user = await User.findById(req.user.\_id).select("-password");
res.send(user);
});

# Loggin Out

The logic must be implemented in the client side..
When a user wants to logout, simply remove the token.

Storing the token in the db is a risk, someone could do actions
in the place of others..

So store them on the client, and, as a best practice, use ssl to send
the token to the server (https)

# Authorization

we add a role or a property in the payload of the user token
so if the property is set, or the role is set, we can choose
the permissions over certain operations
simply adding a middleware
let's do a simple admin check..

add a file admin.js in middleware, and add it to the operation delete
of a genre..

In doing this we add a property in the user.js wich is isAdmin.
