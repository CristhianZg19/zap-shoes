<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="d-flex d-sm-none"
      ></v-app-bar-nav-icon>
      <v-btn text @click="navigateHome">
      <v-toolbar-title>ShoesZap</v-toolbar-title>
    </v-btn>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title class="d-none d-sm-flex">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab
            v-for="(item, index) in items"
            :key="index"
            @click="navigateTo(item.path)"
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="navigateTo(item.path)"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>

    <!-- Footer -->
    <AppFooter />
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import AppFooter from '~/components/AppFooter.vue'; // Importa el componente aquí


const drawer = ref(false);
const tab = ref(null);
const router = useRouter();

const items = [
  { name: 'Inicio', path: '/' },
  { name: 'Hombres', path: '/hombres' },
  { name: 'Mujeres', path: '/mujeres' },
  { name: 'Niños', path: '/ninos' },
  { name: 'Unisex', path: '/unisex' }
];

const navigateTo = (path) => {
  useRouter().push(path);
};

const navigateHome = () => {
  router.push('/');
};


</script>

<style>
/* Estilos globales si es necesario */
</style>
