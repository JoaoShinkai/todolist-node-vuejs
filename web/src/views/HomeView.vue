<template>
  <div class="todolist-login">
    <div class="todolist-login-container">
      <div class="todolist-login-container-title">
        Acesse sua conta
      </div>
      <v-form @submit.prevent="submit()" class="todolist-login-container-form">
        <div class="todolist-login-container-form-inputs">
          <v-text-field
            v-model="form.email"
            label="E-mail"
            outlined
            color="white"
            class="todolist-login-container-input"
            type="search"
            autocomplete="off"
          ></v-text-field>
          <v-text-field
              label="Senha"
              type="password"
              outlined
              color="white"
              class="todolist-login-container-input"
              v-model="form.password"
          ></v-text-field>
        </div>
        <div class="todolist-login-container-form-button">
          <v-btn type="submit" depressed>
            Entrar
          </v-btn>
        </div>
        
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    name: 'HomeView',

    components: {
    },

    data () {
      return{
        form: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async submit(){
        try{
          const res = await axios.post('http://localhost:3300/user/login', this.form);

          if(res.data.token){
            localStorage.setItem('token', res.data.token);
            this.$router.push({name: 'dashboard'})
          }

          console.log(res);
        }catch(err){
          console.log(err);
        }
      }
    }
  }
</script>
<style>
*{
  color: white;
}
.todolist-login{
  background-color: #23222a;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.todolist-login-container{
  background-color: #2f2e36;
  width: clamp(300px, 50%, 700px) ;
  min-height: 400px;
  padding: 15px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
}
.todolist-login-container-title{
  padding: 10px 5px 25px 5px;
  font-size: 20px;
  border-bottom: dashed 1px #e1e1e1;
}
.todolist-login-container-form{
  padding-top: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.todolist-login-container-form-button{
  display: flex;
  justify-content: end;
}
.todolist-login-container-form-inputs{
  flex: 1;
}
.todolist-login-container-input .v-text-field__slot input{
  color: white !important;
}
.todolist-login-container-input .v-text-field__slot label{
  color: white !important;
}
.todolist-login-container-input fieldset{
  color: white !important;
}
</style>