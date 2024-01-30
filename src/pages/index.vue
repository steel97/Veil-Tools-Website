<template>
  <div class="py-2 md:py-40">
    <div class="grid px-4 lg:px-0 md:grid-cols-3 gap-4 duration-300">
      <HomeTopCard class="transition-all" :class="animationClass(0)" :labelName="t('Home.ChainSize')"
        :labelValue="getFormattedSize" :updatedTime="t('Home.Time.Now')">
        <CircleStackIcon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeTopCard>
      <HomeTopCard class="transition-all" :class="animationClass(1)" :labelName="t('Home.BlockHeight')"
        :labelValue="chainInfo != null ? chainInfo.height.toString() : '0'" :updatedTime="t('Home.Time.Now')">
        <Squares2X2Icon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeTopCard>
      <HomeTopCard class="transition-all" :class="animationClass(2)" :labelName="'VEIL'"
        :labelValue="currentPrice?.price + ' $'" :updatedTime="t('Home.Time.Now')">
        <ChartBarIcon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeTopCard>
    </div>
    <div class="grid px-4 lg:px-0 md:grid-cols-3 gap-4 mt-4">
      <HomeBottomCard class="transition-all" :class="animationClass(3)" :labelName="t('Home.BlockExplorer.Title')"
        :labelValue="t('Home.BlockExplorer.Description')" :linkTo="'https://explorer.veil-project.com'">
        <MagnifyingGlassIcon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeBottomCard>
      <HomeBottomCard class="transition-all" :class="animationClass(4)" :labelName="t('Home.Snapshots.Title')"
        :labelValue="t('Home.Snapshots.Description')" :linkTo="'/snapshots'">
        <ArrowDownTrayIcon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeBottomCard>
      <HomeBottomCard class="transition-all" :class="animationClass(5)" :labelName="t('Home.VeilStats.Title')"
        :labelValue="t('Home.VeilStats.Description')" :linkTo="'https://veil-stats.com'">
        <ChartPieIcon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeBottomCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import CircleStackIcon from "@heroicons/vue/24/solid/CircleStackIcon";
import Squares2X2Icon from "@heroicons/vue/24/solid/Squares2X2Icon";
import ChartBarIcon from "@heroicons/vue/24/solid/ChartBarIcon";
import MagnifyingGlassIcon from "@heroicons/vue/24/solid/MagnifyingGlassIcon";
import ArrowDownTrayIcon from "@heroicons/vue/24/solid/ArrowDownTrayIcon";
import ChartPieIcon from "@heroicons/vue/24/solid/ChartPieIcon";
import { useI18n } from "vue-i18n";
import type { PriceInfo } from "@/models/PriceInfo";
import type { BlockchainInfo } from "@/models/BlockchainInfo";

const animationSwitchMs = 100;
const animationDelayMs = 300;
const animationMax = 5;
let animationActive = true;
const animatedCardNum = ref(-1);

const { t } = useI18n();
const currentPrice = ref(
  (await useFetch<PriceInfo>("/api/getprice")).data
);
const chainInfo = ref(
  (await useFetch<BlockchainInfo>("/api/getchaininfo")).data
);

const getFormattedSize = computed(
  () =>
    parseFloat(
      ((chainInfo.value?.sizeOnDisk ?? 0) / 1024 / 1024 / 1024).toFixed(2)
    ).toString() + " GB"
);

const meta = computed(() => {
  return {
    meta: [
      {
        name: "description",
        content: t("Home.Meta.Description"),
      },
      {
        name: "og:title",
        content: t("Home.Meta.Title"),
      }
    ],
  };
});
useHead(meta);

definePageMeta({
  title: "Home.Meta.Title",
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