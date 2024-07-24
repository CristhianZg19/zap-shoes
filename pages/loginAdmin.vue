<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <span class="headline">Iniciar Sesión</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Correo Electrónico"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Contraseña"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="login">Iniciar Sesión</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      emailRules: [
        v => !!v || 'El correo electrónico es requerido',
        v => /.+@.+\..+/.test(v) || 'Debe ser un correo electrónico válido'
      ],
      passwordRules: [
        v => !!v || 'La contraseña es requerida',
        v => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres'
      ]
    }
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post('https://proyect-stack-back.onrender.com/api/auth/login', {
            email: this.email,
            password: this.password
          })

          // Asumiendo que el token está en response.data.token
          const token = response.data.token
          
          // Guardar el token en localStorage o en otro lugar seguro
          localStorage.setItem('tokenadmin', token)
          
          // Redirigir al usuario a la página de inicio
        } catch (error) {
          // Manejar errores de autenticación
          console.error('Error en la autenticación:', error)
          alert('Error en la autenticación. Por favor, verifica tus credenciales.')
        }
      }
    }
  }
}
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
