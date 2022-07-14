<template>
    <div>
        <navbar-component/>
        <div class="todolist-dashboard">
            <div class="todolist-dashboard-button">
                <!-- Modal de criação de categoria -->
                <v-dialog v-model="dialog" max-width="480">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mx-2" v-bind="attrs" v-on="on" fab dark color="deep-purple lighten-2">
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="text-h5" style="padding: 22px 24px; color: #9575cd"><i class="fa-solid fa-stopwatch mr-3"></i> Adicionar lembrete</v-card-title>
                        <v-card-text>
                            <form action="">
                                <!-- Date Picker -->
                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="form.date" transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field color="deep-purple lighten-2" v-model="form.date" label="Data" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined></v-text-field>
                                    </template>
                                    <v-date-picker color="deep-purple lighten-2" v-model="form.date" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="deep-purple lighten-2" @click="menu = false">
                                            Fechar
                                        </v-btn>
                                        <v-btn color="deep-purple lighten-2" style="color: white" @click="$refs.menu.save(form.date)">
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>

                                <!-- Time Picker -->
                                <v-dialog ref="dialog" v-model="modal2" :return-value.sync="form.time" width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field color="deep-purple lighten-2" v-model="form.time" label="Hora" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" outlined></v-text-field>
                                    </template>
                                    <v-time-picker color="deep-purple lighten-2" v-if="modal2" v-model="form.time" full-width>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="deep-purple lighten-2" @click="modal2 = false">
                                            Fechar
                                        </v-btn>
                                        <v-btn text color="deep-purple lighten-2" @click="$refs.dialog.save(form.time)">
                                            OK
                                        </v-btn>
                                    </v-time-picker>
                                </v-dialog>
                                <v-text-field color="deep-purple lighten-2" prepend-icon="mdi-card-text" v-model="form.description" label="Descrição" outlined></v-text-field>
                            </form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="deep-purple lighten-2" text @click="dialog = false">
                                Fechar
                            </v-btn>
                            <v-btn color="deep-purple lighten-2" text @click="createSchedule()">
                                Confirmar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            <div v-if="this.schedules.length > 0" class="todolist-dashboard-schedules">
                <card-component  v-for="schedule in this.schedules" :key="schedule.id" :description="schedule.description" :date="schedule.date"/>
            </div>
            <div v-else class="todolist-dashboard-schedules-empty">
                <i class="fa-solid fa-calendar-xmark"></i>
                <div>Você não possui nenhum agendamento por enquanto</div>
            </div>
        </div>
        <alert-component v-if="alert.isVisible" :message="alert.message" :status="alert.status" @closeAlert="alert.isVisible = false"/>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import CardComponent from '../components/CardComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import AlertComponent from '../components/AlertComponent.vue'

export default {
    name: 'DashboardView',
    data(){
        return{
            
            menu: false,
            modal2: false,
            dialog: false,
            token: localStorage.getItem('token'),
            schedules: [],
            form: {
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                time: '00:00',
                description: ''
            },
            alert: {
                isVisible: false,
                message: '',
                status: 0
            }
        }
    },
    components: {
        CardComponent,
        NavbarComponent,
        AlertComponent
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
        },
        async createSchedule() {

            const formatedDate = Date.parse(`${this.form.date} ${this.form.time}`);
            const formatedNowDate = Date.parse(new Date());

            
            if(formatedDate <= formatedNowDate){
                this.showAlert("A data deve ser maior que a data atual", 0)
            }
            else if(this.form.description == undefined || this.form.description == null || this.form.description == ''){
                this.showAlert("O campo descrição não pode ser nulo", 0)
            }
            else{
                try{

                    var req = {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }

                    const {id} = jwt_decode(this.token);

                    const schedule = {
                        date: `${this.form.date} ${this.form.time}`,
                        description: this.form.description,
                        user: {
                            id
                        }
                    }

                    
                    const result = await axios.post('http://localhost:3300/scheduling/', schedule, req);

                    this.alert.message = "Lembrete agendado com sucesso";
                    this.alert.status = 1,
                    this.alert.isVisible = true
                    this.dialog = false
                    setTimeout(() => {
                        this.alert.isVisible = false
                    },5300)

                    await this.loadSchedules();

                    console.log(result);
                }catch(err){
                    console.log(err)
                }
            }
            
        },
        showAlert(message, statusCode){
            this.alert.message = message;
            this.alert.status = statusCode,
            this.alert.isVisible = true
            setTimeout(() => {
                this.alert.isVisible = false
            },5300)
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
    padding-top: 48px;
    display: flex;
    flex-direction: column;
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
.todolist-dashboard-schedules-empty{
    color: white;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size:35px;
    grid-gap: 35px;
}
.todolist-dashboard-schedules-empty i{
    font-size: 120px;
}
</style>
