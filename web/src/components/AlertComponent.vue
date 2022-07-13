<template>
    <v-snackbar v-model="snackbar" v-bind:color="status == 0 ? 'red' : 'green'" style="justify-content: end; align-items: flex-start">
        {{message}}
        <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false, emitCloseAlert()">
            Fechar
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>

export default {
    data() {
        return{
            snackbar: true
        }
    },
    props: {
        message: String,
        status: Number
    },
    methods: {
        emitCloseAlert(){
            this.$emit('closeAlert');
        }
    }
}
</script>
