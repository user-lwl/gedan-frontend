<template>
  <div class="hello">
    <a-card title="登陆" :bordered="false" style="width: 600px; margin: 0 auto;">
      账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<a-input class="input" v-model:value="accountValue" placeholder="请输入账号" />
      <br>
      <br>
      密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：<a-input class="input" v-model:value="passwordValue" placeholder="请输入密码" />
      <br>
      <br>
      确认密码：<a-input class="input" v-model:value="secondPasswordValue" placeholder="请输入密码" />
      <br>
      <br>
      <a-button type="primary" @click="registerNew">注册</a-button>
      <div class="buttonRight">
        <a-button type="primary" @click="login">登陆</a-button>&nbsp;&nbsp;
      </div>
    </a-card>
  </div>
</template>
<script>
import {defineComponent, ref} from "vue";
import { Card, Button, Input } from 'ant-design-vue';
import { useRouter } from 'vue-router';
export default defineComponent ({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    'a-input': Input,
    'a-card': Card,
    'a-button': Button,
  },
  setup() {
    const router = useRouter();
    const accountValue = ref('');
    const passwordValue = ref('');
    const secondPasswordValue = ref('');
    const login = () => {
      router.push('/login');
    };
    const registerNew = () => {
      alert(accountValue);
      alert(passwordValue);
      alert(secondPasswordValue);
    };
    return {
      accountValue,
      passwordValue,
      secondPasswordValue,
      login,
      registerNew,
    };
  },
  methods: {

  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.buttonRight {
  text-align: right;
  display: block;
}
.input {
  width: 400px;
}
</style>
