<template>
  <div class="py-2 md:py-40 px-4 lg:px-0">
    <div class="border-b border-gray-50">
      <ul class="flex flex-wrap -mb-px">
        <li v-for="(val, index) in snapshots" :key="'network-' + index">
          <a
            href="#"
            class="
              inline-flex
              pb-4
              px-4
              text-sm
              font-medium
              text-center
              rounded-t-lg
              border-b-2 border-transparent
              text-gray-300
              hover:text-gray-50 hover:border-gray-300
              group
            "
          >
            <FireIcon class="mr-2 w-5 h-5 text-gray-50" />{{ val.name }}
          </a>
        </li>
        <li>
          <a
            href="#"
            class="
              inline-flex
              pb-4
              px-4
              text-sm
              font-medium
              text-center text-sky-500
              rounded-t-lg
              border-b-2 border-sky-500
              active
              group
            "
            aria-current="page"
          >
            <BeakerIcon class="mr-2 w-5 h-5 text-sky-500" />Testnet
          </a>
        </li>
      </ul>
    </div>
    <div class="rounded bg-white p-4 mt-3">
      <SnapshotsPage target="Mainnet" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FireIcon, BeakerIcon } from "@heroicons/vue/solid";
import {
  LightningBoltIcon,
  DownloadIcon,
  InformationCircleIcon,
} from "@heroicons/vue/solid";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const config = useRuntimeConfig();

const snapshots = ref(config.SNAPSHOT_MIRRORS);

const meta = computed(() => {
  return {
    title: t("Snapshots.Meta.Title"),
    meta: [
      {
        name: "description",
        content: t("Snapshots.Meta.Description"),
      },
      {
        name: "og:title",
        content: t("Snapshots.Meta.Title"),
      },
      {
        name: "og:url",
        content: `${config.BASE_URL}/snapshots`,
      },
    ],
  };
});
useMeta(meta);
</script>