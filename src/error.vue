<template>
    <NuxtLayout>
        <div class="text-gray-700">
            <div class="fg"></div>
            <AppHeader />
            <main class="m-container mx-auto max-w-5xl">
                <transition name="fade" mode="out-in">
                    <Error :error="error" />
                </transition>
            </main>
            <AppFooter />
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const props = defineProps({
    error: Object
});
</script>