# Test

many test framework as

-   Jasmine
-   mocha
-   jest (based on jasmine to test react apps)

if you know jasmine, you know jest

we change this
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
with this
"test": "jest --watchAll"

then the conventional names are read in the folder tests '<filename>.test.js'

1. Unit tests

we create functions for every possible input and return value
as in lib.test.js

1.1 Mock functions
we recreate the provided data from an external source
const mockFunction = jest.fn();
// mockFunction.mockReturnValue(1);
// mockFunction.mockResolvedValue(1);
mockFunction.mockRejectedValue(new Error(".."));
const result = await mockFunction();
