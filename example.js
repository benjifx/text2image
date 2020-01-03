const { Text2Png } = require('./dist/lib')
const text2png = new Text2Png()

;(async () => {
  await text2png.configure({
    fontSize: '72px',
    color: '#ff00ff',
    fonts: [
      { name: 'Amaranth', url: 'https://fonts.googleapis.com/css?family=Amaranth&display=swap'},
      { name: 'Itim', url: 'https://fonts.googleapis.com/css?family=Itim&display=swap'},
    ]
  })
  await text2png.generate('ทดสอบ ทดสอบ\ntest test', 'test.png')
  process.exit()
})()
