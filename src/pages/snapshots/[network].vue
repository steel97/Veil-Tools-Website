<template>
  <div>
    <SnapshotsPage :target="targetNetwork" :networksData="networksData" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  networksData: Networks;
  targetNetwork: string;
}>();
</script>