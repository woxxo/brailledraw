export class BrailleDraw {
	static #VERSION = 'BrailleDraw v.0.0.2';
	static #brailleOffset = 0x2800;
	static #pattern = [
		[0x1, 0x8],
		[0x2, 0x10],
		[0x4, 0x20],
		[0x40, 0x80],
	];

	#canvas;
	#width;
	#height;

	constructor(w = (process.stdout.columns - 2) * 2, h = (process.stdout.rows - 2) * 4) {
		this.#width = w & 0xfffe; //multiple of 2
		this.#height = h & 0xfffc; //multiple of 4
		this.#canvas = new Uint8Array(this.#width * this.#height);

		for (let i = 0; i < this.#canvas.length; i++) {
			this.#canvas[i] = 0;
			if ((i % this.#width) === 0 ||
				(i % this.#width) === this.#width - 1 ||
				i < this.#width ||
				i > this.#canvas.length - this.#width) {
				this.plotPixel(i % this.#width, ~~(i / this.#width));
			}
		}

		//this.#canvas[3] = 1;
		//this.#canvas[this.#canvas.length - 1] = 1;
	}

	#buildBraille() {
		let s = '';
		for (let i = 0; i < this.#height; i += 4) {
			for (let j = 0; j < this.#width; j += 2) {
				let n = 0;
				for (let k = 0; k < 8; k++) {
					let c = this.#canvas[(i + (k >> 1)) * this.#width + j + (k % 2)];
					n |= c * BrailleDraw.#pattern[k >> 1][k % 2];
				}
				s += String.fromCodePoint(BrailleDraw.#brailleOffset + n);
			}
			s += '\n';
		}

		return s;
	}

	get version() {
		return BrailleDraw.#VERSION;
	}

	get width() {
		return this.#width;
	}

	get height() {
		return this.#height;
	}

	toString() {
		return this.#buildBraille();
	}

	plotPixel(x, y) {
		if (x < 0 || y < 0 || x > (this.#width - 1) || y > (this.#height - 1)) return false;

		this.#canvas[y * this.#width + x] = 1;
		return true;
	}

	plotLine(x0, y0, x1, y1) {
		//A Rasterizing Algorithm for Drawing Curves
		//Alois Zingl
	
		let dx = Math.abs(x1 - x0);
		let dy = -Math.abs(y1 - y0);
		let sx = (x0 < x1) ? 1 : -1;
		let sy = (y0 < y1) ? 1 : -1;
		let err = dx + dy, e2;
	
		for (;;) {
			this.plotPixel(x0, y0);
		
			e2 = 2 * err;
			if (e2 >= dy) {
				if (x0 == x1) break;
				err += dy;
				x0 += sx;
			}
			if (e2 <= dx) {
				if (y0 == y1) break;
				err += dx;
				y0 += sy;
			}
		}
	
		return true;
	}	
}