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
        <v-text v-if="isAdmin">{{ price.toFixed(2) }}</v-text>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
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

const isAdmin = ref(false);
const price = ref("Cargando..."); // Inicialmente indica que se está cargando

onMounted(async () => {
  if (typeof window !== "undefined") {
    isAdmin.value = !!localStorage.getItem("tokenadmin");
  }

  productos.value = [
    ...productosJsonHombre,
    ...productosJsonMujer,
    ...productosJsonHombrePuma,
    ...productosJsonMujerPuma,
  ];

  // Espera hasta que los productos se carguen
  try {
    price.value = await getPrice(codigoProd);
  } catch (error) {
    console.error("Error al obtener el precio: ", error);
    price.value = "No disponible"; // Mensaje alternativo en caso de error
  }
});

async function getPrice(codigoProd) {
  const words = codigoProd.split(" ");
  const twoFirstWords = words[0] + words[1];

  // Asegúrate de que productos está definido y tiene elementos
  const product = productos.value.find(
    (item) => item.polycard.metadata.id === twoFirstWords
  );
  console.log(product)
  if (product) {
    const priceComponent = product.polycard.components.find(
      (comp) => comp.type === "price"
    );

    let precio = priceComponent.price.current_price.value;

    if (product.sex === "varon") {
      precio += 19;
    } else {
      precio += 21;
    }
    price.value = precio;

    return precio; // Devuelve el precio como cadena con dos decimales
  } else {
    console.error(
      "Producto no encontrado o estructura del producto inválida",
      product
    );
    return "No disponible"; // Mensaje alternativo en caso de error
  }
}

function handleAdminAction() {
  let enlace = "articulo.mercadolibre.com.pe/" + route.params.title;
  navigator.clipboard
    .writeText(enlace)
    .then(() => {
      alert("Link copiado al portapapeles");
    })
    .catch((err) => {
      console.error("Error al copiar: ", err);
    });
}

function getTitle(title) {
  const words = title.split(" ").slice(2).join(" ");
  return words.toUpperCase();
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
  font-size: 1.5rem;
  white-space: normal;
  overflow-wrap: break-word;
  text-align: center;
  margin: 0;
}

.product-list-container {
  padding: 0 16px;
}

.product-image {
  max-width: 100%;
}
</style>
