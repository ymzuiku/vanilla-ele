import style, { IStyle } from "vanilla-style";

export interface IEvents {
  oninput?: (this: GlobalEventHandlers, ev: Event) => any;
  onchange?: (this: GlobalEventHandlers, ev: Event) => any;
  onfocus?: (this: GlobalEventHandlers, ev: FocusEvent) => any;
  onblur?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  oncancel?: (this: GlobalEventHandlers, ev: Event) => any;
  onscroll?: (this: GlobalEventHandlers, ev: Event) => any;
  onwheel?: (this: GlobalEventHandlers, ev: WheelEvent) => any;
  oncut?: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
  oncopy?: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
  onpaste?: (this: DocumentAndElementEventHandlers, ev: ClipboardEvent) => any;
  onplay?: (this: GlobalEventHandlers, ev: Event) => any;
  onpause?: (this: GlobalEventHandlers, ev: Event) => any;
  onplaying?: (this: GlobalEventHandlers, ev: Event) => any;
  onresize?: (this: GlobalEventHandlers, ev: UIEvent) => any;
  onreset?: (this: GlobalEventHandlers, ev: Event) => any;
  onselect?: (this: GlobalEventHandlers, ev: Event) => any;
  onmousedown?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onmouseenter?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onmouseleave?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onmouseout?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onmouseup?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
  ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
  ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
  ontransitionrun?: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
  ontransitionstart?: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
  ontransitionend?: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
  ontransitioncancel?: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
  onfullscreenchange?: (this: Element, ev: Event) => any;
  onfullscreenerror?: (this: Element, ev: Event) => any;
  oninvalid?: (this: GlobalEventHandlers, ev: Event) => any;
  onkeydown?: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
  onkeypress?: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
  onkeyup?: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
  onload?: (this: GlobalEventHandlers, ev: Event) => any;
  onloadeddata?: (this: GlobalEventHandlers, ev: Event) => any;
  onloadstart?: (this: GlobalEventHandlers, ev: Event) => any;
  onloadedmetadata?: (this: GlobalEventHandlers, ev: Event) => any;
  onprogress?: (this: GlobalEventHandlers, ev: ProgressEvent) => any;
  onabort?: (this: GlobalEventHandlers, ev: UIEvent) => any;
  onanimationcancel?: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
  onanimationend?: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
  onanimationiteration?: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
  onanimationstart?: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
}

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
  style: typeof style;
}

function future<K extends keyof HTMLElementTagNameMap>(tag?: K) {
  const data = {
    target: (null as any) as HTMLElementTagNameMap[K],
    Ele: function(
      tagName: K,
      props?: ICreateEleProps,
      children?: HTMLElement[]
    ) {
      const target = Ele(tagName, props, children);
      data.target = target;
      return target;
    }
  };

  return data;
}

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
      if (key === "style") {
        style(props[key])(ele);
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
Ele.style = style;

export default Ele;
