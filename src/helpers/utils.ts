export const noop = () => {}

/**
 * 添加 class 名
 */
export const addClass = (elem: any, className: any) => {
  if (elem.className) {
    const oriName = elem.className;
    const newClass = oriName + ' ' + className;
    elem.className = newClass;
  } else {
    elem.className = className;
  }
}

/**
 * arrIndexOf
 */
export const arrIndexOf = (arr: any, v: any): number => {
  for (var i = 0; i < arr.length; i++) {
      if (arr[i] == v) {
          return i;
      }
  }
  return -1;
}

export const removeClass = (elem: any, className: any) => {
  if (elem.className !== '') {
    let arrClassName = elem.className.split(' ');
    let classIndex = arrIndexOf(arrClassName, className);

    if (classIndex !== -1) {
      arrClassName.splice(classIndex, 1);
      elem.className = arrClassName.join(' ');
    }
  }
}

export const hasClass = (elem: any, className: any): boolean => {
  if (elem.className !== '') {
    let arrClassName = elem.className.split(' ');
    let classIndex = arrIndexOf(arrClassName, className);

    if (classIndex > -1) {
      return true;
    }
  }
  return false;
}

/**
 * 添加事件的方法函数
 * @param element
 * @param type
 * @param handler
 */
export const addEvent = (element: any, type: any, handler: any) => {
  // 添加绑定
  if (element.addEventListener) {
    // 使用DOM2级方法添加事件
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    // 使用IE方法添加事件
    element.attachEvent("on" + type, handler);
  } else {
    // 使用DOM0级方法添加事件
    element["on" + type] = handler;
  }
}

/**
 * 移除事件的方法函数
 * @param element
 * @param type
 * @param handler
 */
export const removeHandler = (element: any, type: any, handler: any) => {
  if (element.removeEventListener){
     element.removeEventListener(type,handler,false);
  } else if (element.detachEvent){
     element.detachEvent("on"+type,handler);
  } else {
     element["on"+type]=null;
  }
}

/**
 * 模仿jQuery $()
 * @param selector
 * @param context
 */

export function $$(selector:any, context?:any) {
  context = arguments.length > 1 ? context : document;
  return context ? context.querySelectorAll(selector) : null;
}
