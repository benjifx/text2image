"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = require("puppeteer");
const pug_1 = require("pug");
const defaultFont = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`;
const template = `
<!DOCTYPE html>
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    meta(http-equiv="X-UA-Compatible", content="ie=edge")
    each url in fontUrls
      link(href=url, rel="stylesheet")
    title Document
    style.
      html, body {
        height: 100%;
      }

      body {
        font-family: #{fontFamily};
        font-size: #{fontSize};
        color: #{color};
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .content {
        text-align: center;
        white-space: pre;
      }
  body
    .content #{content}
`;
class Text2Image {
    constructor() {
        this.compile = pug_1.compile(template);
    }
    async configure(options) {
        this.options = options;
        this.browser = await puppeteer_1.launch();
        this.page = await this.browser.newPage();
        await this.page.setViewport({
            width: this.options.width,
            height: this.options.height,
        });
    }
    async generate(content, path) {
        const { fontSize, color } = this.options;
        const html = this.compile({
            fontSize,
            color,
            fontUrls: this.options.fonts.map((f) => f.url),
            fontFamily: [...this.options.fonts.map((f) => `'${f.name}'`), defaultFont].join(', '),
            content,
        });
        await this.page.setContent(html);
        return this.page.screenshot({ path, omitBackground: true });
    }
}
exports.Text2Image = Text2Image;
//# sourceMappingURL=lib.js.map