<template>
  <div>
    <div>
      <div v-if="bestMirror == null">
        <div class="
                          inline-flex
                          items-center
                          py-4
                          px-6
                          font-semibold
                          leading-6
                          text-sm
                          shadow
                          rounded-md
                          text-white
                          bg-blue-800
                          transition
                          ease-in-out
                          duration-150
                          cursor-not-allowed
                        ">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          {{ t("Snapshots.LookingForNearestMirror") }}
        </div>
      </div>
      <div v-else>
        <div class="flex items-center">
          <BoltIcon class="w-6 h-6 text-blue-800 mr-2" />
          <div class="text-xl text-blue-800">
            {{ t("Snapshots.NearestMirror") }} {{ bestMirror.name }}
          </div>
        </div>
        <div class="mt-3 text-sm">
          <div>
            {{ t("Snapshots.ExpectedDownloadSpeed") }}: {{ bestSpeed }} MB/s
          </div>
        </div>
        <div class="flex flex-col lg:flex-row items-center lg:items-start mt-4">
          <div class="md:mr-1 grow" v-for="(snapshot, index) in bestMirror.snapshots" :key="'bsnapshot-' + index">
            <div class="flex justify-between flex-col lg:flex-row">
              <div>
                <a :href="bestMirror.path + snapshot.name" class="underline text-blue-800"
                  rel="noopener noreferrer nofollow noindex">{{ snapshot.name }}</a>
              </div>
            </div>
            <div class="text-xs mt-2 p-3 bg-gray-300 rounded">
              <div class="font-semibold">SHA256:</div>
              <div class="break-all">
                {{ sha[index] }}
              </div>
            </div>
            <div class="flex items-center text-sm text-blue-800 my-2 md:mb-0" v-if="index == 0">
              <StarIcon class="w-4 h-4 text-blue-800 mr-1" />
              {{ t("Snapshots.Recommended") }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 text-sm">
        {{ t("Snapshots.Description") }}
      </div>
    </div>
    <div class="mt-6">
      <div class="flex items-center">
        <ArrowDownTrayIcon class="w-6 h-6 text-blue-800 mr-2" />
        <div class="text-xl text-blue-800">
          {{ t("Snapshots.OtherDownloads.Title") }}
        </div>
      </div>
      <div class="mt-3 text-sm">
        <div>
          {{ t("Snapshots.OtherDownloads.Description") }}
        </div>
      </div>
      <div class="flex flex-wrap justify-between lg:grid grid-cols-2 mx-auto" v-if="network != null">
        <div class="text-sm mt-3" v-for="(mirror, index) in network.mirrors" :key="'cmirror-' + index">
          <div class="font-semibold">
            {{ t("Snapshots.Mirror") }} {{ mirror.name }}
          </div>
          <div v-for="(snapshot, sindex) in mirror.snapshots" :key="'mirror-' + index + '-snapshot-' + sindex">
            <a :href="mirror.path + snapshot.name" class="underline text-blue-800"
              rel="noopener noreferrer nofollow noindex">{{ snapshot.name }}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <div class="flex items-center">
        <InformationCircleIcon class="w-6 h-6 text-blue-800 mr-2" />
        <div class="text-xl text-blue-800">
          {{ t("Snapshots.HowToUseSnapshot") }}
        </div>
      </div>
      <div class="mt-3 text-sm">
        <div>
          {{ t("Snapshots.UseGuideDescription") }}:
          <a href="https://veil.freshdesk.com/support/solutions/articles/43000478708-how-to-use-a-snapshot"
            target="_blank" rel="noopener noreferrer nofollow noindex" class="underline text-blue-800">{{
              t("Snapshots.UseGuideLinkName") }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BoltIcon from "@heroicons/vue/24/solid/BoltIcon";
import ArrowDownTrayIcon from "@heroicons/vue/24/solid/ArrowDownTrayIcon";
import InformationCircleIcon from "@heroicons/vue/24/solid/InformationCircleIcon";
import StarIcon from "@heroicons/vue/24/solid/StarIcon";
import type { Mirror, Networks } from "@/models/Networks";

interface NetworkMeasureResult {
  mirrorName: string;
  speed: number;
}

const props = defineProps<{
  target: string;
  networksData: Networks;
}>();

const { t } = useI18n();
const config = useRuntimeConfig();

const networkMeasureFileSize = config.public.networkMeasureFileSize;
const networkPreMeasureFileSize =
  config.public.networkPreMeasureFileSize;

const network = ref(props.networksData.networks[props.target]);

const sha = ref(new Array<string>());

const bestMirror = ref<Mirror | null>(null);
const bestSpeed = ref("");

const networkMeasure = async () => {
  const timestamp = new Date().getTime();

  const measureTasks = new Array<Promise<void>>();
  const measureResults = new Array<NetworkMeasureResult>();

  for (const mirror of network.value.mirrors) {
    measureTasks.push(
      new Promise(async (resolve) => {
        try {
          const startTime = new Date().getTime();
          const res = await $fetch(
            mirror.path + "speedtest.min.bin?ts=" + timestamp
          );
          const took = new Date().getTime() - startTime; // ms
          const downloadSpeed = (
            (networkPreMeasureFileSize / 1024 / 1024) *
            (1 / (took / 1000))
          ).toFixed(2); //mb/s
          //1 / 0.7
          console.log(
            `mirror ${mirror.name} took ${took} ms, speed = ${downloadSpeed} MB/s`
          );

          measureResults.push({
            mirrorName: mirror.name,
            speed: parseFloat(downloadSpeed),
          });
        } catch {
          console.error(`failed to measure time for ${mirror.name}`);
        }

        resolve();
      })
    );
  }

  await Promise.all(measureTasks);

  const sortedResult = measureResults.sort((a, b) => b.speed - a.speed);

  let cbestMirror: Mirror | null = null;
  for (const mirror of network.value.mirrors) {
    if (mirror.name != sortedResult[0].mirrorName) continue;
    cbestMirror = mirror;
    break;
  }

  if (cbestMirror == null) {
    console.error("can't find best mirror!");
    return;
  }

  // measure real speed (used bigger file for better results)
  const startTime = new Date().getTime();
  const res = await $fetch(cbestMirror.path + "speedtest.bin?ts=" + timestamp);
  const took = new Date().getTime() - startTime; // ms
  const downloadSpeed = (
    (networkMeasureFileSize / 1024 / 1024) *
    (1 / (took / 1000))
  ).toFixed(2); //mb/s
  //1 / 0.7
  console.log(
    `best mirror ${cbestMirror.name} took ${took} ms, speed = ${downloadSpeed} MB/s`
  );

  bestSpeed.value = downloadSpeed.toString();
  bestMirror.value = cbestMirror;

  const shas = new Array<string>();
  bestMirror.value?.snapshots.forEach((snapshot) => shas.push(snapshot.sha256));

  sha.value = shas;
};

onMounted(() => {
  console.log("snapshots page loaded");
  setTimeout(networkMeasure, 10);
});
</script>