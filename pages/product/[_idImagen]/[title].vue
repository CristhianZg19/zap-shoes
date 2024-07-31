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

      <!-- Botón visible solo si existe el token en localStorage -->
      <v-card-actions v-if="isAdmin">
        <v-btn color="primary" @click="handleAdminAction">
          <v-icon color="red">mdi-virus</v-icon>
        </v-btn>
        <v-text v-if="isAdmin">{{ getPrice().toFixed(2) }}</v-text>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import productosJsonHombre from "@/assets/adidasHombre.json";
import productosJsonMujer from "@/assets/adidasMujer.json";

import productosJsonHombrePuma from "@/assets/pumasHombre.json";
import productosJsonMujerPuma from "@/assets/pumasMujer.json";

// Obtén la ruta actual
const route = useRoute();
const idImagen = route.params._idImagen;
let title = decodeURIComponent(route.params.title).replace(/-/g, " "); // Decodifica el título y reemplaza guiones con espacios

const codigoProd = title;

// Elimina la parte de la URL que comienza con _ hasta el final
title = title.replace(/_.*/, "");
const productos = ref([]);

useSeoMeta({
  title: getTitle(title),
  ogTitle: getTitle(title),
  description: getTitle(title),
  ogDescription: getTitle(title),
  ogImage: [
    {
      url: `https://http2.mlstatic.com/D_NQ_NP_${idImagen}-O.webp`,
      type: "image/webp",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/webp",
      href: `https://http2.mlstatic.com/D_NQ_NP_${idImagen}-O.webp`,
    },
  ],
});

// Define getTitle function
function getTitle(title) {
  // Elimina las dos primeras palabras
  const words = title.split(" ").slice(2).join(" ");
  // Convierte el título resultante a mayúsculas
  return words.toUpperCase();
}

// Estado para saber si el usuario es admin
const isAdmin = ref(false);

// Comprobar si el token existe en localStorage cuando el componente se monta

onMounted(() => {
  if (typeof window !== "undefined") {
    isAdmin.value = !!localStorage.getItem("tokenadmin");
  }

  productos.value = [
    ...productosJsonHombre,
    ...productosJsonMujer,
    ...productosJsonHombrePuma,
    ...productosJsonMujerPuma,
  ];

  
});

// Handle admin button action
function handleAdminAction() {
  let r = route.params.title;
  let enlace = "articulo.mercadolibre.com.pe/" + r;
  navigator.clipboard
    .writeText(enlace)
    .then(() => {
      alert("Ready");
    })
    .catch((err) => {
      console.error("Error al copiar: ", err);
    });
}

 function getPrice() {

  const words = codigoProd.split(" ");

  // Extrae las dos primeras palabras y las une
  const twoFirstWords = words[0] + words[1];


  const product = this.productos.find(
    (item) => item.polycard.metadata.id === twoFirstWords
  );

  if (product) {
    let price = product.polycard.components[2].price.current_price.value;

    if(product.sex === 'varon'){
      price = price + 19;
    }else{
      price = price + 21;

    }
    return price; // Devuelve el precio como cadena
  } else {
    console.error("Producto no encontrado");
    return "f"; // Devuelve una cadena vacía si no se encuentra el producto
  }
}



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
