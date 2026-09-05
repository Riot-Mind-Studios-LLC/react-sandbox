```js
/*
████████╗██╗   ██╗██████╗ ███████╗███████╗ ██████╗██████╗ ██╗██████╗ ████████╗
╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝
   ██║    ╚████╔╝ ██████╔╝█████╗  ███████╗██║     ██████╔╝██║██████╔╝   ██║   
   ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║██║     ██╔══██╗██║██╔═══╝    ██║   
   ██║      ██║   ██║     ███████╗███████║╚██████╗██║  ██║██║██║        ██║   
   ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝                                                
*/
```
# TypeScript - Cheatsheet

Quick reference for TypeScript syntax and patterns, including React-specific usage.

### 1. Basic Types

```ts
let name: string = "Adrian";
let age: number = 41;
let isActive: boolean = true;
let notSet: undefined = undefined;
let empty: null = null;

let ids: number[] = [1, 2, 3];           // array of numbers
let names: Array<string> = ["a", "b"];     // same thing, generic syntax

let coord: [number, number] = [10, 20];      // tuple — fixed-length array with specific types per position

let anything: any = "avoid this — turns off type checking entirely for this value";
let notSureYet: unknown = fetchSomeValue();    // safer than "any" — must be narrowed before use

function logMessage(): void {              // void — a function that returns nothing
  console.log("hi");
}

function fail(): never {                     // never — a function that never successfully returns (always throws/loops)
  throw new Error("failed");
}
```

### 2. Type Annotations vs. Inference

```ts
let count: number = 5;      // explicit annotation
let count2 = 5;               // inferred as "number" automatically — TS is often smart enough without annotations

// annotate when TS CAN'T infer correctly on its own — most common case: function parameters
function double(x: number) {   // parameters need annotations, TS can't guess these
  return x * 2;                  // return type is inferred as "number" automatically
}

// explicit return type (optional, but common for clarity in shared/exported functions)
function double2(x: number): number {
  return x * 2;
}
```

### 3. Interfaces & Type Aliases

```ts
// interface — describes the shape of an object
interface User {
  name: string;
  age: number;
  email?: string;         // optional property (the ? makes it not required)
  readonly id: number;      // can be set once, cannot be reassigned after
}

const user: User = { name: "Adrian", age: 41, id: 1 };

// type alias — similar purpose, more flexible (can also alias unions, primitives, tuples)
type Status = "loading" | "success" | "error";   // a union of specific string literals
type ID = string | number;

// interfaces can extend other interfaces
interface Admin extends User {
  permissions: string[];
}

// type aliases can also combine via intersection
type AdminType = User & { permissions: string[] };

// Rule of thumb: interface for object shapes (especially ones that might be extended),
// type for unions, primitives, tuples, or anything not strictly object-shaped.
```

### 4. Functions

```ts
function add(a: number, b: number): number {
  return a + b;
}

const subtract = (a: number, b: number): number => a - b;

// optional parameters
function greet(name: string, greeting?: string) {
  return `${greeting ?? "Hello"}, ${name}`;
}

// default parameters
function greet2(name: string, greeting: string = "Hello") {
  return `${greeting}, ${name}`;
}

// rest parameters
function sum(...nums: number[]): number {
  return nums.reduce((total, n) => total + n, 0);
}

// function type — describing a function's shape as a type itself
type MathOperation = (a: number, b: number) => number;
const multiply: MathOperation = (a, b) => a * b;
```

### 5. Union & Intersection Types

```ts
// Union — value can be ONE of several types
let id: string | number;
id = "abc123";     // OK
id = 123;             // also OK

function printId(id: string | number) {
  console.log(id);
}

// Intersection — value must satisfy ALL combined types at once
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;    // must have BOTH name and age

const person: Person = { name: "Adrian", age: 41 };
```

### 6. Type Narrowing

```ts
function process(value: string | number) {
  if (typeof value === "string") {
    value.toUpperCase();     // TS knows value is a string here, narrowed automatically
  } else {
    value.toFixed(2);          // TS knows value is a number here
  }
}

// narrowing with "in"
interface Cat { meow: () => void }
interface Dog { bark: () => void }

function makeSound(animal: Cat | Dog) {
  if ("meow" in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
}

// narrowing with instanceof
function handle(error: Error | string) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
```

### 7. Enums

```ts
enum Status {
  Loading,      // 0
  Success,        // 1
  Error,            // 2
}

let current: Status = Status.Loading;

// string enums — more explicit/readable values, common preference over numeric enums
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// Note: many modern TS codebases prefer union string literal types over enums
// (see section 3's "Status" example) — enums add some runtime overhead that
// literal unions don't, and are considered slightly outdated by some style guides.
```

### 8. Arrays, Tuples & Objects

```ts
let nums: number[] = [1, 2, 3];
let mixed: (string | number)[] = ["a", 1, "b"];   // array that can hold either type

let point: [number, number] = [10, 20];              // tuple — fixed length AND types per slot
let entry: [string, number] = ["age", 41];              // common in Map-like key/value pairs

interface Product {
  name: string;
  price: number;
}

let products: Product[] = [
  { name: "Sticker Pack", price: 5.99 },
];

// Record — a shorthand for "object with specific key/value types"
let prices: Record<string, number> = {
  small: 5,
  medium: 10,
  large: 15,
};
```

### 9. Classes

```ts
class Vehicle {
  make: string;
  model: string;
  private mileage: number = 0;         // only accessible inside this class
  protected vin: string = "";            // accessible in this class AND subclasses
  readonly manufacturedYear: number;       // can only be set once, in the constructor

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.manufacturedYear = year;
  }

  describe(): string {
    return `${this.make} ${this.model}`;
  }
}

// shorthand — declares AND assigns constructor params in one step
class Truck {
  constructor(
    public make: string,
    public model: string,
    private bedLength: number
  ) {}
}

class SportsTruck extends Truck {
  constructor(make: string, model: string, bedLength: number, public topSpeed: number) {
    super(make, model, bedLength);
  }
}
```

### 10. Generics

```ts
// a generic function — works with ANY type, while still preserving type safety
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");    // T becomes "string"
identity<number>(42);           // T becomes "number"
identity("auto-inferred");        // TS can usually infer T without you specifying it

// generic with an array
function firstItem<T>(arr: T[]): T {
  return arr[0];
}

// generic interfaces
interface ApiResponse<T> {
  data: T;
  status: number;
}

const response: ApiResponse<User> = {
  data: { name: "Adrian", age: 41, id: 1 },
  status: 200,
};

// generic with a constraint — T must have a "length" property
function logLength<T extends { length: number }>(item: T) {
  console.log(item.length);
}
```

### 11. Utility Types

```ts
interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>;         // every property becomes optional
type RequiredUser = Required<User>;         // every property becomes required
type ReadonlyUser = Readonly<User>;           // every property becomes readonly

type UserNameOnly = Pick<User, "name">;         // only keeps "name"
type UserWithoutEmail = Omit<User, "email">;      // keeps everything EXCEPT "email"

type UserRecord = Record<string, User>;             // an object with string keys, each holding a User

type MaybeUser = User | null;
type DefinitelyUser = NonNullable<MaybeUser>;         // strips out null/undefined from the type

function getUser(): User { /* ... */ }
type UserReturnType = ReturnType<typeof getUser>;       // extracts a function's return type as a type
```

### 12. Type Assertions & `as const`

```ts
// type assertion — tells TS "trust me, I know this is actually this type"
const input = document.getElementById("email") as HTMLInputElement;
input.value = "hello";      // now TS knows .value exists, since it's specifically an input element

// alternate syntax (not usable in .tsx files, since it conflicts with JSX syntax)
const input2 = <HTMLInputElement>document.getElementById("email");

// as const — locks a value's type to its EXACT literal value, and makes it deeply readonly
const status = "loading";          // inferred type: string
const status2 = "loading" as const;  // inferred type: "loading" (the literal, not the general string type)

const config = {
  theme: "dark",
  version: 1,
} as const;   // every property becomes readonly AND narrowed to its literal value
```

### 13. React + TypeScript — Component Props

```tsx
interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;         // optional prop
  children?: React.ReactNode;     // accepts any renderable JSX passed as children
}

function Card({ title, description, onClick, children }: CardProps) {
  return (
    <div onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
}

// usage
<Card title="Hello" description="World">
  <p>Extra content</p>
</Card>
```

### 14. React + TypeScript — Hooks

```tsx
import { useState, useRef } from "react";

// useState — TS infers the type from the initial value automatically
const [count, setCount] = useState(0);           // inferred as number
const [name, setName] = useState("");              // inferred as string

// explicit generic — needed when the initial value doesn't cover every possible later value
const [user, setUser] = useState<User | null>(null);  // starts null, but will later hold a User

// useRef — for DOM elements, type the element and default to null
const inputRef = useRef<HTMLInputElement>(null);

const handleFocus = () => {
  inputRef.current?.focus();   // optional chaining — .current might still be null
};

// typing event handlers
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  console.log(e.target.value);
}

function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
  console.log("clicked");
}
```

### 15. Modules & Type-Only Imports

```ts
// exporting types alongside regular code
export interface User {
  name: string;
}
export function getUser(): User { /* ... */ }

// importing types
import { User, getUser } from "./user";

// type-only import — makes it explicit this import is erased at compile time
// (useful for keeping imports organized, and required in some stricter build configs)
import type { User } from "./user";
```

### Notes

- `any` disables type checking entirely for that value — it's not "TypeScript being flexible," it's opting out of TypeScript for that spot. Prefer `unknown` when the type genuinely isn't known yet, since `unknown` forces you to narrow it (section 6) before using it.
- `interface` vs `type` (section 3) is a common early point of confusion — for typical object shapes, either works, but `interface` is generally preferred when something might be extended later, and `type` is required for unions/intersections.
- **Generics (section 10) aren't as intimidating as they look** — `<T>` is just a placeholder for "whatever type gets passed in," conceptually similar to how a function parameter is a placeholder for "whatever value gets passed in."
- In `.tsx` files specifically, the `<Type>value` assertion syntax (section 12) doesn't work, since angle brackets are already JSX syntax — use `value as Type` instead.
- This sheet assumes familiarity with the JavaScript (ES6+) cheat-sheet — TypeScript is a superset of JS, so everything in that sheet still applies; this one only covers what TypeScript adds on top.