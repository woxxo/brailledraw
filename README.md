# BrailleDraw

Draw on the text based canvas using unicode Braille patterns. Designed to working with [Bun](https://github.com/oven-sh/bun).

To import as a module:
```bash
bun add woxxo/brailledraw
```
```js
import { BrailleDraw } from 'brailledraw';
const bd = new BrailleDraw(100, 30);
bd.plotLine(0, bd.height - 1, bd.width, 0);

console.log(bd.version);
console.log(bd.toString());
```


To install from repo into the new folder:
```bash
bun create woxxo/brailledraw
```


To run the installed package:
```bash
cd brailledraw
bun run start
```
or just
```bash
bun start
```


To run the package direct from GitHub:
```bash
bun x woxxo/brailledraw
```
or from npmjs.com
```bash
bun x brailledraw
```



Free software by [woxxo](https://github.com/woxxo).
