/// <reference types="pug" />
/// <reference types="node" />
import { Browser, Page } from 'puppeteer';
import { Text2ImageOptions } from './Text2ImageOptions';
export declare class Text2Image {
    browser: Browser;
    page: Page;
    options: Text2ImageOptions;
    compile: import("pug").compileTemplate;
    constructor();
    configure(options: Text2ImageOptions): Promise<void>;
    generate(content: string, path: string): Promise<Buffer>;
}
