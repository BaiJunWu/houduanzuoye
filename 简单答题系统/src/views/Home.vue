<template>
  <div class="home">
    <div>
      你好，{{username}},积分:{{integral}}
      <button @click="logout">退出</button>
    </div>
    <hr />
    <div class="container">
      <div>
        <h1>选择题目分类</h1>
        <ul>
          <li v-for="(item, index) in categories" :key="index">
            {{item.cat_name}}
            <button class="but" @click="getQuestionsByCatId(item.id)">开始答题</button>
          </li>
        </ul>
      </div>
      <div>
        <h1>
          答题
          <span v-if="questions.length>0">{{cur_que+1}}/{{questions.length}}</span>
        </h1>
        <dl v-if="questions.length > 0">
          <dt>题目：{{questions[cur_que].title}}</dt>
          <dd v-for="(item, index) in questions[cur_que].options" :key="index">
            <label>
              <input type="radio" :value="index" v-model="answerd[cur_que]" name="xx" />
              {{item}}
            </label>
          </dd>
        </dl>
        <button @click="noveNex">点击进入下一题</button>
        <hr />
        <!-- 显示题目对应的按钮 -->
        <button
          v-for="(item, index) in questions.length"
          :key="index"
          @click="cur_que=index"
          :disabled="index>answerd.length-1"
        >{{index+1}}</button>
      </div>
      <div>
        <h1>排行榜</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      integral: '',
      categories: [], // 保存所有的分类
      questions: [], // 保存所有的题目
      cur_que: 0, // 当前显示的题目的下标
      answerd: [] // 所有做过的提的答案
    }
  },
  // 这个页面创建之前执行 如果没有登陆就跳转
  beforeCreate () {
    let token = sessionStorage.getItem('token')
    if (token === null) {
      this.$router.push('/login')
      return false
    }
  },
  created () {
    this.username = sessionStorage.getItem('username')
    this.integral = sessionStorage.getItem('integral')
    this.$http.get('/categories').then(res => {
      this.categories = res.data.data
    })
  },
  methods: {
    init () {
      this.answerd = []
      this.cur_que = 0
    },
    noveNex () {
      if (this.answerd[this.cur_que] === undefined) {
        alert('没有选择答案')
        return false
      } else {
        this.cur_que++
      }
    },
    logout () {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    getQuestionsByCatId (catId) {
      this.init()
      this.$http.get(`/categories/${catId}/questions`).then(res => {
        this.questions = res.data.data
      })
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: space-around;
}
.container > div {
  border: 1px solid #000;
  width: 30%;
}
.container h1 {
  background-color: #eee;
  margin: 0;
  padding: 5px;
  font-size: 20px;
  text-align: center;
}
.wrong {
  background-color: #f00;
  color: #fff;
}
.right {
  background-color: #0f0;
  color: #fff;
}
.current {
  background-color: skyblue;
  color: #fff;
}
</style>
