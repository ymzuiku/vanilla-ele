import { IStyle } from "./interface.style";
import { IEvents } from "./interface.event";

export interface ICreateEleProps extends IEvents {
  textContent?: string;
  style?: IStyle;
  className?: string;
  id?: string;
  name?: string;
  title?: string;
  onclick?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  value?: string;
  defaultValue?: string;
  checked?: boolean;
  autocomplete?: string;
  defaultChecked?: boolean;
  innerHTML?: string;
  innerText?: string;
  placeholder?: string;
  disabled?: boolean;
  text?: string;
  type?: string;
  target?: string;
  charset?: string;
  src?: string;
  classListAdd?: string[];
  classListRemove?: string[];
  classListReplace?: string[];
  hover?: IStyle,
  active?: IStyle,
  [key: string]: any;
}

declare function IEle<T extends Element>(
  tagName: T,
  props?: ICreateEleProps,
  children?: HTMLElement[]
): T;
declare function IEle<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  props?: ICreateEleProps,
  children?: HTMLElement[]
): HTMLElementTagNameMap[K];

interface IElePrototype {
  future: typeof future;
  makeStyle: (obj: IStyle) => IStyle;
}

const agents = [
  "android",
  "iphone",
  "windows phone",
  "ipad",
  "ipod"
];

let isPc = true;
const ua = navigator.userAgent.toLowerCase();
for (let v = 0; v < agents.length; v++) {
  if (ua.indexOf(agents[v]) > 0) {
    isPc = false;
    break;
  }
}


function future<K extends keyof HTMLElementTagNameMap>() {
  const state = {
    target: (null as any) as HTMLElementTagNameMap[K],
    Ele: function(
      tagName: K,
      props?: ICreateEleProps,
      children?: HTMLElement[]
    ) {
      const target = Ele(tagName, props, children);
      state.target = target;
      return target;
    }
  };

  return state;
}

const propsEvents = {
  hover:(ele:HTMLElement, obj:IStyle)=>{
    if (!isPc) {
      return;
    }
    let lastStyle = null as any;
    function enter(e:Event){
      lastStyle = {};
      Object.keys(obj).forEach(k=>{
        lastStyle[k] = (ele as any).style[k];
        (ele as any).style[k] = obj[k];
      });
    }
    function out(e:Event) {
      if (lastStyle) {
        Object.keys(lastStyle).forEach(k=>{
          (ele as any).style[k] = lastStyle[k]
        })
      }
      lastStyle = null;
    }
    ele.addEventListener('mouseenter', enter)
    ele.addEventListener('mouseleave', out);
  },
  active:(ele:HTMLElement, obj:IStyle)=>{
    let lastStyle = null as any;
    function enter(e:Event){
      lastStyle = {};
      Object.keys(obj).forEach(k=>{
        lastStyle[k] = (ele as any).style[k];
        (ele as any).style[k] = obj[k];
      });
    }
    function out(e:Event) {
      if (lastStyle) {
        Object.keys(lastStyle).forEach(k=>{
          (ele as any).style[k] = lastStyle[k]
        })
      }
      lastStyle = null;
    }
    if (isPc) {
      ele.addEventListener('mousedown', enter)
      ele.addEventListener('mouseup', out);
      ele.addEventListener('mouseleave', out);
    } else {
      ele.addEventListener('touchstart', enter)
      ele.addEventListener('touchend', out);
      ele.addEventListener('touchcancel', out);
    }
  },
  style: (ele: HTMLElement, value: IStyle) => {
    if (value) {
      Object.keys(value).forEach(k => {
        (ele as any).style[k] = value[k];
      });
    }
  },
  classListAdd: (ele: HTMLElement, value: string[]) => {
    if (ele.classList) {
      ele.classList.add(...value);
    }
  },
  classListRemove: (ele: HTMLElement, value: string[]) => {
    if (ele.classList) {
      ele.classList.remove(...value);
    }
  },
  classListReplace: (ele: any, value: string[]) => {
    if (ele.classList) {
      ele.classList.replace(...value);
    }
  }
};

const Ele: typeof IEle & IElePrototype = (
  tagName: any,
  props: any,
  children: any
) => {
  let ele = tagName;
  if (typeof tagName === "string") {
    ele = document.createElement(tagName);
  }

  if (props) {
    Object.keys(props).forEach(key => {
      const fn = (propsEvents as any)[key];
      if (fn) {
        fn(ele, props[key]);
      } else {
        (ele as any)[key] = (props as any)[key];
      }
    });
  }
  if (children) {
    ele.append(...children);
  }
  return ele;
};

Ele.future = future;

Ele.makeStyle = obj => obj;

export default Ele;
