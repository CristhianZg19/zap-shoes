<template>
  <v-container class="product-list-container" style="margin-top: 100px">
    <v-card class="product-list-card">
      <v-card-title class="product-list-title">
        <h1 style="color: black">
          <h2 style="color: black">Damas <v-icon>mdi-shoe-heel</v-icon></h2>
        </h1>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="producto in productos"
            :key="producto.id"
          >
            <v-card class="product-card">
              <v-img
                :src="getImageUrl(producto)"
                :alt="getTitle(producto)"
                height="200"
                class="product-image"
                style="background-color: white"
              ></v-img>
              <v-card-text>
                <p class="product-brand">
                  {{ getBrand(producto) }}
                  <span style="float: right">
                    <v-icon class="copiarEnlace" @click="copiaEnlace(producto)"
                      >mdi-content-copy</v-icon
                    >
                  </span>
                </p>
                <h3 class="product-title">{{ getTitle(producto) }}</h3>
                <div class="product-details">
                  <div class="product-prices">
                    <p class="product-price">
                      S/ {{ getCurrentPrice(producto) }}
                    </p>
                    <p class="product-previous-price">
                      S/ {{ getPreviousPrice(producto) }}
                    </p>
                  </div>
                  <v-btn
                    @mouseover="producto.hover = true"
                    @mouseleave="producto.hover = false"
                    @click="quieroEsta(producto)"
                    class="mt-3 loquiero"
                    elevation="2"
                  >
                    {{
                      producto.hover
                        ? "lo quiero y lo tengo"
                        : "Lo veo y lo quiero"
                    }}
                  </v-btn>
                </div>
                <div class="product-sizes">
                  <p class="product-sizes-title">Tallas disponibles:</p>
                  <span
                    class="product-size"
                    v-for="size in getSizesBySex(getSex(producto))"
                    :key="size"
                  >
                    {{ size }}
                  </span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="3000" location="top">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
                    
                    <script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import productosJsonHombre from "@/assets/adidasHombre.json";

import productosJsonHombrePuma from "@/assets/pumasHombre.json";

// Configura los metadatos de la página
useSeoMeta({
  title: "ZapShoes - Tu Tienda de Zapatillas Online",
  description:
    "ZapShoes es tu tienda en línea de zapatillas, ofreciendo una amplia variedad de modelos y estilos para todos los gustos.",
  ogDescription:
    "ZapShoes es tu tienda en línea de zapatillas, ofreciendo una amplia variedad de modelos y estilos para todos los gustos.",
  ogImage:
    "https://fastmedicaltest.blob.core.windows.net/fastmedical/logoweb.webp",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      hid: "description",
      name: "description",
      content:
        "ZapShoes es tu tienda en línea de zapatillas, ofreciendo una amplia variedad de modelos y estilos para todos los gustos.",
    },
    {
      name: "keywords",
      content:
        "zapatillas, tienda de zapatillas, zap shoes, calzado, moda, compra zapatillas, estilos de zapatillas",
    },

    // Open Graph Meta Tags
    { property: "og:title", content: "ZapShoes - Tienda de Zapatillas Online" },
    {
      property: "og:description",
      content:
        "ZapShoes es tu tienda en línea de zapatillas, ofreciendo una amplia variedad de modelos y estilos para todos los gustos.",
    },
    { property: "og:url", content: "https://zapshoes.netlify.app" },
    { property: "og:type", content: "website" },
    {
      property: "og:image",
      content:
        "https://fastmedicaltest.blob.core.windows.net/fastmedical/logoweb.webp",
    },
    { property: "og:site_name", content: "ZapShoes" },
    { property: "og:locale", content: "es_ES" },

    // Robots Meta Tag
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Cristhian Zapata Galdos" },
  ],
});

const router = useRouter();
const productos = ref([]);
const display = useDisplay();
const hover = ref(null); // Variable para rastrear el botón sobre el que está el cursor
const snackbar = ref(false);
const snackbarMessage = ref("");
const y = ref("top");

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const showSnackbar = (message) => {
  snackbarMessage.value = message;
  snackbar.value = true;
};
const quieroEsta = (producto) => {
  const idImagen = producto.polycard.pictures.pictures[0].id;

  const idproduc = producto.polycard.metadata.id;

  const nombreProducto = producto.polycard.metadata.url.split("/").pop();
  const url = `https://zap-shoes.netlify.app/product/${idImagen}/${nombreProducto}`;
  const mensaje = `${url}`;
  const mensajeCodificado = encodeURIComponent(mensaje);
  const numeroTelefono = "+51952348779";
  const enlaceWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`;
  window.open(enlaceWhatsApp, "_blank");
};

const copiaEnlace = (producto) => {
  const idImagen = producto.polycard.pictures.pictures[0].id;
  const nombreProducto = producto.polycard.metadata.url.split("/").pop();

  // Construct the URL without encoding
  const url = `https://zap-shoes.netlify.app/product/${idImagen}/${nombreProducto}`;

  navigator.clipboard
    .writeText(url)
    .then(() => {
      showSnackbar("Enlace copiado!");

      console.log("URL copied to clipboard!");
    })
    .catch((err) => {
      // console.error("Failed to copy URL: ", err);
    });
};

const productoXid = (producto) => {
  const idImagen = producto.polycard.pictures.pictures[0].id;

  const idproduc = producto.polycard.metadata.id;

  const title = getName(producto);
  router.push({
    path: `/product/${idImagen}/${encodeURIComponent(title)}_-${idproduc}`, // Asegúrate de codificar el título
  });
};

const getName = (producto) => {
  let url = producto.polycard.metadata.url;
  let path = url.replace(/^(?:https?:\/\/)?(?:www\.)?[^\/]+\/+/i, "");
  return path;
};

const getSex = (producto) => {
  return producto.sex;
};

const getSizesBySex = (sex) => {
  const sizes = {
    varon: [40, 41, 42, 43],
    mujer: [36, 37, 38, 39],
  };
  return sizes[sex] || [];
};

const getBrand = (producto) => {
  return producto.polycard.components.find((comp) => comp.type === "brand")
    .brand.text;
};

const getTitle = (producto) => {
  let title = producto.polycard.components.find((comp) => comp.type === "title")
    .title.text;

  if (display.mobile === false) {
    if (title.length > 40) {
      title = title.substring(0, 40) + "...";
    }
  } else {
    if (title.length > 51) {
      title = title.substring(0, 50) + "...";
    }
  }

  return title;
};

const getCurrentPrice = (producto) => {
  const price = producto.polycard.components.find(
    (comp) => comp.type === "price"
  ).price.current_price.value;
  const sex = getSex(producto);
  const additionalPrice = sex === "varon" ? 19 : 21;
  return (Number(price) + additionalPrice).toFixed(2);
};

const getPreviousPrice = (producto) => {
  const priceComponent = producto.polycard.components.find(
    (comp) => comp.type === "price"
  );
  if (
    priceComponent &&
    priceComponent.price &&
    priceComponent.price.previous_price &&
    priceComponent.price.previous_price.value
  ) {
    const previousPrice = priceComponent.price.previous_price.value;
    const sex = getSex(producto);
    const additionalPrice = sex === "varon" ? 19 : 21;
    return (parseFloat(previousPrice) + additionalPrice).toFixed(2);
  } else {
    //console.error("Precio anterior no encontrado para el producto");
    return null;
  }
};

const getImageUrl = (producto) => {
  const idImagen = producto.polycard.pictures.pictures[0].id;
  return `https://http2.mlstatic.com/D_NQ_NP_${idImagen}-O.webp`;
};

onMounted(() => {
  productos.value = [...productosJsonHombre, ...productosJsonHombrePuma];
  productos.value = productos.value.map((producto) => ({
    ...producto,
    hover: false, // Añadir la propiedad hover a cada producto
  }));
  productos.value = shuffleArray(productos.value);
});
</script>
                    
                    <style>
/* Estilos específicos para el componente */

</style>
                    
