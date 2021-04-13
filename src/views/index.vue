<style scoped>
.tree {
  width: 15%;
  overflow: auto;
}
</style>
<template>
  <div>
    <div class="item">
      当前数量是{{ count }} <button @click="add">增加</button>
    </div>
    <button @click="asyncAdd">异步操作+10</button>
    <el-tree
      :data="data2"
      :props="defaultProps"
      :node-name="id"
      :default-expanded-keys="[0,2]"
      @node-click="handleNodeClick"
      class="tree"
    ></el-tree>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
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