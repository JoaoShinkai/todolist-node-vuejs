<template>
    <div class="todolist-register">
        <div class="todolist-register-container">
            <div class="todolist-login-container-title">
                Crie sua conta gratuitamente
            </div>
            <v-form @submit.prevent="submit()" class="todolist-register-container-form">
                <div class="todolist-register-container-form-inputs">
                <v-text-field
                    v-model="form.name"
                    label="Nome"
                    outlined
                    color="white"
                    type="search"
                    autocomplete="off"
                    v-bind:class="this.errors.name ?'todolist-register-container-input-error': 'todolist-register-container-input' "
                    :error-messages="this.errors.name"
                ></v-text-field>
                <v-text-field
                    v-model="form.email"
                    label="E-mail"
                    outlined
                    color="white"
                    class="todolist-login-container-input"
                    type="search"
                    autocomplete="off"
                    v-bind:class="this.errors.email ?'todolist-register-container-input-error': 'todolist-register-container-input' "
                    :error-messages="this.errors.email"
                ></v-text-field>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="Senha"
                            type="password"
                            outlined
                            color="white"
                            class="todolist-login-container-input"
                            v-model="form.password"
                            v-bind:class="this.errors.password ?'todolist-register-container-input-error': 'todolist-register-container-input' "
                            :error-messages="this.errors.password"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            label="Confirmar Senha"
                            type="password"
                            outlined
                            color="white"
                            class="todolist-login-container-input"
                            v-model="form.confirmPassword"
                            v-bind:class="this.errors.confirmPassword ?'todolist-register-container-input-error': 'todolist-register-container-input' "
                            :error-messages="this.errors.confirmPassword"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-text-field
                    label="Celular"
                    outlined
                    color="white"
                    class="todolist-login-container-input"
                    v-model="form.cellphone"
                    v-bind:class="this.errors.cellphone ?'todolist-register-container-input-error': 'todolist-register-container-input' "
                    :error-messages="this.errors.cellphone"
                    v-mask="'(##) #####-####'"
                ></v-text-field>
                </div>
                <div class="todolist-login-container-form-button">
                    <v-btn type="submit" :loading="this.isSendingData" depressed>
                        Criar
                    </v-btn>
                </div>
                
            </v-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            form: {
                name: '',
                password: '',
                confirmPassword: '',
                email: '',
                cellphone: ''
            },
            errors: {
                name: '',
                password: '',
                confirmPassword: '',
                email: '',
                cellphone: ''
            },
            isValidData: false,
            isSendingData: false
        }
    },
    methods: {
        async submit(){
            this.isValidData = true;
            this.cleanFields();

            if(this.form.name == ''){
                this.errors.name = 'Esse campo é obrigatório'
                this.isValidData = false
            }
            else if(this.form.name.length < 3){
                this.errors.name = 'Deve conter ao menos 3 caracteres'
                this.isValidData = false
            }
            if(this.form.email == ''){
                this.errors.email = 'Esse campo é obrigatório'
                this.isValidData = false
            }
            else if(!this.validateEmail(this.form.email)){
                this.errors.email = 'Email inválido'
                this.isValidData = false
            }
            if(this.form.password.length < 4){
                this.errors.password = 'Deve conter ao menos 4 caracteres'
                this.isValidData = false
            }
            else if(this.form.confirmPassword != this.form.password){
                this.errors.confirmPassword = 'As senhas devem ser iguais'
                this.isValidData = false
            }
            if(this.form.cellphone == ''){
                this.errors.cellphone = 'Esse campo é obrigatório'
                this.isValidData = false
            }
            if(this.isValidData){
                this.isSendingData = true;
                this.form.cellphone = (this.form.cellphone).replace('-','').replace(' ','').replace('(','').replace(')','')
                
                await axios.post('http://localhost:3300/user/', this.form)

                this.isSendingData = false;

                // Login

                const res = await axios.post('http://localhost:3300/user/login', this.form);

                if(res.data.token){
                    localStorage.setItem('token', res.data.token);
                    this.$router.push({name: 'dashboard'})
                }
            }
        },
        validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        },
        cleanFields() {
            this.errors.name = '',
            this.errors.email = '',
            this.errors.password = '',
            this.errors.confirmPassword = '',
            this.errors.cellphone = ''
        }
    }
}
</script>

<style>
.todolist-register{
    background-color: #23222a;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.todolist-register-container{
  background-color: #2f2e36;
  width: clamp(300px, 50%, 700px) ;
  min-height: 400px;
  padding: 15px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
}
.todolist-login-register-title{
  padding: 10px 5px 25px 5px;
  font-size: 20px;
  border-bottom: dashed 1px #e1e1e1;
  color: white;
}
.todolist-register-container-form{
  padding-top: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.todolist-register-container-form-inputs{
  flex: 1;
}
.todolist-register-container-input .v-text-field__slot input{
  color: white !important;
}
.todolist-register-container-input .v-text-field__slot label{
  color: white !important;
}
.todolist-register-container-input fieldset{
  color: white !important;
}

.todolist-register-container-input-error .v-text-field__slot input{
  color: #ff5252 !important;
}
.todolist-register-container-input-error .v-text-field__slot label{
  color: #ff5252 !important;
}
.todolist-register-container-input-error fieldset{
  color: #ff5252 !important;
}
</style>