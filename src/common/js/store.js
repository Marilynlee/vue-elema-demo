/**
 * Created by Dragon-PC on 2018/9/3/0003.
 */
export function saveToLocal(id, key, value) {
  let seller = localStorage._seller_;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  localStorage._seller_ = JSON.stringify(seller);
}

export function loadFromLocal(id, key, def) {
  let seller = localStorage._seller_;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
}
