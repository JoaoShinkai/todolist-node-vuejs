<template>
    <v-card
    :loading="loading"
    class="todolist-card"
    width="374"
    color="#2f2e36"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title>Lembrete agendado para: </v-card-title>

    <v-card-text style="flex: 1">
      
        <div class="todolist-card-dategroup">
            <div>14/12/2001</div>
            <div>14:30</div>
        </div>

        <div class="my-4 todolist-card-subtitle">
            Detalhes
        </div>

        <div>{{description}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn
        color="pink lighten-1"
        text
        @click="reserve"
      >
        Excluir
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
    data() {
        return{
            loading: false,
        }
    },
    props: {
        description: String,
        date: Date
    }
}
</script>

<style>
.todolist-card{
    display: flex;
    flex-direction: column;
}
.todolist-card-dategroup{
    display: flex;
    grid-gap: 8px;
}
.todolist-card-dategroup div{
    background-color: #9575cd;
    padding: 6px 10px;
    border-radius: 18px;
}
.todolist-card-subtitle{
    font-size: 1.25rem;
    font-weight: 500;
}
</style>
