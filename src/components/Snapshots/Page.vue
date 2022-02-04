<template>
  <div>
    <div>
      <div v-if="bestMirror != null">
        <div class="flex items-center">
          <LightningBoltIcon class="w-6 h-6 text-blue-800 mr-2" />
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
          <div class="md:mr-1 grow">
            <div class="flex justify-between flex-col lg:flex-row">
              <a
                :href="bestMirror.path + availableSnapshots.snapshots[0].name"
                class="underline text-blue-800"
                rel="noopener noreferrer nofollow noindex"
                >{{ availableSnapshots.snapshots[0].name }}</a
              >
              <span class="italic text-sm"
                >({{ t("Snapshots.Recommended") }})</span
              >
            </div>
            <div class="text-xs mt-2 p-3 bg-gray-300 rounded">
              <div class="font-semibold">SHA256:</div>
              <div class="break-all">
                {{ sha1 }}
              </div>
            </div>
          </div>

          <div class="grow md:ml-1">
            <div>
              <a
                :href="bestMirror.path + availableSnapshots.snapshots[1].name"
                class="underline text-blue-800"
                rel="noopener noreferrer nofollow noindex"
                >{{ availableSnapshots.snapshots[1].name }}</a
              >
            </div>
            <div class="text-xs mt-2 p-3 bg-gray-300 rounded">
              <div class="font-semibold">SHA256:</div>
              <div class="break-all">
                {{ sha2 }}
              </div>
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
        <DownloadIcon class="w-6 h-6 text-blue-800 mr-2" />
        <div class="text-xl text-blue-800">
          {{ t("Snapshots.OtherDownloads.Title") }}
        </div>
      </div>
      <div class="mt-3 text-sm">
        <div>
          {{ t("Snapshots.OtherDownloads.Description") }}
        </div>
      </div>
      <div class="flex flex-wrap justify-between lg:grid grid-cols-2 mx-auto">
        <div
          class="text-sm mt-3"
          v-for="(mirror, index) in network.mirrors"
          :key="'cmirror-' + index"
        >
          <div class="font-semibold">
            {{ t("Snapshots.Mirror") }} {{ mirror.name }}
          </div>
          <div>
            <a
              :href="mirror.path + availableSnapshots.snapshots[0].name"
              class="underline text-blue-800"
              rel="noopener noreferrer nofollow noindex"
              >{{ availableSnapshots.snapshots[0].name }}</a
            >
          </div>
          <div>
            <a
              :href="mirror.path + availableSnapshots.snapshots[1].name"
              class="underline text-blue-800"
              rel="noopener noreferrer nofollow noindex"
              >{{ availableSnapshots.snapshots[1].name }}</a
            >
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
          <a
            href="https://veil.freshdesk.com/support/solutions/articles/43000478708-how-to-use-a-snapshot"
            target="_blank"
            rel="noopener noreferrer nofollow noindex"
            class="underline text-blue-800"
            >{{ t("Snapshots.UseGuideLinkName") }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LightningBoltIcon,
  DownloadIcon,
  InformationCircleIcon,
} from "@heroicons/vue/solid";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  name: string;
}>();

const { t } = useI18n();
const config = useRuntimeConfig();

const networkMeasureFileSize = config.NETWORK_MEASURE_FILE_SIZE as number;

const snapshots = ref(config.SNAPSHOT_MIRRORS);
const network = ref<any>(null);

snapshots.value.forEach((val) => {
  if (val.name != props.name) return;

  network.value = val;
});

const snapshotsData = await useFetch(
  network.value.mirrors[0].path + "snapshot.json"
);
const availableSnapshots = ref(snapshotsData.data);
const sha1raw = await useFetch(
  network.value.mirrors[0].path + availableSnapshots.value.snapshots[0].sha256
);
const sha2raw = await useFetch(
  network.value.mirrors[0].path + availableSnapshots.value.snapshots[1].sha256
);

const sha1 = ref(sha1raw.data.value.split(" ")[0]);
const sha2 = ref(sha2raw.data.value.split(" ")[0]);

const bestMirror = ref<any>(null);
const bestSpeed = ref("");

const networkMeasure = async () => {
  const timestamp = new Date().getTime();

  let bestDlSpeed = 0;
  let bestMirrorf = null;

  for (const mirror of network.value.mirrors) {
    const startTime = new Date().getTime();
    const res = await $fetch(mirror.path + "speedtest.bin?ts=" + timestamp);
    const took = new Date().getTime() - startTime; // ms
    const downloadSpeed = (
      (networkMeasureFileSize / 1024 / 1024) *
      (1 / (took / 1000))
    ).toFixed(2); //mb/s
    //1 / 0.7
    console.log(
      `mirror ${mirror.name} took ${took} speed = ${downloadSpeed} MB/s`
    );
    if (bestDlSpeed < downloadSpeed) {
      bestDlSpeed = downloadSpeed;
      bestMirrorf = mirror;
    }
  }

  console.log(`best mirror ${bestMirrorf.name}`);

  bestSpeed.value = bestDlSpeed.toString();
  bestMirror.value = bestMirrorf;
};

onMounted(() => {
  setTimeout(networkMeasure, 10);
});
</script>