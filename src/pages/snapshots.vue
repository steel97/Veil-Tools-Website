<template>
  <div class="py-2 md:py-10 px-4 lg:px-0">
    <div class="border-b border-gray-50">
      <ul class="flex flex-wrap -mb-px">
        <li v-for="(val, index) in snapshots" :key="'network-' + index">
          <NuxtLink
            :to="'/snapshots/' + val.name.toLowerCase()"
            class="
              inline-flex
              pb-4
              px-4
              text-sm
              font-medium
              text-center
              rounded-t-lg
              border-b-2 border-transparent
              group
            "
            :class="tabClass(val.name)"
          >
            <img
              :src="val.icon"
              class="mr-2 w-5 h-5"
              :class="tabIconClass(val.name)"
            />{{ val.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="rounded bg-white p-4 mt-3">
      <transition name="fade" mode="out-in">
        <div :key="route.path">
          <NuxtPage :targetNetwork="targetNetwork" :networksData="networks" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Mirror, Networks } from "@/models/Networks";

const { t } = useI18n();
const config = useRuntimeConfig();

const snapshots = ref(config.SNAPSHOT_MIRRORS);
const networks = ref(
  (await useFetch<string, Networks>("/api/getmirrors")).data
);

const route = useRoute();
const defaultNetwork = "mainnet";
const getNetwork = () => {
  let cnetwork =
    (route.params.network as any as string | null) ?? defaultNetwork;
  if (cnetwork == "") cnetwork = defaultNetwork;
  return cnetwork;
};

let targetNetwork = ref(getNetwork());

watch(route, (nval) => {
  targetNetwork.value = getNetwork();
});

const tabClass = (tabName: string) => {
  if (tabName.toLowerCase() == targetNetwork.value) {
    return ["text-sky-500", "border-sky-500"];
  }
  return ["text-gray-300", "hover:text-gray-50", "hover:border-gray-300"];
};

const tabIconClass = (tabName: string) => {
  if (tabName.toLowerCase() == targetNetwork.value) {
    return ["afilter"];
  }
  return ["nfilter"];
};

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

definePageMeta({
  key: (route) => "/snapshots",
});
</script>

<style>
.nfilter {
  filter: invert(100%) sepia(2%) saturate(6748%) hue-rotate(175deg)
    brightness(93%) contrast(82%);
}

.afilter {
  filter: invert(48%) sepia(96%) saturate(1114%) hue-rotate(166deg)
    brightness(94%) contrast(95%);
}
</style>