<template>
  <div>
    <SnapshotsPage :target="targetNetwork" :networksData="networksData" />
  </div>
</template>

<script setup lang="ts">
import type { Networks } from "@/models/Networks";

const props = defineProps<{
  networksData: Networks;
  targetNetwork: string;
}>();
</script>