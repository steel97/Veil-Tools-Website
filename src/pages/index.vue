<template>
  <div class="py-2 md:py-40">
    <div class="grid px-4 lg:px-0 md:grid-cols-3 gap-4 duration-300">
      <HomeTopCard
        class="transition-all"
        :class="animationClass(0)"
        :labelName="t('Home.ChainSize')"
        :labelValue="'22.1 GB'"
        :updatedTime="t('Home.Time.Now')"
        ><DatabaseIcon class="h-10 w-10 mr-2 text-blue-800"
      /></HomeTopCard>
      <HomeTopCard
        class="transition-all"
        :class="animationClass(1)"
        :labelName="t('Home.BlockHeight')"
        :labelValue="'1595990'"
        :updatedTime="t('Home.Time.Now')"
        ><ViewGridIcon class="h-10 w-10 mr-2 text-blue-800"
      /></HomeTopCard>
      <HomeTopCard
        class="transition-all"
        :class="animationClass(2)"
        :labelName="'VEIL'"
        :labelValue="'0.010183 $'"
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

const animationSwitchMs = 100;
const animationDelayMs = 300;
const animationMax = 5;
let animationActive = true;
const animatedCardNum = ref(-1);
const { t } = useI18n();

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
  runAnimation();
});

onBeforeUnmount(() => (animationActive = false));
</script>