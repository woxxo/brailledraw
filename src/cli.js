#!/usr/bin/env bun

import { BrailleDraw } from ".";

const mandelbrot = (sizeX, sizeY, maxIter) => {

	let re, im, x, y, iter, xt, c;
	let totalIter = 0;

	for (let i = 0; i < sizeY; i++) {
		for (let j = 0; j < sizeX; j++) {
			re = j * 3.0 / sizeX - 2.1;
			im = i * 2.8 / sizeY - 1.4;
			//re = j * 0.1 / sizeX + 0.345;
			//im = i * 0.1 / sizeY - 0.247;

			x = 0.0;
			y = 0.0;
			xt = 0.0;
			iter = 0;

			do {
				xt = x * x - y * y + re;
				y = 2 * x * y + im;
				x = xt;
				iter++;
				totalIter++;
			} while (iter < maxIter && x * x + y * y < 4);

			if (iter == maxIter) { bd.plotPixel(j,i); }

		}
	}

	return;
}

const bd = new BrailleDraw();
//bd.plotLine(0, bd.height - 1, bd.width, 0);
mandelbrot(bd.width, bd.height, 15);

console.log(bd.version);
console.log(bd.toString());
