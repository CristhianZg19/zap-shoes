<template>
    <div class="my-component">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .my-component {
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  h2 {
    color: #333;
  }
  
  p {
    color: #666;
  }
  </style>
  