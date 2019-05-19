// 判断值是否为空，空返回true
export function isEmpty(value){
  return (
    value === undefined || 
    value === null || 
    (typeof value ==="object" && Object.keys(value).length ===0) ||
    (typeof value ==="string" && value.trim().length ===0)
  )
}

// export default {
//   isEmpty
// }