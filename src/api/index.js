import axios from "./config"

//导出登录接口
export const login = (username,password) => axios({
    url: "/users/login",
    method: "post",
    data: {
        username,
        password
    }
})

//导出登入日志
export const loginLog = () =>
axios.get('./getloginlog')