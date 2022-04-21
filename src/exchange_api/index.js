import Vue from 'vue'
import axios from "axios";

export default {
  jsonToQuery : function(param, keyString) {
    if (typeof param != "object") {
      return false
    }

    var str = ""
    for (var key in param) {
      str += `${key}=${param[key]}&`
    }

    return str
  },
  request : async function (method,uri,data=undefined){
    let app = new Vue()

    if(method == "GET" && data != undefined){
      uri += "?" + this.jsonToQuery(data)
    }

    var response = {}
    try {

      if(method == "GET") {
        response = await axios.get(`${window.front_env.VUE_APP_BASE_EXCHANGE_API_URI}${uri}`, {
          withCredentials: true
        })
      }else if(method == "POST"){
        var fd = new FormData();

        for (var index in data) {
          if (typeof data[index] == 'object'){
            for (var index2 in data[index]) {
              fd.append(index + `[${index2}]`, data[index][index2])
            }
          }else {
            fd.append(index, data[index])
          }
        }
        response = await axios.post(`${window.front_env.VUE_APP_BASE_EXCHANGE_API_URI}${uri}`, fd,{
          withCredentials: true,
          headers : {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
    }catch (e) {
      return false
    }

    var data = response.data
    return data
  },

  getPrice : async function(req){
    var res = await this.request("GET","/exchange/price",req.data)
    return res
  }
};
