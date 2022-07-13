<template>
    <div class="todolist-dashboard">
        <div class="todolist-dashboard-button">
            <v-btn class="mx-2" fab dark color="deep-purple lighten-2">
                <v-icon dark>
                    mdi-plus
                </v-icon>
            </v-btn>
        </div>
        <div class="todolist-dashboard-schedules">
            <card-component  v-for="schedule in this.schedules" :key="schedule.id" :description="schedule.description"/>
        </div>
    </div>
</template>

<script>
// import jwt_decode from 'jwt-decode'
import axios from 'axios'
import CardComponent from '../components/CardComponent.vue'

export default {
    name: 'DashboardView',
    data(){
        return{
            token: localStorage.getItem('token'),
            schedules: []
        }
    },
    components: {
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

                const result = await axios.get('http://localhost:3300/scheduling/', req);

                this.schedules = result.data
            }catch(err){
                console.log(err);
            }
        }
    },
    created: async function() {
        await this.loadSchedules()
    }
}
</script>

<style scoped>
.todolist-dashboard{
    background-color: #23222a;
    min-height: 100vh;
    padding: 10px;
}
.todolist-dashboard-schedules{
    display: grid;
    grid-template-columns: repeat(auto-fill, 364px);
    grid-gap: 10px;
    justify-content: center;
}
.todolist-dashboard-button{
    display: flex;
    justify-content: end;
    padding: 15px 0;
}
</style>
