const error = {
    code: "",
    message: "",
    fields: {},
    status: 400
}

const unexpectedError = {...error, code: "0-000", message: "Unexpected error ocurred", status: 500}
const genericError = {...error, code: "0-001", message: "Ups something went wrong"}
const duplicatedValueError = {...error, code: "1-000", message: "Duplicated field values"}
const nullOrEmptyValueError = {...error, code: "1-001", message: "Null or empty field value"}
const invalidValueError = {...error, code: "1-002", message: "Invalid field value"}
const notFoundError = {...error, code: "1-100", message: "Not found"}
const invalidUsernameOrPasswordError = {...error, code: "2-000", message: "Invalid username or password"}
const sessionExpiredError = {...error, code: "2-001", message: "Your session has expired", status: 401}
const invalidTokenError = {...error, code: "2-002", message: "Invalid token", status: 401}
const notLoggedIn = {...error, code: "2-003", message: "User not logged in", status: 401}

const errors = {
    unexpectedError,
    genericError,
    duplicatedValueError,
    nullOrEmptyValueError,
    invalidValueError,
    notFoundError,
    invalidUsernameOrPasswordError,
    sessionExpiredError,
    invalidTokenError,
    notLoggedIn
}

module.exports = errors
