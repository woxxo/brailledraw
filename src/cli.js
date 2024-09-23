#!/usr/bin/env bun

import { BrailleDraw } from ".";

const bd = new BrailleDraw(100, 30);
bd.plotLine(0, bd.height - 1, bd.width, 0);

console.log(bd.version);
console.log(bd.toString());
