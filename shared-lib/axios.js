import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { ServerConnection } from "./debounce";

// Create `axios-cache-adapter` instance
export const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  adapter: cache.adapter,
});

if (!window.api) {
  window.api = ServerConnection(api);
}

export const initHopinHttp = () => {
  return {
    hopinHttp: window.api,
  };
};
