<template>
  <div class="console">
    <a-button type="primary" @click="toConsole" style="display: none;">控制台</a-button>
    <!--    &nbsp;&nbsp;-->
    <!--    <a-button type="primary" @click="login">登陆</a-button>-->
  </div>
  <img alt="Vue logo" src="../assets/logo.png" class="titleImg">
  <div class="hello">
    <h1 class="title">豆油拌饭Dの歌单</h1>
    <a-input-search
        class="input"
        v-model:value="searchValue"
        placeholder="input music name"
        enter-button="Search"
        size="large"
        @search="onSearch"
    />
    <br>
    <a-table class="table" :dataSource="dataSource" :columns="columns"/>
  </div>
</template>
<script>
import {onBeforeMount, defineComponent, ref} from "vue";
import {Button, Input} from 'ant-design-vue';
import {Table} from 'ant-design-vue';
import {useRouter} from 'vue-router';
import myAxios from "@/plugins/myAxios";

export default defineComponent({
  name: 'DouYouIndex',
  props: {
    msg: String,
  },
  components: {
    'a-table': Table,
    'a-button': Button,
    'a-input-search': Input.Search
  },
  setup() {
    const router = useRouter();
    onBeforeMount(async () => {
      // 在组件挂载之前发送初始化请求
      try {
        const Query = {};
        const result = await myAxios.post("music/list/", Query);
        dataSource.value = result.data.data;
        // console.log(dataSource.value)
      } catch (error) {
        console.error('请求初始化数据时出错：', error);
      }
    });

    const toConsole = () => {
      router.push('/douyou/console');
    };
    const login = () => {
      router.push('/login');
    };
    return {
      searchValue,
      dataSource,
      toConsole,
      login,
      onSearch,
      // dataSourceTest: [
      //   {
      //     key: '1',
      //     name: '胡彦斌',
      //     age: 32,
      //     address: '西湖区湖底公园1号',
      //   },
      //   {
      //     key: '2',
      //     name: '胡彦祖',
      //     age: 42,
      //     address: '西湖区湖底公园1号',
      //   },
      // ],
      columns: [
        {
          title: '歌名',
          dataIndex: 'music',
          key: 'id',
        },
        {
          title: '原唱',
          dataIndex: 'singer',
          key: 'id',
        },
      ],
    };
  },
  methods: {}
})

const dataSource = ref([]);
const searchValue = ref('');
const onSearch = () => {
  // alert(searchValue.value)
  try {
    dataSource.value = [];
    const Query = {
      searchText: searchValue.value
    };
    myAxios.post("music/searchList", Query).then((res) => {
      dataSource.value = res.data.data;
    });

    // console.log(result);
    // dataSource.value = result.data.data;
    // console.log(dataSource.value)
  } catch (error) {
    console.error('请求数据时出错：', error);
  }
};
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

.title {
  text-align: center;
}

.input {
  width: 400px;
  margin: 0 auto;
  display: block;
}

.table {
  width: 800px;
  margin: 0 auto;
  display: block;
}

.console {
  text-align: right;
  margin-right: 50px;
}
</style>
