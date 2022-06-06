/* eslint-disable max-classes-per-file */

export class Vector2 {
	public constructor(public x: number = 0, public y: number = 0) {}

	public set(x: number, y: number): Vector2 {
		this.x = x;
		this.y = y;
		return this;
	}

	public clone(): Vector2 {
		return new Vector2(this.x, this.y);
	}

	public add(xAdd: number = 0, yAdd: number = 0, clone: boolean = false): Vector2 {
		return (clone ? this.clone() : this).set(this.x + xAdd, this.y + yAdd);
	}

	public sub(xSub: number = 0, ySub: number = 0, clone: boolean = false): Vector2 {
		return (clone ? this.clone() : this).set(this.x - xSub, this.y - ySub);
	}

	public scale(xScale: number = 1, yScale: number = 1, clone: boolean = false): Vector2 {
		return (clone ? this.clone() : this).set(this.x * xScale, this.y * yScale);
	}

	public distance(otherVector: Vector2): number {
		return Math.sqrt((this.x - otherVector.x) ** 2 + (this.y - otherVector.y) ** 2);
	}

	public toString(): string {
		return `{ x: ${this.x.toFixed(2)}, y: ${this.y.toFixed(2)} }`;
	}
}

export abstract class Shape2D {
	public abstract position: Vector2;
	public abstract within(object: Vector2): boolean;
	public abstract toString(): string;
}

export class Rectangle implements Shape2D {
	public constructor(
		public position: Vector2 = new Vector2(),
		public size: Vector2 = new Vector2()
	) {}

	public within(object: Vector2, offset: number = 0): boolean {
		return (
			object.x - offset >= this.position.x &&
			object.x + offset <= this.position.x + this.size.x &&
			object.y - offset >= this.position.y &&
			object.y + offset <= this.position.y + this.size.y
		);
	}

	public clone(): Rectangle {
		return new Rectangle(this.position.clone(), this.size.clone());
	}

	public toString(): string {
		return `{ position: ${this.position.toString()}, size: ${this.size.toString()} }`;
	}
}
