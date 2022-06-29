<template>
  <ul id="app">
    <h1>チュートリアルToDoリスト</h1>
    <button v-on:click="gotoVuetify()">
      <th>Vuetifyへrouter.push（name指定）</th>
    </button>
    <div v-for="label in options" v-bind:key="label.id">
      <input type="radio"
        v-model="current"
        v-bind:value="label.value">{{ label.label }}
    </div>
      
    （{{ computedTodos.length }} 件を表示）
    <table>
      <thead v-pre>
        <tr>
          <th class="id">ID</th>
          <th class="comment">コメント</th>
          <th class="state">状態</th>
          <th class="button">-</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in computedTodos"
          v-bind:key="item.id"
          v-bind:class="{done:item.state}">
          <th>{{ item.id }}</th>
          <td>{{ item.comment }}</td>
          <td class="state">
            <button v-on:click="doChangeState(item)">
              {{ labels[item.state] }}
            </button>
          </td>
          <td class="button">
            <button v-on:click="doRemove(item)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h2>新しい作業の追加</h2>
    <form class="add-form" v-on:submit.prevent="doAdd">
      コメント <input type="text" ref="comment">
      <button type="submit">追加</button>
    </form>
  </ul>
</template>
 
<script>
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export default {

  computed: {
    computedTodos: function () {
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    },
    labels() {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  created() {
    this.todos = todoStorage.fetch()
  },
  methods: {
    doAdd: function(event, value) {
      var comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      comment.value = ''
    },
    doChangeState: function (item) {
      item.state = !item.state ? 1 : 0
    },

    gotoVuetify: function () {
      this.$router.push({name: 'Vuetify'})
    },
    doRemove: function (item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }

  },
  data: function () {
    return {
        todos: [],
        current: -1,
        options: [
            { value: -1, label: 'すべて' },
            { value: 0, label: '作業中' },
            { value: 1, label: '完了' }
        ]
      }
    },
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  #app {
    max-width: 640px;
    margin: 0 auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  thead th {
    border-bottom: 2px solid #0099e4;
    color: #0099e4;
  }
  th,
  th {
    padding: 0 8px;
    line-height: 40px;
  }
  thead th.id {
    width: 50px;
  }
  thead th.state {
    width: 100px;
  }
  thead th.button {
    width: 60px;
  }
  tbody td.button, tbody td.state {
    text-align: center;
  }
  tbody tr td,
  tbody tr th {
    border-bottom: 1px solid #ccc;
    transition: all 0.4s;
  }
  tbody tr.done td,
  tbody tr.done th {
    background: #f8f8f8;
    color: #bbb;
  }
  tbody tr:hover td,
  tbody tr:hover th {
    background: #f4fbff;
  }
  button {
    border: none;
    border-radius: 20px;
    line-height: 24px;
    padding: 0 8px;
    background: #0099e4;
    color: #fff;
    cursor: pointer;
  }
</style>
