<template>
  <main>
    <header>
      <!--Heading-->
      <img src="./assets/pinia-logo.svg" alt="Pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>
    <!--New Task Form-->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!--Filter-->
    <div class="filter">
      <button @click="filter = 'all'">All</button>
      <button @click="filter = 'favs'">Favs</button>
    </div>

    <!--Loading-->
    <div class="loading" v-if="loading">Loading...</div>

    <!--Tasks-->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks left</p>

      <div v-for="task in tasks">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} Tasks left</p>
      <div v-for="task in favs">
        <TaskDetails :task="task" />
      </div>
    </div>
    <!--Reset tasks-->
    <button class="reset" @click="taskStore.$reset">Reset</button>
    <button class="get-tasks" @click="taskStore.getTasks">Get All Tasks</button>
  </main>
</template>

<script>
import { ref,computed } from "vue";
import useTaskStore from "./stores/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { storeToRefs } from "pinia";

export default {
  components: { TaskDetails, TaskForm },
  setup() {
    /* Get the Tasks*/
    //const taskStore = computed(()=> useTaskStore.getTasks)
    //const{getTasks:taskStore}=storeToRefs(useTaskStore())
    const taskStore = useTaskStore();
    const {tasks,loading,favs,totalCount,favCount }= storeToRefs(taskStore);
    taskStore.getTasks;
     
    const filter = ref("all");

    return { taskStore, filter,tasks,loading,favs,totalCount,favCount };
  },
};
</script>
