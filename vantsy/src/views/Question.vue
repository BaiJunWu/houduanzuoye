<template>
  <div>
    <van-nav-bar :title="catName" left-text="返回" left-arrow @click-left="$router.back()" />

    <van-tabs v-model="questionsType" @click="changType">
      <van-tab name="all" :title="'全部(' + total + ')'"></van-tab>
      <van-tab name="right" :title="'作对的(' + right + ')'"></van-tab>
      <van-tab name="wrong" :title="'做错的(' + wrong + ')'"></van-tab>
      <van-tab name="undo" :title="'未做的(' + undo + ')'"></van-tab>
    </van-tabs>
    <!-- 显示题目 -->
    <div class="ti">
      <van-button type="primary" @click="getQuestions" v-if="questions.length == 0">开始答题</van-button>
      <div v-else>
        <h2>题目: {{questions[cur_que].title}}</h2>
        <van-radio-group v-model="answer">
          <van-radio
            v-for="(item, index) in questions[cur_que].options.split(',')"
            :key="index"
            :name="index"
          >{{alph[index]}}.{{item}}</van-radio>
        </van-radio-group>
        <van-button @click="submit">提交，进入下一道</van-button>&nbsp;
        <van-button @click="showAnswer=!showAnswer">查看答案</van-button>&nbsp;
        <van-tag v-if="showAnswer" type="warning">正确答案:{{alph[questions[cur_que].right - 1]}}</van-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get(`/categories/${this.$route.params.id}/questions_count_info`).then(res => {
      this.total = res.data.data.total
      this.right = res.data.data.right
      this.wrong = res.data.data.wrong
      this.undo = res.data.data.undo
    })
  },
  data () {
    return {
      questionsType: 'all',
      answer: [],
      showAnswer: false,
      alph: ['A', 'B', 'C', 'D'],
      catName: sessionStorage.getItem('catName'),
      total: 0,
      right: 0,
      wrong: 0,
      undo: 0,
      cur_que: 0,
      questions: []
    }
  },
  methods: {
    created () {
      let token = sessionStorage.getItem('token')
      if (!token) {
        this.$router.push('/login')
      }
    },
    submit () {
      if (this.answer === '') {
        alert('不能为空')
        return false
      }
      if (this.answer === this.questions[this.cur_que].right) {
        alert('成功')
      } else {
        alert('失败')
      }
    },
    getQuestions () {
      this.$http.get(`/categories/${this.$route.params.id}/questions?type=${this.questionsType}`).then(res => {
        this.questions = res.data.data
      })
    },
    changType () {
      this.questions = []
      this.cur_que = 0
      this.answer = ''
      this.showAnswer = false
    }
  }
}
</script>
