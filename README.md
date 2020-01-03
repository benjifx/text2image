# Text2Image
Generate image from text.

## Installation
```
npm i https://github.com/benjifx/text2image
```

## Example
```js
const { Text2Image } = require('text2image')
const text2image = new Text2Image()

;(async () => {
  await text2image.configure({
    width: 1920,
    height: 1080,
    fontSize: '72px',
    color: '#ff00ff',
    fonts: [
      { name: 'Amaranth', url: 'https://fonts.googleapis.com/css?family=Amaranth&display=swap' },
      { name: 'Itim', url: 'https://fonts.googleapis.com/css?family=Itim&display=swap' },
    ]
  })
  await text2image.generate('ทดสอบ ทดสอบ\ntest test', 'test.png')
  process.exit()
})()
```
