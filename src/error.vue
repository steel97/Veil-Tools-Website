<template>
    <div>
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
    </div>
</template>

<script lang="ts" setup>
import type { NuxtError } from "#app";

const props = defineProps({
    error: Object as () => NuxtError
});
</script>