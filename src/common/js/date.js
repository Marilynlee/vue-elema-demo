/**
 * Created by Dragon-PC on 2018/8/27/0027.
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let _obj = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in _obj) {
    let reg = new RegExp(`(${k})`);
    if (reg.test(fmt)) {
      let str = _obj[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1 ? str : str.padStart(2, '0')));
    }
  }
  return fmt;
}
