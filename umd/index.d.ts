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
    hover?: IStyle;
    active?: IStyle;
    [key: string]: any;
}
declare function IEle<T extends Element>(tagName: T, props?: ICreateEleProps, children?: HTMLElement[]): T;
declare function IEle<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: ICreateEleProps, children?: HTMLElement[]): HTMLElementTagNameMap[K];
interface IElePrototype {
    future: typeof future;
    makeStyle: (obj: IStyle) => IStyle;
}
declare function future<K extends keyof HTMLElementTagNameMap>(): {
    target: HTMLElementTagNameMap[K];
    Ele: (tagName: K, props?: ICreateEleProps | undefined, children?: HTMLElement[] | undefined) => HTMLElementTagNameMap[K];
};
declare const Ele: typeof IEle & IElePrototype;
export default Ele;
