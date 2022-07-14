<template>
    <div class="todolist-navbar">
    <v-app-bar
      color="deep-purple lighten-2"
      dense
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>ToDo List</v-toolbar-title>

      <v-spacer></v-spacer>


      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <router-link to="/dashboard/older">
        <v-btn icon>
          <i class="fa-solid fa-clock-rotate-left"></i>
        </v-btn>
      </router-link>
      
      <router-link to="/dashboard">
        <v-btn icon>
          <i class="fa-solid fa-house"></i>
        </v-btn>
      </router-link>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item class="todolist-navbar-item" @click="logout()">
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
    data() {
        return{

        }
    },
    methods: {
        logout(){
            localStorage.removeItem('token');
            this.$router.push({name: 'home'})
        }
    }
}
</script>


<style>
.todolist-navbar{
    position: fixed;
    width: 100%;
    z-index: 9999;
}
.todolist-navbar-item{
    cursor: pointer;
    min-width: 150px;
}
.todolist-navbar-item:hover{
    background-color: #e1e1e1;
}
</style>