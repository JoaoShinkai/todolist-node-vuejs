<template>
    <div>
        <navbar-component/>
        <div class="todolist-olderSchedules">
            <div class="todolist-olderSchedules-schedules">
                <card-component v-for="schedule in this.schedules" :key="schedule.id" :description="schedule.description" :date="schedule.date" data-progress='10%' />
            </div>
        </div>
    </div>
    
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import CardComponent from '../components/CardComponent.vue'
import axios from 'axios'

export default {
    data() {
        return{
            token: localStorage.getItem('token'),
            schedules: []
        }
    },
    components: {
        NavbarComponent,
        CardComponent
    },
    methods: {
        async loadSchedules(){
            try{
                var req = {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }

                const result = await axios.get(`http://localhost:3300/scheduling/list/older`, req);

                this.schedules = result.data;
            }catch(err){
                console.log(err);
            }
        }
    },
    created: async function(){
        await this.loadSchedules()
    }
}
</script>

<style>
.todolist-olderSchedules{
    background-color: #23222a;
    min-height: 100vh;
    padding-top: 48px;
    display: flex;
    flex-direction: column;
}
.todolist-olderSchedules-schedules{
    padding: 15px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 364px);
    grid-gap: 10px;
    justify-content: center;
}
</style>