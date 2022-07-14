<template>
    <v-card
    :loading="loading"
    class="todolist-card"
    width="374"
    color="#2f2e36"
  >
    <div class="todolist-card-progressbar" :style="`width:${this.progress}%`">

    </div>
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title style="color: white"><i class="fa-solid fa-calendar-check mr-3"></i>Lembrete agendado </v-card-title>

    <v-card-text style="flex: 1">
      
        <div class="todolist-card-dategroup">
            <div><i class="fa-solid fa-calendar-day"></i> {{date | dateConvert}}</div>
            <div><i class="fa-solid fa-clock"></i> {{date | timeConvert}}</div>
        </div>

        <div class="my-4 todolist-card-subtitle">
            <i class="fa-solid fa-comment"></i>
            Detalhes
        </div>

        <div style="color: white">{{description}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions v-if="this.calcDate(this.date)">
      <v-btn color="deep-purple lighten-2" text>
        <i class="fa-solid fa-trash-can"></i> Excluir
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import {format} from 'date-fns';
export default {
    data() {
        return{
            loading: false,
            progress: 0
        }
    },
    props: {
        description: String,
        date: String
    },
    filters: {
        dateConvert: function(date){
            return format(Date.parse(date), 'dd/MM/yyyy')
        },
        timeConvert: function(date){
            return format(Date.parse(date), 'HH:mm')
        }
    },
    methods: {
        calcDate(date){
            const formatedNowDate = Date.parse(new Date());
            const formatedDate = Date.parse(date);

            return formatedDate > formatedNowDate
        },
        calcProgress(){
            // Salva o timestamp atual
            const formatedNowDate = Date.parse(new Date());

            // Salva o timestamp da data agendada
            const formatedDate = Date.parse(this.date);

            // Calcula quantos minutos restam para a data do agendamento (1 min = 60000ms)
            const minutesRemaining = (formatedDate - formatedNowDate) / 60000;

            // Calcula quantos minutos tem em uma semana (1 min = 60000ms)
            const weekInMinutes = 604800000 / 60000;

            // Cria a variavel progresso que inicialmente é 100%
            var progress = 100;

            if(formatedNowDate > formatedDate){
                this.progress = 100;
            }
            else{
                if(minutesRemaining < weekInMinutes){
                    // Subtrai de "progress" a porcentagem que já passou
                    progress -= (minutesRemaining * 100) / weekInMinutes
                }
                else{
                    progress = 0;
                }
                this.progress = progress
            }
        }
    },
    created: async function(){
        this.calcProgress();
    }
}
</script>

<style>
.todolist-card{
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.todolist-card::before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 3px;
    width: 100%;
    background-color: #1e1e20;
}

.todolist-card-dategroup{
    display: flex;
    grid-gap: 8px;
    color: white;
}
.todolist-card-dategroup div{
    background-color: #9575cd;
    padding: 6px 10px;
    border-radius: 18px;
}
.todolist-card-subtitle{
    font-size: 1.25rem;
    font-weight: 500;
    color: white;
}
.todolist-card-progressbar{
    width: 20%; 
    height: 3px; 
    position: absolute; 
    top: 0; 
    left: 0; 
    background-color: #9575cd; 
    z-index: 99; 
    transition: .5s
}
</style>
