<style scoped>
.tree {
  width: 15%;
  overflow: auto;
}
/*分页*/
.page-bar {
  margin: 40px auto;
  margin-top: 150px;
}
ul,
li {
  margin: 0px;
  padding: 0px;
}
li {
  list-style: none;
}
.page-bar li:first-child > a {
  margin-left: 0px;
}
.page-bar a {
  border: 1px solid #ddd;
  text-decoration: none;
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #5d6062;
  cursor: pointer;
  margin-right: 20px;
}
.page-bar a:hover {
  background-color: #eee;
}
.page-bar a.banclick {
  cursor: not-allowed;
}
.page-bar .active a {
  color: #fff;
  cursor: default;
  background-color: #e96463;
  border-color: #e96463;
}
.page-bar i {
  font-style: normal;
  color: #d44950;
  margin: 0px 4px;
  font-size: 12px;
}
.table1{
  text-align: center;
}
</style>
<template>
  <div class="table1">
    <!-- <div class="item">
      当前数量是{{ count }} <button @click="add">增加</button>
    </div>
    <button @click="asyncAdd">异步操作+10</button> -->
    <!-- <el-tree
      :data="data2"
      :props="defaultProps"
      :node-name="id"
      :default-expanded-keys="[0,2]"
      @node-click="handleNodeClick"
      class="tree"
    ></el-tree> -->
    <template>
      <router-link to='/home'>
        <button>点击跳转2</button>
      </router-link>
      <!-- <a href="../views/home/index.vue">home</a> -->
      <el-table :data="pageDataFn()" style="width: 100%">
        <el-table-column prop="consNo" label="户号" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="180">
        </el-table-column>
        <el-table-column prop="user_id" label="用户编号" width="600">
        </el-table-column>
      </el-table>
      <div class="page-bar">
        <ul>
          <li v-if="pageIndex > 1">
            <a v-on:click="pageIndex--, pageClick()">上一页</a>
          </li>
          <li v-if="pageIndex == 1"><a class="banclick">上一页</a></li>
          <li
            v-for="index in indexs"
            v-bind:class="{ active: pageIndex == index }"
          >
            <a v-on:click="btnClick(index)">{{ index }}</a>
          </li>
          <li v-if="pageIndex != all">
            <a v-on:click="pageIndex++, pageClick()">下一页</a>
          </li>
          <li v-if="pageIndex == all"><a class="banclick">下一页</a></li>
          <li>
            <a
              >共<i>{{ all }}</i
              >页 </a
            ><a>
              当前<i>{{ pageIndex }}</i
              >页</a
            >
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import json from "./index_json.json";
export default {
  data() {
    return {
      all: 10, //总页数
      totalPage: 0, //当前条数
      fistLoad: true,
      tableJson: json,
      tableData1: [],
      // tableData1: [{"consNo":"2290035633","userId":"su9a3da22bdffd45b0947d822015f7f3","mobile":"15858803067","STATUS":"1"},{"consNo":"2740401514","userId":"02e19c2f7c394eccaa25d356a5b3b388","mobile":"15257738369","STATUS":"1"},{"consNo":"2290047273","userId":"57747b44b9a145da9f86bb310395436e","mobile":"18021015362","STATUS":"1"},{"consNo":"2311012669","userId":"2875e43d30b247efa796d0c2566ef7cc","mobile":"13336968085","STATUS":"1"},{"consNo":"2290032201","userId":"su1ec3b6e1c00749a88b127364061e28","mobile":"15967721010","STATUS":"1"},{"consNo":"2290042138","userId":"su2f29e8554dab44f0b8e63992605e93","mobile":"13806857821","STATUS":"1"}],
      tableDataList: [],
      pageIndex: 1,
      pageSize: 1000,
      tableData: function () {
        var data = this.tableJson;
        for (var item in data) {
          var itemObj = JSON.parse(data[item]);
          itemObj.forEach(u=> u.consNo = item)
          this.tableData1 = this.tableData1.concat(itemObj);
        }
        console.log(this.tableData1);
        return this.tableData1;
      },
      //分页数据处理函数
      pageDataFn: function () {
        var number = this.pageIndex;
        var pageSize = this.pageSize;
        var data = this.tableData1;
        var result = [];
        if (data.length == 0) {
          this.tableData();
          data = this.tableData1;
        }
        //处于第几页 number
        //保存每页数据的数组
        this.tableDataList = [];
        this.all = Math.ceil(data.length / pageSize)
        //pageSize 每页条数
        //设置开始
        let start = pageSize * number - pageSize;
        // 设置结束长度
        let end = pageSize * number;
        end = end > data.length ? data.length : end;
        for (let i = start; i < end; i++) {
          //所有分页数据 data
          result.push(data[i]);
        }
        return result;
      },
      computed: {
        //分页
        indexs: function () {
          var left = 1;
          var right = this.all;
          var ar = [];
          if (this.all >= 5) {
            if (this.cur > 3 && this.cur < this.all - 2) {
              left = this.cur - 2;
              right = this.cur + 2;
            } else {
              if (this.cur <= 3) {
                left = 1;
                right = 5;
              } else {
                right = this.all;
                left = this.all - 4;
              }
            }
          }
          while (left <= right) {
            ar.push(left);
            left++;
          }
          return ar;
        },
      },
      data2: [
        {
          id: 0,
          label: "一级 1",
          children: [
            {
              id: 1,
              label: "二级 1-1",
              children: [
                {
                  id: 2,
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          id: 0,
          label: "一级 2",
          children: [
            {
              id: 1,
              label: "二级 2-1",
              children: [
                {
                  id: 2,
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              id: 1,
              label: "二级 2-2",
              children: [
                {
                  id: 2,
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          id: 0,
          label: "一级 3",
          children: [
            {
              id: 1,
              label: "二级 3-1",
              children: [
                {
                  id: 2,
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              id: 1,
              label: "二级 3-2",
              children: [
                {
                  id: 2,
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  computed: {
    count() {
      //return this.$store.getters.getCount
      return this.$store.state.Counter.count;
    },
  },
  methods: {
    handleNodeClick(data) {
      console.log(data.children);
      console.log(data.label);
    },
    add() {
      this.$store.commit("Counter/add", 1);
    },
    asyncAdd() {
      setTimeout(() => {
        this.$store.dispatch("Counter/asyncAdd", 10);
      }, 1000);
    },
  },
};
</script>
<style lang='less' scoped>
.herox {
  width: 100%;
  background: url(https://ws1.sinaimg.cn/large/006tNbRwgy1fw36zy9fysj313t0me0xj.jpg)
    no-repeat;
  background-size: 100% 100%;
  background-position: center;
  height: 100vh;
  margin: 0px;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #000;
}
</style>