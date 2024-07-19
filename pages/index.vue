<template>
  <div>
    <ShoesHome />
  </div>
</template>
  
  <script setup>
import ShoesHome from "@/components/ShoesHome.vue"; // Importar el componente, si no usas auto-import
// Aquí puedes definir variables o lógica adicional si es necesario
import { useHead } from '@unhead/vue';

useHead({
  title: 'ZapShoes',
  meta: [
    { name: 'description', content: 'ZapShoes' },
    { property: 'og:title', content: 'ZapShoes' },
    { property: 'og:description', content: 'ZapShoes' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } // Ruta correcta al favicon en static
  ]
});
</script>
  
  <style scoped>
/* Estilos específicos para esta página */
h1 {
  color: #333;
}
</style>
  