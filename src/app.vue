<template>
  <div>
    <div class="fg"></div>
    <AppHeader />
    <main class="m-container mx-auto max-w-5xl">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import "@/assets/css/tailwind.css";
import "@/assets/css/common.css";
</script>