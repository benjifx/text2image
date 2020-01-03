import { launch, Browser, Page } from 'puppeteer'
import { compile } from 'pug'
import { Text2ImageOptions } from './Text2ImageOptions'

const defaultFont = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`

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
`

export class Text2Image {
  browser!: Browser
  page!: Page
  options!: Text2ImageOptions
  compile = compile(template)

  constructor() { }

  async configure(options: Text2ImageOptions) {
    this.options = options
    this.browser = await launch()
    this.page = await this.browser.newPage()
    return
  }

  async generate(content: string, path: string) {
    const { fontSize, color } = this.options
    const html = this.compile({
      fontSize,
      color,
      fontUrls: this.options.fonts.map((f) => f.url),
      fontFamily: [...this.options.fonts.map((f) => `'${f.name}'`), defaultFont].join(', '),
      content,
    })
    await this.page.setContent(html)
    return this.page.screenshot({ path, omitBackground: true })
  }
}
