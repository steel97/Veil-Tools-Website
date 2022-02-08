<template>
  <div class="py-2 md:py-40">
    <div class="grid px-4 lg:px-0 md:grid-cols-3 gap-4 duration-300">
      <HomeTopCard
        class="transition-all"
        :class="animationClass(0)"
        :labelName="t('Home.ChainSize')"
        :labelValue="getFormattedSize"
        :updatedTime="t('Home.Time.Now')"
        ><DatabaseIcon class="h-10 w-10 mr-2 text-blue-800"
      /></HomeTopCard>
      <HomeTopCard
        class="transition-all"
        :class="animationClass(1)"
        :labelName="t('Home.BlockHeight')"
        :labelValue="chainInfo != null ? chainInfo.height.toString() : '0'"
        :updatedTime="t('Home.Time.Now')"
        ><ViewGridIcon class="h-10 w-10 mr-2 text-blue-800"
      /></HomeTopCard>
      <HomeTopCard
        class="transition-all"
        :class="animationClass(2)"
        :labelName="'VEIL'"
        :labelValue="currentPrice.price + ' $'"
        :updatedTime="t('Home.Time.Now')"
        ><ChartBarIcon class="h-10 w-10 mr-2 text-blue-800"
      /></HomeTopCard>
    </div>
    <div class="grid px-4 lg:px-0 md:grid-cols-3 gap-4 mt-4">
      <HomeBottomCard
        class="transition-all"
        :class="animationClass(3)"
        :labelName="t('Home.BlockExplorer.Title')"
        :labelValue="t('Home.BlockExplorer.Description')"
        :linkTo="'https://explorer.veil-project.com'"
      >
        <SearchIcon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeBottomCard>
      <HomeBottomCard
        class="transition-all"
        :class="animationClass(4)"
        :labelName="t('Home.Snapshots.Title')"
        :labelValue="t('Home.Snapshots.Description')"
        :linkTo="'/snapshots'"
      >
        <DownloadIcon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeBottomCard>
      <HomeBottomCard
        class="transition-all"
        :class="animationClass(5)"
        :labelName="t('Home.VeilStats.Title')"
        :labelValue="t('Home.VeilStats.Description')"
        :linkTo="'https://veil-stats.com'"
      >
        <ChartPieIcon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeBottomCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DatabaseIcon,
  ViewGridIcon,
  ChartBarIcon,
  SearchIcon,
  DownloadIcon,
  ChartPieIcon,
} from "@heroicons/vue/solid";
import { useI18n } from "vue-i18n";
import { PriceInfo } from "@/models/PriceInfo";
import { BlockchainInfo } from "@/models/BlockchainInfo";

const animationSwitchMs = 100;
const animationDelayMs = 300;
const animationMax = 5;
let animationActive = true;
const animatedCardNum = ref(-1);

const { t } = useI18n();
const config = useRuntimeConfig();
const currentPrice = ref(
  (await useFetch<string, PriceInfo>("/api/getprice")).data
);
const chainInfo = ref(
  (await useFetch<string, BlockchainInfo>("/api/getchaininfo")).data
);

const getFormattedSize = computed(
  () =>
    parseFloat(
      ((chainInfo.value?.sizeOnDisk ?? 0) / 1024 / 1024 / 1024).toFixed(2)
    ).toString() + " GB"
);

const meta = computed(() => {
  return {
    title: t("Home.Meta.Title"),
    meta: [
      {
        name: "description",
        content: t("Home.Meta.Description"),
      },
      {
        name: "og:title",
        content: t("Home.Meta.Title"),
      },
      {
        name: "og:url",
        content: `${config.BASE_URL}/`,
      },
    ],
  };
});
useMeta(meta);

definePageMeta({
  key: (route) => "/",
});

const animationClass = (cardNum: number) => {
  const classes = [`duration-${animationDelayMs}`];
  if (cardNum <= animatedCardNum.value) {
    classes.push("opacity-100 scale-100");
  } else {
    classes.push("opacity-0 scale-0");
  }
  return classes;
};

const runAnimation = () => {
  if (!animationActive) return;

  animatedCardNum.value++;

  if (animatedCardNum.value == animationMax) return;

  setTimeout(runAnimation, animationSwitchMs);
};

onMounted(() => {
  setTimeout(runAnimation, 10);
});

onBeforeUnmount(() => (animationActive = false));
</script>