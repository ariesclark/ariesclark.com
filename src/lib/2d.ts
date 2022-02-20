/* eslint-disable max-classes-per-file */

export class Vector2D {
	public constructor (
        public x: number = 0,
        public y: number = 0
	) {}

	public set (x: number, y: number): Vector2D {
		this.x = x;
		this.y = y;
		return this;
	}

	public clone (): Vector2D {
		return new Vector2D(this.x, this.y);
	}

	public add (xAdd: number = 0, yAdd: number = 0, clone: boolean = false): Vector2D {
		return (clone ? this.clone() : this).set(this.x + xAdd, this.y + yAdd);
	}

	public scale (xScale: number = 1, yScale: number = 1, clone: boolean = false): Vector2D {
		return (clone ? this.clone() : this).set(this.x * xScale, this.y * yScale);
	}

	public distance (otherVector: Vector2D): number {
		return Math.sqrt((this.x - otherVector.x) ** 2 + (this.y - otherVector.y) ** 2);
	}

	public toString (): string {
		return `{ x: ${this.x.toFixed(2)}, y: ${this.y.toFixed(2)} }`;
	}
}

export abstract class Shape2D {
	public abstract position: Vector2D;
	public abstract within (object: Vector2D): boolean;
	public abstract toString (): string;
}

export class Rectangle implements Shape2D {
	public constructor (
		public position: Vector2D = new Vector2D(),
		public size: Vector2D = new Vector2D()
	) {}

	public within (object: Vector2D, offset: number = 0): boolean {
		return (
			(object.x - offset) >= this.position.x && (object.x + offset) <= (this.position.x + this.size.x)
			&& (object.y - offset) >= this.position.y && (object.y + offset) <= (this.position.y + this.size.y)
		);
	}

	public clone (): Rectangle {
		return new Rectangle(this.position.clone(), this.size.clone());
	}

	public toString (): string {
		return `{ position: ${this.position.toString()}, size: ${this.size.toString()} }`;
	}
}
