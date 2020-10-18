import axios from "axios";

class BaseServiceAxios {
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.hanldeSuccess, this.hanldeError);
    this.instance = instance;
  }

  hanldeSuccess(response) {
    return response;
  }

  hanldeError(error) {
    return Promise.reject(error);
  }

  get(url) {
    return this.instance.get(url);
  }
  post(url, body) {
    return this.instance.post(url, body);
  }
  put(url, body) {
    return this.instance.put(url, body);
  }
  delete(url) {
    return this.instance.delete(url);
  }
}

export default new BaseServiceAxios();
