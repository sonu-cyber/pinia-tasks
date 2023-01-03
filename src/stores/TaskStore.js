import { defineStore } from "pinia";

const useTaskStore = defineStore("taskStore", {
  
  state: () => ({
    tasks: [],
    loading:false
  }),
  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },
    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getTasks(){
      this.loading=true
      const res = await fetch('http://localhost:3000/tasks/')
      .then((res) => res.json())
      .then((data) => (this.tasks = data))
      .catch((err) => console.log(err.message)); 
      /*  const data = await res.json()
      this.tasks = data  */
      this.loading = false
      /* if(res.error){
        console.log(res.error)
      } */
      console.log('this.tasks',this.tasks)

    },
    async addTask(task) {
      this.tasks.push(task);
      const res = await fetch('http://localhost:3000/tasks/',{
        method:'POST',
        body:JSON.stringify(task),
        headers:{'Content-Type':'application/json'}
      })
      
      if(res.error){
        console.log(res.error)
      }

    },
    async delTask(id) {
      this.tasks = this.tasks.filter((t) => {
        return t.id !== id;
      });
      const res = await fetch('http://localhost:3000/tasks/'+id,{
        method:'DELETE',
        
      })
      
      if(res.error){
        console.log(res.error)
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((task) => 
        task.id === id);
        task.isFav = !task.isFav;
      ;
      const res = await fetch('http://localhost:3000/tasks/'+id,{
        method:'PATCH',
        body:JSON.stringify({isFav:task.isFav}),
        headers:{'Content-Type':'application/json'}
      })
      
      if(res.error){
        console.log(res.error)
      }
    },
  },
});
export default useTaskStore;
