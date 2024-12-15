import type { BlockchainInfo } from "~/models/BlockchainInfo";
import { useDataCache } from "#nuxt-multi-cache/composables";
import { setResponseHeader } from "h3";

const cacheInvalidateTime = 60;

// chain info (explorer)
export default defineEventHandler(async (event) => {
  setResponseStatus(event, 200);
  setResponseHeader(event, "content-type", "application/json");

  const runtimeConfig = useRuntimeConfig();

  const { value, addToCache } = await useDataCache<BlockchainInfo>("chaininfo", event);
  if (value) {
    return value;
  }

  const cTime = Math.round(new Date().getTime() / 1000);
  let ret: BlockchainInfo = {
    status: false,
    timestamp: cTime,
    height: 0,
    sizeOnDisk: 0,
  };

  try {
    const data = await $fetch<any>(`${runtimeConfig.public.explorerBackendEndpoint}/api/getblockchaininfo`);
    ret = {
      status: true,
      timestamp: cTime,
      height: data.blocks as number,
      sizeOnDisk: data.size_on_disk as number,
    };
  }
  catch (e) {

  }

  addToCache(ret, undefined, cacheInvalidateTime);
  return ret;
});