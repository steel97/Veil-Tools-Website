<template>
  <div class="py-2 md:py-40 px-4 lg:px-0">
    <div class="border-b border-gray-50">
      <ul class="flex flex-wrap -mb-px">
        <li>
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
            <FireIcon class="mr-2 w-5 h-5 text-gray-50" />Mainnet
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
      <div>
        <div class="flex items-center">
          <LightningBoltIcon class="w-6 h-6 text-blue-800 mr-2" />
          <div class="text-xl text-blue-800">Nearest mirror: EU1</div>
        </div>
        <div class="mt-3 text-sm">
          <div>Size: 20.01 GB</div>
          <div>Average download time: 2 h., 12 m.</div>
        </div>
        <div class="flex flex-col md:flex-row items-center md:items-start mt-4">
          <div class="md:mr-1 grow">
            <div class="flex justify-between">
              <a
                href="https://mirror-eu1.veil.tools/20220203-veil-snapshot-1596097.zip"
                class="underline text-blue-800"
                target="_blank"
                rel="noopener noreferrer nofollow noindex"
                >20220203-veil-snapshot-1596097.zip</a
              >
              <span class="italic text-sm">(Recommended)</span>
            </div>
            <div class="text-xs mt-2 p-3 bg-gray-300 rounded">
              <div class="font-semibold">SHA256:</div>
              b2af584a1d498b1ecee25ae1f5965dbd798b3e412a3f58f0afd9664df62653d5
            </div>
          </div>

          <div class="grow md:ml-1">
            <div>
              <a
                href="https://mirror-eu1.veil.tools/20220203-veil-snapshot-1596097.zip"
                class="underline text-blue-800"
                target="_blank"
                rel="noopener noreferrer nofollow noindex"
                >20220203-veil-snapshot-1596097.zip</a
              >
            </div>
            <div class="text-xs mt-2 p-3 bg-gray-300 rounded">
              <div class="font-semibold">SHA256:</div>
              b2af584a1d498b1ecee25ae1f5965dbd798b3e412a3f58f0afd9664df62653d5
            </div>
          </div>
        </div>
        <div class="mt-6 text-sm">
          These are snapshots of a clean VEIL installation synchronized from
          scratch. They contain the folders "blocks", "chainstate", "indexes"
          and "zerocoin". New snapshots are created every three days. You should
          make sure that you have enough bandwidth and storage for the full
          blockchain snapshot.
        </div>
      </div>
      <div class="mt-6">
        <div class="flex items-center">
          <DownloadIcon class="w-6 h-6 text-blue-800 mr-2" />
          <div class="text-xl text-blue-800">Other downloads</div>
        </div>
        <div class="mt-3 text-sm">
          <div>
            In case if you encounter any problems with download mirror below,
            you can try those mirrors
          </div>
        </div>
      </div>

      <div class="mt-6">
        <div class="flex items-center">
          <InformationCircleIcon class="w-6 h-6 text-blue-800 mr-2" />
          <div class="text-xl text-blue-800">How to use a snapshot?</div>
        </div>
        <div class="mt-3 text-sm">
          <div>
            See this support article:
            <a
              href="https://veil.freshdesk.com/support/solutions/articles/43000478708-how-to-use-a-snapshot"
              target="_blank"
              rel="noopener noreferrer nofollow noindex"
              class="underline text-blue-800"
              >How to use a snapshot</a
            >
          </div>
        </div>
      </div>
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
</script>