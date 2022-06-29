import Vue from 'vue'
import Router from 'vue-router'
import Todo from '@/components/Todo'
import TodoVuetify from '@/components/TodoVuetify'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Todo',
      component: Todo
    },
    {
      path: '/',
      name: 'Vuetify',
      component: TodoVuetify
    }
  ]
})
