import request from '../utils/request'

export function getMoneyFlow(){
  return request({
    url:'/money',
    method: 'get'
  })
}