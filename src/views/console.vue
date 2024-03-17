<template>
  <div class = "console">
<!--    <a-button type="primary" @click="resetPwd">修改密码</a-button>&nbsp;&nbsp;-->
    <a-button type="primary" @click="toIndex">主页</a-button>
  </div>
  <img alt="Vue logo" src="../assets/logo.png" class="titleImg">
  <div class="hello">
    <h1 class="title">控制台</h1>
    <a-input-search
        class="input"
        v-model:value="searchValue"
        placeholder="input music name"
        enter-button="Search"
        size="large"
        @search="onSearch"
    />
    <br>
    <a-button class="buttonAdd" type="primary" @click="() => showModalAdd()">新增</a-button>
    <br>
    <a-table class="table" :dataSource="dataSource" :columns="columns" >
      <template v-slot:operation="text">
        <div class="button">
          <a-button type="primary" @click="() => showModal(text)">修改</a-button>&nbsp;&nbsp;
          <a-button type="primary" danger @click="() => showModalDelete(text)">删除</a-button>
        </div>
      </template>
    </a-table>
    <a-modal v-model:visible="visible" title="修改歌曲信息" ok-text="修改" cancel-text="取消" @ok="handleOk">
      歌曲名称：<a-input class="inputMusic" v-model:value="musicEdit" placeholder="请输入歌曲名称" />
      <br>
      <br>
      原唱作者：<a-input class="inputMusic" v-model:value="singerEdit" placeholder="请输入原唱作者" />
    </a-modal>
    <a-modal v-model:visible="visibleAdd" title="新增歌曲" ok-text="新增" cancel-text="取消" @ok="handleOkAdd">
      歌曲名称：<a-input class="inputMusic" v-model:value="musicAdd" placeholder="请输入歌曲名称" />
      <br>
      <br>
      原唱作者：<a-input class="inputMusic" v-model:value="singerAdd" placeholder="请输入原唱作者" />
    </a-modal>
    <a-modal v-model:visible="visibleDelete" title="删除歌曲" ok-text="删除" cancel-text="取消" @ok="handleOkDelete">
      是否确认删除歌曲？
    </a-modal>
  </div>
</template>
<script>
import {onBeforeMount, defineComponent, ref} from "vue";
import { Modal, Button, Input} from 'ant-design-vue';
import { Table } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import myAxios from "@/plugins/myAxios";
export default defineComponent ({
  name: 'DouYouConsole',
  props: {
    msg: String,
  },
  components: {
    'a-table': Table,
    'a-button': Button,
    'a-input-search': Input.Search,
    'a-input': Input,
    'a-modal': Modal,
  },
  setup() {
    const router = useRouter();
    onBeforeMount(async () => {
      // 在组件挂载之前发送初始化请求
      try {
        const Query = {
        };
        const result = await myAxios.post("music/list/", Query);
        dataSource.value = result.data.data;
        // console.log(dataSource.value)
      } catch (error) {
        console.error('请求初始化数据时出错：', error);
      }
    });

    const toConsole = () => {
      router.push('/console');
    };

    const resetPwd = () => {
      router.push('/restPassword');
    };

    const toIndex = () => {
      router.push('/');
    };
    const login = () => {
      router.push('/login');
    };
    return {
      musicAdd,
      musicEdit,
      singerAdd,
      singerEdit,
      idEdit,
      idDelete,
      visibleDelete,
      visible,
      showModalAdd,
      showModalDelete,
      visibleAdd,
      showModal,
      handleOk,
      handleOkAdd,
      handleOkDelete,
      searchValue,
      dataSource,
      toConsole,
      login,
      onSearch,
      resetPwd,
      toIndex,
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
        {
          title: '操作',
          dataIndex: 'operation',
          slots: { customRender: 'operation' }
        }
      ],
    };
  },
  methods: {

  }
})

const dataSource = ref([]);
const searchValue = ref('');
const idEdit = ref('');
const idDelete = ref('');
const musicEdit = ref('');
const singerEdit = ref('');
const musicAdd = ref('');
const singerAdd = ref('');
const visible = ref(false);
const visibleAdd = ref(false);
const visibleDelete = ref(false);
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

const showModal = (record) => {
  musicEdit.value = undefined;
  singerEdit.value = undefined;
  idEdit.value = undefined;
  musicEdit.value = record.record.music;
  singerEdit.value = record.record.singer;
  idEdit.value = record.record.id;
  visible.value = true;
};
const showModalDelete = (record) => {
  idDelete.value = undefined;
  idDelete.value = record.record.id;
  visibleDelete.value = true;
};
const showModalAdd = () => {
  musicAdd.value = undefined;
  singerAdd.value = undefined;
  visibleAdd.value = true;
};
const handleOk = () => {
  try {
    const Query = {
      music: musicEdit.value,
      singer: singerEdit.value,
      id: idEdit.value,
    };
    myAxios.post("music/updateMusic", Query).then((res) => {
      const code = res.data.code;
      const data = res.data.data;
      if (code === 0 && data !== 0) {
        alert("修改成功");
      } else {
        alert("新增失败" + res.data.message);
      }
      dataSource.value = [];
      onSearch();
    });
    // console.log(result);
    // dataSource.value = result.data.data;
    // console.log(dataSource.value)
    visible.value = false;
  } catch (error) {
    console.error('请求数据时出错：', error);
    visible.value = false;
  }
};
const handleOkAdd = () => {
  try {
    const Query = {
      music: musicAdd.value,
      singer: singerAdd.value,
    };
    myAxios.post("music/addMusic", Query).then((res) => {
      const code = res.data.code;
      const data = res.data.data;
      if (code === 0 && data !== 0) {
        alert("新增成功");
      } else {
        alert("新增失败" + res.data.message);
      }
      dataSource.value = [];
      onSearch();
    });
    // console.log(result);
    // dataSource.value = result.data.data;
    // console.log(dataSource.value)
    visibleAdd.value = false;
  } catch (error) {
    console.error('请求数据时出错：', error);
    visibleAdd.value = false;
  }
};
const handleOkDelete = () => {
  try {
    const Query = {
      id: idDelete.value,
    };
    myAxios.post("music/deleteMusic", Query).then((res) => {
      const code = res.data.code;
      const data = res.data.data;
      if (code === 0 && data !== 0) {
        alert("删除成功");
      } else {
        alert("删除失败" + res.data.message);
      }
      dataSource.value = [];
      onSearch();
    });
    // console.log(result);
    // dataSource.value = result.data.data;
    // console.log(dataSource.value)
    visibleDelete.value = false;
  } catch (error) {
    console.error('请求数据时出错：', error);
    visibleDelete.value = false;
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
  width: 300px;
  margin: 0 auto;
  display: block;
}
.inputMusic {
  width: 300px;
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
.button {
  display: block;
}
.buttonAdd {
  display: block;
  margin: 0 auto;
}
</style>