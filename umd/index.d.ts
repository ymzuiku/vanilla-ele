import { IStyle } from "./interface.style";
import { ICreateEleProps } from "./interfaces";
interface IElePrototype {
    future: typeof future;
    makeStyle: (obj: IStyle) => IStyle;
    isPc: boolean;
}
declare function IEle<T extends Element>(tagName: T, props?: ICreateEleProps, children?: HTMLElement[]): T;
declare function IEle<K extends keyof HTMLElementTagNameMap>(tagName: K, props?: ICreateEleProps, children?: HTMLElement[]): HTMLElementTagNameMap[K];
declare function future<K extends keyof HTMLElementTagNameMap>(): {
    target: HTMLElementTagNameMap[K];
    Ele: (tagName: K, props?: ICreateEleProps | undefined, children?: HTMLElement[] | undefined) => HTMLElementTagNameMap[K];
};
declare const Ele: typeof IEle & IElePrototype;
export default Ele;
