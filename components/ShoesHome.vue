<template>
  <v-container class="product-list-container" style="margin-top: 100px">
    <v-card class="product-list-card">
      <v-card-title class="product-list-title">
        <h2 style="color: black">
          Bienvenido <v-icon>mdi-human-greeting</v-icon>
        </h2>
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
                <p class="product-brand">{{ getBrand(producto) }}</p>
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
                    @click="quieroEsta(producto)"
                    class="mt-3 loquiero"
                    elevation="2"
                    style="border-radius: 20px; font-weight: bold"
                  >
                    Lo quiero
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
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import productosJsonHombre from "@/assets/shoesHombres.json";
import productosJsonMujer from "@/assets/shoesMujer.json";
import { useHead } from "@unhead/vue";

// Configura los metadatos de la página

useHead({
  title: "ZapShoes",
  meta: [
    { name: "description", content: "ZapShoe" },
    { property: "og:title", content: "ZapShoes" },
    { property: "og:description", content: "ZapShoes" },
    {
      property: "og:image",
      content:
        "https://fastmedicaltest.blob.core.windows.net/shoes/logo_seven.png",
    },

    {
      property: "og:image:secure_url",
      content: "https://fastmedicaltest.blob.core.windows.net/shoes/zap_shoe.png",
    },
    {
      property: "og:image:type",
      content: "image/png",
    },
    {
      property: "og:image:width",
      content: "400",
    },
    {
      property: "og:image:height",
      content: "300",
    },
    {
      property: "og:image:alt",
      content: "A shiny red apple with a bite taken out",
    },
  ],
  link: [
    {
      title: "favicon",
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "@/assets/logo_seven.png",
    }
  ],
});

const router = useRouter();
const productos = ref([]);
const display = useDisplay();

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const quieroEsta = (producto) => {
  const idImagen = producto.polycard.pictures.pictures[0].id;
  const nombreProducto = producto.polycard.metadata.url.split("/").pop();
  const url = `https://zapshoes.netlify.app/product/${idImagen}/${nombreProducto}`;
  const mensaje = `${url}`;
  const mensajeCodificado = encodeURIComponent(mensaje);
  const numeroTelefono = "+51952348779";
  const enlaceWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`;
  window.open(enlaceWhatsApp, "_blank");
};

const productoXid = (producto) => {
  const idImagen = producto.polycard.pictures.pictures[0].id;
  const title = getName(producto);
  router.push({
    path: `/product/${idImagen}/${encodeURIComponent(title)}`, // Asegúrate de codificar el título
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
  const additionalPrice = sex === "varon" ? 21 : 23;
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
    const additionalPrice = sex === "varon" ? 21 : 23;
    return (parseFloat(previousPrice) + additionalPrice).toFixed(2);
  } else {
    console.error("Precio anterior no encontrado para el producto");
    return null;
  }
};

const getImageUrl = (producto) => {
  const idImagen = producto.polycard.pictures.pictures[0].id;
  return `https://http2.mlstatic.com/D_NQ_NP_${idImagen}-O.webp`;
};

onMounted(() => {
  productos.value = [...productosJsonHombre, ...productosJsonMujer];
  productos.value = shuffleArray(productos.value);
});
</script>

<style>
/* Estilos específicos para el componente */
</style>
