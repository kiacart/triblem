// const accessToken =
//   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsImp0aSI6ImQ2MTEwYzAxLWMwYjUtNDUzNy1iNDZhLTI0NTk5Mjc2YjY1NiIsImlhdCI6MTU5MjU2MDk2MCwiZXhwIjoxNTkyNTY0NjE5fQ.QgFSQtFaK_Ktauadttq1Is7f9w0SUtKcL8xCmkAvGLw" 

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const accessToken =
  `Bearer ${JSON.parse(localStorage.getItem("authUser"))?.access_token}` 

// const accessToken = () => {
//   const LoginProperties = createSelector(
//     (state) => state.Login,
//     (login) => ({
//       response: login
//     })
//   );

//   const {
//     response
//   } = useSelector(LoginProperties); 

//   return `Bearer ${response?.data?.access_token}`
// }

export default accessToken
