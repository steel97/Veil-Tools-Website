import type { BlockchainInfo } from "~/models/BlockchainInfo";
import { setResponseHeader } from "h3";

const cacheInvalidateTime = 60;
const cacheInvalidateTimeRetry = cacheInvalidateTime - 2;

// chain info (explorer)
export default defineEventHandler(async (event) => {
  setResponseStatus(event, 200);
  setResponseHeader(event, "content-type", "application/json");

  const runtimeConfig = useRuntimeConfig();

  const { value, addToCache } = await useDataCache<BlockchainInfo>("chaininfo", event);
  const cache = await useDataCache<boolean>("chaininfoCache", event);

  const cTime = Math.round(new Date().getTime() / 1000);
  const ret: BlockchainInfo = {
    status: false,
    timestamp: cTime,
    height: 0,
    sizeOnDisk: 0,
  };

  if (!cache.value) {
    cache.addToCache(true, undefined, cacheInvalidateTimeRetry);
    setTimeout(async () => {
      try {
        const data = await $fetch<any>(`${runtimeConfig.public.explorerBackendEndpoint}/api/getblockchaininfo`);
        const cacheData = {
          status: true,
          timestamp: cTime,
          height: data.blocks as number,
          sizeOnDisk: data.size_on_disk as number,
        };
        addToCache(cacheData, undefined);
      }
      catch (e) {

      }
    }, 1);
  }

  if (value) {
    return value;
  }

  return ret;
});