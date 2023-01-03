<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i class="material-icons" @click="taskStore.delTask(task.id)">delete</i>
      <i
        class="material-icons"
        :class="{ active: task.isFav }"
        @click="taskStore.toggleFav(task.id)"
        >favorite</i
      >
    </div>
  </div>
</template>

<script>
import useTaskStore from "../stores/TaskStore";
export default {
  name: "TaskDetails",
  props: ["task"],
  setup(props) {
    const taskStore = useTaskStore();

    return { taskStore };
  },
};
</script>
