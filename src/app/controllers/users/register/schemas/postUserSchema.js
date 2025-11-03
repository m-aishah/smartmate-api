const yup = require("yup");
const selectUserByEmail = require("./queries/selectUserById");

const postUserSchema = yup.object().shape({
  firstName: yup
    .string()
    .required()
    .label("First Name")
    .typeError("First Name must be a number."),
  lastName: yup
    .string()
    .required()
    .label("Last Name")
    .typeError("Last Name must be a number."),
  password: yup
    .string()
    .min(8)
    .required()
    .label("password")
    .typeError("password must be a number."),
  userTypeId: yup
    .number()
    .label("User Type ID")
    .typeError("User Type Id must be a number."),
  email: yup
    .string()
    .email()
    .required()
    .label("Email")
    .typeError("Email is invalid.")
    .test(
      "doesEmailExist",
      "An account already exists with this email.",
      function test(email) {
        return selectUserByEmail({ email }).then(account => {
          if (account) {
            return false;
          }
          return true;
        });
      }
    )
});
module.exports = postUserSchema;
