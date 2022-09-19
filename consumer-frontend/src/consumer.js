const express = require("express")
const server = express()

const { default: axios } = require('axios')
const adapter = require("axios/lib/adapters/http")

axios.defaults.adapter = adapter

const getApiEndpoint = "http://localhost:8081"

class API{

  constructor(url){
    if(url === undefined || url === ""){
      url = getApiEndpoint
    }
    if (url.endsWith("/")) {
      url = url.substr(0, url.length - 1)
    }
    this.url = url
  }

  definePath(path) {
    if (!path.startsWith("/")) {
        path = "/" + path
    }
    return `${this.url}${path}`
  }

  async getClients() {
    const res = await axios
      .get(`${this.definePath('/clients')}`)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err.res
      })
    return res
  }

  async getClient(id) {
    const res = await axios
      .get(this.definePath(`/clients/${id}`))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.res
      })
    return res
  }

  async postClient(body){
    const res = await axios
    .post(this.definePath(`/clients`), body)
    .then((res) => {
        return res
      })
      .catch((err) => {
        return err.res
      })
  return res
  }


}



module.exports = {
  API,
  server
};