//引入中断请求
import axios,{ CancelToken } from "./config"

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
//_this object 是一个组件实例
export const getloginLog = (_this) =>
axios.get('./getloginlog',{
    CancelToken:new CancelToken(function(c){
        //c就是一个方法，可以终止请求
        _this.cancel = c
    })
})

//获取用户菜单
export const getMenuList = () => axios.get("/permission/getMenuList")

//获取验证码
export const getCaptcha = () => axios.get("/users/getCaptcha")

//刷新验证码
// export const refreshCaptcha = () => axios.get("/users/refreshCaptcha")

//校验验证码
export const verifyCaptcha = (captcha) => axios.get(`/users/verifyCaptcha?captcha=${captcha}`)