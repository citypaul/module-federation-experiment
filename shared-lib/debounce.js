import { MD5 } from "object-hash"; //npm install object-hash

const hash = MD5; //MD5 is less secure but much faster on my production linux machines

export const ServerConnection = (axios) => {
  const _defaultOptions = { debounce: true, ttl: 1000 };
  const _once = {};

  const cache = (func, options, ...params) => {
    options = options || _defaultOptions;
    const cachekey = hash(params);
    if (!_once[cachekey] || options["debounce"] === false) {
      _once[cachekey] = func(...params);
      return _once[cachekey];
    } else {
      setTimeout(() => delete _once[cachekey], options.ttl);
      return _once[cachekey];
    }
  };

  /**
   * POST an object to the main server.
   * Requests are debounced (cached) by default within 1-second timeframe!
   * This means that multiple calls to this method with the same parameters
   * will return the result of the first call within the last 1-second.
   *
   * @method
   * @endpoint {String}          URL
   * @data     {Object}          data to POST to the server
   * @options  {Object}          debounce options: defaults are {debounce: true, ttl:1000}
   * @return  {Promise}          Promise
   */
  const post = (endpoint, data, options) => {
    return cache(axios.post, options, endpoint, data);
  };

  /**
   * GET a url from the main server.
   * Requests are debounced (cached) by default within 1-second timeframe!
   * This means that multiple calls to this method with the same parameters
   * will return the result of the first call within the last 1-second.
   *
   * @method
   * @endpoint {String}          URL
   * @options  {Object}          debounce options: defaults are {debounce: true, ttl:1000}
   * @return  {Promise}          Promise
   */
  const get = (endpoint, options) => {
    return cache(axios.get, options, endpoint);
  };

  return {
    get,
    post,
  };
};
