<template>
  <div class="hello">
    <a-card title="修改密码" :bordered="false" style="width: 600px; margin: 0 auto;">
      账&nbsp;&nbsp;&nbsp;&nbsp;号：<a-input class="input" v-model:value="accountValue" placeholder="请输入账号" />
      <br>
      <br>
      旧密码：<a-input class="input" v-model:value="passwordValue" placeholder="请输入旧密码" />
      <br>
      <br>
      新密码：<a-input class="input" v-model:value="newPasswordValue" placeholder="请输入新密码" />
      <br>
      <br>
      <a-button type="primary" @click="resetPwd">修改密码</a-button>&nbsp;&nbsp;
      <div class="buttonRight">
        <a-button type="primary" @click="toConsole">返回控制台</a-button>&nbsp;&nbsp;
        <a-button type="primary" @click="toIndex">返回主页</a-button>
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
    const newPasswordValue = ref('');
    const toIndex = () => {
      router.push('/');
    };
    const resetPwd = () => {
      alert(accountValue);
      alert(passwordValue);
      alert(newPasswordValue);
    };
    const toConsole = () => {
      router.push('/console');
    };
    return {
      accountValue,
      passwordValue,
      newPasswordValue,
      toIndex,
      resetPwd,
      toConsole,
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
