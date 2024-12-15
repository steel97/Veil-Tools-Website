<template>
  <div class="py-2 md:py-40">
    <div class="grid px-4 lg:px-0 md:grid-cols-3 gap-4 duration-300">
      <HomeTopCard
        class="transition-all" :class="animationClass(0)" :label-name="t('Home.ChainSize')"
        :label-value="getFormattedSize" :updated-time="t('Home.Time.Now')"
      >
        <CircleStackIcon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeTopCard>
      <HomeTopCard
        class="transition-all" :class="animationClass(1)" :label-name="t('Home.BlockHeight')"
        :label-value="chainInfo != null ? chainInfo.height.toString() : '0'" :updated-time="t('Home.Time.Now')"
      >
        <Squares2X2Icon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeTopCard>
      <HomeTopCard
        class="transition-all" :class="animationClass(2)" label-name="VEIL"
        :label-value="`${currentPrice?.price} $`" :updated-time="t('Home.Time.Now')"
      >
        <ChartBarIcon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeTopCard>
    </div>
    <div class="grid px-4 lg:px-0 md:grid-cols-3 gap-4 mt-4">
      <HomeBottomCard
        class="transition-all" :class="animationClass(3)" :label-name="t('Home.BlockExplorer.Title')"
        :label-value="t('Home.BlockExplorer.Description')" link-to="https://explorer.veil-project.com"
      >
        <MagnifyingGlassIcon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeBottomCard>
      <HomeBottomCard
        class="transition-all" :class="animationClass(4)" :label-name="t('Home.Snapshots.Title')"
        :label-value="t('Home.Snapshots.Description')" link-to="/snapshots"
      >
        <ArrowDownTrayIcon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeBottomCard>
      <HomeBottomCard
        class="transition-all" :class="animationClass(5)" :label-name="t('Home.VeilStats.Title')"
        :label-value="t('Home.VeilStats.Description')" link-to="https://veil-stats.com"
      >
        <ChartPieIcon class="h-10 w-10 mr-2 text-blue-800" />
      </HomeBottomCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlockchainInfo } from "@/models/BlockchainInfo";
import type { PriceInfo } from "@/models/PriceInfo";
import ArrowDownTrayIcon from "@heroicons/vue/24/solid/ArrowDownTrayIcon";
import ChartBarIcon from "@heroicons/vue/24/solid/ChartBarIcon";
import ChartPieIcon from "@heroicons/vue/24/solid/ChartPieIcon";
import CircleStackIcon from "@heroicons/vue/24/solid/CircleStackIcon";
import MagnifyingGlassIcon from "@heroicons/vue/24/solid/MagnifyingGlassIcon";
import Squares2X2Icon from "@heroicons/vue/24/solid/Squares2X2Icon";
import { useI18n } from "vue-i18n";

const animationSwitchMs = 100;
const animationDelayMs = 300;
const animationMax = 5;
let animationActive = true;
const animatedCardNum = ref(-1);

const { t } = useI18n();
const currentPrice = ref(
  (await useFetch<PriceInfo>("/api/getprice")).data,
);
const chainInfo = ref(
  (await useFetch<BlockchainInfo>("/api/getchaininfo")).data,
);

const getFormattedSize = computed(
  () =>
    `${Number.parseFloat(
      ((chainInfo.value?.sizeOnDisk ?? 0) / 1024 / 1024 / 1024).toFixed(2),
    ).toString()} GB`,
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
      },
    ],
  };
});
useHead(meta);

definePageMeta({
  title: "Home.Meta.Title",
  key: route => "/",
});

const animationClass = (cardNum: number) => {
  const classes = [`duration-${animationDelayMs}`];
  if (cardNum <= animatedCardNum.value) {
    classes.push("opacity-100 scale-100");
  }
  else {
    classes.push("opacity-0 scale-0");
  }
  return classes;
};

const runAnimation = () => {
  if (!animationActive)
    return;

  animatedCardNum.value++;

  if (animatedCardNum.value === animationMax)
    return;

  setTimeout(runAnimation, animationSwitchMs);
};

onMounted(() => {
  setTimeout(runAnimation, 10);
});

onBeforeUnmount(() => (animationActive = false));
</script>