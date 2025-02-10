<template>
  <div id="login">
    <particles-bg type="polygon" :bg="true" color="#3ea9ee" />
    <div class="loginFrom" v-show="show == 1">
      <div class="head">
        管理员登录
      </div>
      <div class="body">
        <div class="space"></div>
        <div class="space"></div>
        <el-input
            placeholder="请输入用户名"
            v-model="loginFrom.username"
            prefix-icon="el-icon-user"
            clearable>
        </el-input>
        <div class="space"></div>
        <div class="space"></div>
        <el-input
            placeholder="请输入密码"
            v-model="loginFrom.password"
            prefix-icon="el-icon-lock"
            show-password>
        </el-input>
        <div class="space"></div>
        <div class="space"></div>
        <div class="captcha">
          <div class="captcha-left" @keyup.enter="sendLogin">
            <el-input
                placeholder="请输入右边验证码"
                v-model="loginFrom.captcha"
                prefix-icon="el-icon-s-grid">
            </el-input>
          </div>
          <div class="captcha-right" title="看不清楚？换一张" @click="changeImgCode">
            <img :src="imgCode" alt="图片验证码">
          </div>
        </div>
      </div>
      <div class="foot">
        <el-button type="primary" size="medium" @click="sendLogin">登录</el-button>

      </div>
    </div>
  </div>
</template>

<script>
import {getCaptchaCode, getEmailCode, register, login} from 'network/login';
import {
  image_code_url, SESSION_TOKEN_KEY, SESSION_NICKNAME_KEY, SESSION_AVATAR_KEY,
  SESSION_AUTHORID_KEY
} from "../../common/common_variable";
import {checkEmail, randomCode} from "common/commonUtils";
import sha1 from "common/sha1";
import {setCookie, setCookieAuthorId, setCookieAvatarPath, setCookieNickName} from "common/cookieUtils";
import { ParticlesBg } from "particles-bg-vue";

export default {
  name: "AdminLogin",
  components: {
    ParticlesBg
  },
  data() {
    return {
      loginFrom: {
        username: '',
        password: '',
        captcha: ''     //验证码
      },
      register: {
        username: '',
        password: '',
        password2: '',
        role: '',
        captcha: ''     //验证码
      },
      show: 1,
      imgCode: '',
      codeString: '' //临时存储图片验证码
    }
  },
  created() {
    this.changeImgCode();
  },
  methods: {
    changeImgCode() {
      this.codeString = randomCode(5);
      this.imgCode = image_code_url + "?codeString=" + this.codeString;
    },
    getEmailCaptcha() {
      let isEmail = checkEmail(this.register.email);
      if (!isEmail) {
        this.$notify({
          title: '警告',
          message: '请输入合法的邮箱',
          type: 'warning'
        });
      }
      getEmailCode(this.register.email).then(res => {
        if (res.status == 2000) {
          this.$notify({
            title: '成功',
            message: res.data,
            type: 'success'
          });
        } else if (res.status == 400) {
          this.$notify.error({
            title: '错误',
            message: res.msg
          });
        } else if (res.status == 5003) {
          this.$notify.error({
            title: '错误',
            message: res.msg + res.data
          });
        }
      })
    },

    sendRegister() {
      // 数据校验
      this.register.username = this.register.username.trim();
      let unCodePassword = this.register.password.trim();
      if ('' === this.register.username) {
        this.$notify.error({
          title: '错误',
          message: '用户名不能为空'
        });
        return;
      }
      if ('' === unCodePassword) {
        this.$notify.error({
          title: '错误',
          message: '密码不能为空'
        });
        return;
      }
      if (this.register.password2 !== unCodePassword) {
        this.$notify.error({
          title: '错误',
          message: '两次密码不一致'
        });
        return;
      }
      if ('' === this.register.role) {
        this.$notify.error({
          title: '错误',
          message: '请选择角色'
        });
        return;
      }
      // 验证图片验证码
      if (this.codeString !== this.register.captcha) {
        this.$notify.error({
          title: '错误',
          message: '验证码错误,请重新填写'
        });
        this.register.captcha = '';
        this.changeImgCode();
        return;
      }

      // 为密码加密
      let encodePassword = sha1.sha1(unCodePassword);
      this.register.password = encodePassword;

      register(this.register).then(res => {
        if (res.status == 2000) {
          this.$notify({
            title: '成功',
            message: res.msg,
            type: 'success'
          });
          // 清除掉数据
          this.register = {
            username: '',
            password: '',
            role: '',
            captcha: ''
          },
              this.show = 1;

        } else if (res.status == 4000) {
          this.$notify.error({
            title: '错误',
            message: res.msg
          });
        } else {
          this.$notify.error({
            title: '错误',
            message: res.msg
          });
        }
      })
    },
    sendLogin() {
      // 数据校验
      this.loginFrom.username = this.loginFrom.username.trim();
      let unCodePassword = this.loginFrom.password.trim();
      if ('' === this.loginFrom.username) {
        this.$notify.error({
          title: '错误',
          message: '用户名不能为空'
        });
        return;
      }
      if ('' === unCodePassword) {
        this.$notify.error({
          title: '错误',
          message: '密码不能为空'
        });
        return;
      }

      if ('' === this.loginFrom.captcha) {
        this.$notify.error({
          title: '错误',
          message: '验证码不能为空'
        });
        return;
      }
      // 验证图片验证码
      if (this.codeString !== this.loginFrom.captcha) {
        this.$notify.error({
          title: '错误',
          message: '验证码错误,请重新填写'
        });
        this.loginFrom.captcha = '';
        this.changeImgCode();
        return;
      }

      // 为密码加密
      let encodePassword = sha1.sha1(unCodePassword);
      this.loginFrom.password = encodePassword;

      login(this.loginFrom).then(res => {
        // console.log(res);
        if (res.status == 2000) {
          sessionStorage.setItem('Authorization', res.data.token);
          sessionStorage.setItem('authorId', res.data.authorId);
          sessionStorage.setItem(SESSION_NICKNAME_KEY, res.data.nickName);
          sessionStorage.setItem(SESSION_AVATAR_KEY, res.data.avatarPath);
          let info = {
            authorId: res.data.authorId,
            nickName: res.data.nickName,
            avatarPath: res.data.avatarPath,
            role: res.data.role,
            token: res.data.token
          }
          this.$store.commit('set', info);
          this.$store.commit('checkLogin', true);
          setCookie(res.data.token);//设置Cookie
          setCookieAuthorId(res.data.authorId);
          setCookieNickName(res.data.nickName);
          setCookieAvatarPath(res.data.avatarPath);
          if(res.data.role=='1'){
            this.$router.push("/adminIndex");
          }else{             
            this.$notify.error({
            title: '登陆失败'
            });
             this.loginFrom.username = '';
             this.loginFrom.passwrod = '';
            }         
        } else if (res.status == 4000) {
          this.$notify.error({
            title: '错误',
            message: res.msg
          });
          this.loginFrom.password = '';
          this.changeImgCode();
        } else {
          this.$notify.error({
            title: '错误',
            message: res.msg
          });
          this.loginFrom.password = '';
          this.changeImgCode();
        }
      })

    },
  }
}
</script>

<style scoped>
#login {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
  background-size: 100%;
}

.loginFrom {
  height: 340px;
  width: 350px;
  border: 1px solid #fe767b;
  background-color: #fff;
  position: absolute;
  top: calc(50vh - 170px);
  left: calc(50vw - 175px);
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.head {
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: #fe767b;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #fe767b;
}

.body {
  height: 210px;
  /*border-top: 1px solid #000000;*/
  /*border-bottom: 1px solid #000000;*/
  padding: 10px;
}

.foot {
  padding-top: 10px;
  text-align: center;
}

.foot-text {

}

.foot-text-left {
  padding-left: 10px;
  padding-right: 10px;
  display: inline;
  float: left;
  cursor: pointer;
}

.foot-text-left:hover {
  color: #fe767b;
}

.foot-text-right {
  padding-right: 10px;
  display: inline;
  float: right;
  cursor: pointer;
}

.foot-text-right:hover {
  color: #fe767b;
}

.foot .el-button {
  margin: 0px auto;
  width: 328px;
}

.space {
  height: 10px;
}

.captcha {
  display: inline;
}

.captcha-left {
  display: inline;
  width: 50%;
  float: left;
}

.captcha-right {
  display: inline;
  width: 50%;
  float: right;
  cursor: pointer;
}

/*  注册  */

.register {
  height: 480px;
  width: 350px;
  border: 1px solid #fe767b;
  background-color: #fff;
  position: absolute;
  top: calc(50vh - 240px);
  left: calc(50vw - 175px);
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.register .body {
  height: 340px;
  /*border-top: 1px solid #000000;*/
  /*border-bottom: 1px solid #000000;*/
  padding: 10px;
}

.captcha-right .el-button {
  width: 100%;
  height: 40px;
}

/*  忘记密码   */

.forgetPassword {
  height: 400px;
  width: 350px;
  border: 1px solid #fe767b;
  background-color: #fff;
  position: absolute;
  top: calc(50vh - 200px);
  left: calc(50vw - 175px);
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

</style>