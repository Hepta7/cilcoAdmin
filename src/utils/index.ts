export const getLoalStorage = (key: any) => {
  if (!key) return;
  return window.localStorage.getItem(key);
};

export const delLoalStorage = (key: any) => {
  if (!key) return;
  window.localStorage.removeItem(key);
};

export const setLoalStorage = (key: any, value: any) => {
  if (!key) return;
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};

// 计算角度
export const GetAngle = (p1: any, p2: any) => {
  return (180 / Math.PI) * Math.atan2(p2.y - p1.y, p2.x - p1.x);
};

// 计算两点距离
export const getDistance = (p1: any, p2: any) => {
  let dx = Math.abs(p2.x - p1.x);
  let dy = Math.abs(p2.y - p1.y);
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};

// 下载
export const downloadFile = (res: any, type: any, filename: any) => {
  // 创建blob对象，解析流数据
  const blob = new Blob([res], {
    // 设置返回的文件类型
    // type: 'application/pdf;charset=UTF-8' 表示下载文档为pdf，如果是word则设置为msword，excel为excel
    type,
  });
  // 这里就是创建一个a标签，等下用来模拟点击事件
  const a = document.createElement("a");
  // 兼容webkix浏览器，处理webkit浏览器中href自动添加blob前缀，默认在浏览器打开而不是下载
  const URL = window.URL || window.webkitURL;
  // 根据解析后的blob对象创建URL 对象
  const herf = URL.createObjectURL(blob);
  // 下载链接
  a.href = herf;
  // 下载文件名,如果后端没有返回，可以自己写a.download = '文件.pdf'
  a.download = filename;
  document.body.appendChild(a);
  // 点击a标签，进行下载
  a.click();
  // 收尾工作，在内存中移除URL 对象
  document.body.removeChild(a);
  window.URL.revokeObjectURL(herf);
};

// 不足10加0
export function zeroize(time: any) {
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
}

// 引入本地图片
export function getImageUrl(url: string): string {
  return new URL(url, import.meta.url).href;
}
export function random(min: any, max: any) {
  return Math.random() * (max - min) + min;
}

export function jsonToUrlParam(json: any) {
  return Object.keys(json)
    .map((key) => key + "=" + json[key])
    .join("&");
}

export function urlParamsToObject(url: any) {
  //获取字符串 ? 后面的部分
  const queryString = url.split("?")[1];
  const paramsArr = queryString.split("&");
  const paramObj = {} as any;

  paramsArr.forEach((param: any) => {
    const [key, value] = param.split("=");
    paramObj[key] = decodeURIComponent(value);
  });

  return paramObj;
}


export const randomInt = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};