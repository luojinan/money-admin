import request from '../utils/request'

export function getMoneyFlow(){
  return request({
    url:'/money',
    method: 'get'
  })
}

export function addMoneyFlow(data){
  return request({
    url:'/money/addMoney',
    method: 'post',
    data
  })
}

export function deleteMoneyFlow(id){
  return request({
    url:`/money/delete/${id}`,
    method: 'delete'
  })
}

export function editMoneyFlow(id,data){
  return request({
    url:`/money/edit/${id}`,
    method: 'post',
    data
  })
}