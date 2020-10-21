<template>
  <div class="Login">
    <video
      src="../../../../千峰login.mp4"
      autoplay="autoplay"
      muted="muted"
      loop="loop"
    ></video>
    <!-- 展示组件 -->
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-loginForm"
    >
      <h1>千峰管理系统</h1>
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="年龄" prop="age">
        <el-input v-model.number="loginForm.age"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')"
          >提交</el-button
        >
        <!-- <el-button @click="resetForm('loginForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//引入login.js文件
import { login } from "@/api";
import {mapMutations} from "vuex"
console.log(login);
export default {
  //登入逻辑实现
  //1.收集用户输入的username和password传递给后端
  data() {
    var validateUsername = (rule, value, callback) => {
      //jsDoc的注释方式
      //@param {object} rule一个表单验证对象
      //@param {string} value 输入框中的输入值
      console.log(rule);
      console.log(value);
      // 用户名正则：4-16位（字母，下划线，数字，-）
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
      if (!value) {
        callback("4-16位（字母，下划线，数字，-）");
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
        // age: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
        // age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(['SET_USERINFO']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //代表本地校验通过
          //收集用户输入的username和password
          //调用login方法,发送登入请求
          //打开登录加载动画
          const loading = this.$loading({
            lock: true,
            text: "Loading...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          let { username, password } = this.loginForm;
          login(username, password)
            .then(res => {
              //服务器响应登录，关掉登陆框
              loading.close()
              if (res.data.state) {
                //用户名密码正确
                //将token和用户信息存到localStorage
                localStorage.setItem("stu-token", res.data.token);
                localStorage.setItem("stu-userInfo", JSON.stringify(res.data.userInfo));

                //更改vuex中state['userInfo']的值
                this.SET_USERINFO(res.data.userInfo)
                this.$router.push("/home")
                this.$message.success("登录成功")
              } else {
                //用户名或密码错误
                this.$message.error("用户名或密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.login {
  /* position: relative; */
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: block;
}
/* 表单样式 */
.el-form {
  /* z-index: 99; */
  position: absolute;
  top: 50px;
  left: 50px;
  width: 400px;
  height: 520px;
  border: 1px solid #ccc;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 11px;
}
h1 {
  color: white;
  margin-left: 100px;
  margin-top: 120px;
  margin-bottom: 60px;
}
.el-button {
  width: 240px;
  background: linear-gradient(90deg, blue, skyblue);
}
video {
  /* width: 100%; 
    height: 100%; */
  position: fixed;
  right: 0;
  bottom: 0;
}
</style>
