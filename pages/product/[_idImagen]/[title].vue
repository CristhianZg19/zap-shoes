<template>
  <v-container class="product-list-container" style="margin-top: 100px">
    <v-card class="product-list-card">
      <v-card-title class="product-list-title">
        <h2 class="title-text">{{ getTitle(title) }}</h2>
      </v-card-title>
      <v-card-text>
        <v-img
          :src="`https://http2.mlstatic.com/D_NQ_NP_${idImagen}-O.webp`"
          alt="Imagen del producto"
          height="200"
          contain
          class="product-image"
        ></v-img>
      </v-card-text>
    </v-card>
  </v-container>
</template>
  
  <script setup>
import { useRoute } from "vue-router";
import { useHead } from "@unhead/vue";

// Obtén la ruta actual
const route = useRoute();
const idImagen = route.params._idImagen;
const title = decodeURIComponent(route.params.title).replace(/-/g, " "); // Decodifica el título y reemplaza guiones con espacios
function getTitle(title) {
  // Elimina las dos primeras palabras
  const words = title.split(" ").slice(2).join(" ");
  // Convierte el título resultante a mayúsculas
  return words.toUpperCase();
}

useHead({
  title: getTitle(title),
  meta: [
    { name: "description", content: title },
    { property: "og:title", content: "Shoes Man" },
    { property: "og:description", content: "Descripción de la Man" },
  ],
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: `https://http2.mlstatic.com/D_NQ_NP_${idImagen}-O.webp`,
    }, // URL externa para el favicon
  ],
});

// Configura los metadatos para la página con el título específico
</script>
  
  <style scoped>
/* Estilos específicos para esta página */
.product-list-title {
  display: flex;
  justify-content: center;
}

.title-text {
  color: black;
  font-size: 1.5rem; /* Adjust as needed */
  white-space: normal;
  overflow-wrap: break-word;
  text-align: center;
  margin: 0;
}

.product-list-container {
  padding: 0 16px; /* Adjust as needed */
}

.product-image {
  max-width: 100%; /* Ensure image scales responsively */
}
</style>
  