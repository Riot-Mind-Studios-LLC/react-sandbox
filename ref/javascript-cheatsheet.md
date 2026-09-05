```js
/*
     ██╗ █████╗ ██╗   ██╗ █████╗ ███████╗ ██████╗██████╗ ██╗██████╗ ████████╗
     ██║██╔══██╗██║   ██║██╔══██╗██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝
     ██║███████║██║   ██║███████║███████╗██║     ██████╔╝██║██████╔╝   ██║   
██   ██║██╔══██║╚██╗ ██╔╝██╔══██║╚════██║██║     ██╔══██╗██║██╔═══╝    ██║   
╚█████╔╝██║  ██║ ╚████╔╝ ██║  ██║███████║╚██████╗██║  ██║██║██║        ██║   
 ╚════╝ ╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝                                                                        
*/
```
# JavaScript (ES6+) - Cheatsheet

Quick reference for modern JavaScript syntax and patterns.

### 1. Variables

```js
var oldWay = "function-scoped, hoisted, avoid in modern code";

let count = 0;                 // block-scoped, reassignable
count = 1;                     // OK

const name = "Adrian";         // block-scoped, cannot be reassigned
// name = "Someone";           // ERROR — const bindings can't be reassigned

const user = { name: "Adrian" };
user.name = "Someone";         // OK — const only locks the BINDING, not object contents
user.age = 41;                 // also OK — adding properties is fine

const list = [1, 2, 3];
list.push(4);                  // OK — same rule applies to arrays
```

### 2. Hoisting & Scope

```js
console.log(x);   // undefined — "var" is hoisted, but its VALUE isn't set until this line runs
var x = 5;

console.log(y);    // ERROR — "let"/"const" are hoisted too, but sit in the "temporal dead zone"
let y = 5;          // can't be accessed before this line

function scopeTest() {
  if (true) {
    var fnScoped = "I leak out of this block";
    let blockScoped = "I don't";
  }
  console.log(fnScoped);    // works — var ignores block scope
  // console.log(blockScoped); // ERROR — let/const respect block scope
}

// Global scope vs. function scope vs. block scope
let global = "accessible everywhere in this file";

function outer() {
  let functionScoped = "only accessible inside outer()";
}
```

### 3. Data Types & Type Checking

```js
typeof "hello"        // "string"
typeof 42              // "number"
typeof true             // "boolean"
typeof undefined         // "undefined"
typeof null               // "object" (a well-known JS quirk/bug, not a real object)
typeof { }                 // "object"
typeof [1, 2, 3]             // "object" (arrays are a type of object)
typeof function () {}         // "function"
typeof Symbol()                // "symbol"
typeof 10n                       // "bigint"

Array.isArray([1, 2, 3]);          // true — the correct way to check for an array
Number.isInteger(5);                // true
Number.isNaN(NaN);                   // true — safer than the global isNaN()

// Primitive vs. reference types
let a = 5;
let b = a;      // b gets a COPY of the value — primitives are copied by value
b = 10;         // a is still 5

let obj1 = { x: 1 };
let obj2 = obj1;  // obj2 points to the SAME object — objects are copied by reference
obj2.x = 99;      // obj1.x is now also 99

// Type conversion
String(123);        // "123"
Number("123");        // 123
Boolean(0);            // false
Boolean("");            // false
parseInt("42px");        // 42
parseFloat("3.14m");      // 3.14
```

### 4. Operators

```js
// Arithmetic
5 + 2;    // 7
5 - 2;    // 3
5 * 2;    // 10
5 / 2;    // 2.5
5 % 2;    // 1 — remainder (modulo)
5 ** 2;   // 25 — exponent

// Assignment
let x = 5;
x += 2;   // x = x + 2
x -= 2;   // x = x - 2
x *= 2;   // x = x * 2
x /= 2;   // x = x / 2
x **= 2;  // x = x ** 2
x++;      // increment by 1
x--;      // decrement by 1

// Comparison
5 == "5";     // true  — loose equality, allows type coercion (avoid)
5 === "5";    // false — strict equality, checks type AND value (always prefer)
5 != "5";     // false
5 !== "5";    // true
5 > 2;   5 < 2;   5 >= 5;   5 <= 4;

// Logical
true && false;   // false — AND, both sides must be true
true || false;    // true  — OR, either side can be true
!true;              // false — NOT, flips the boolean

// Nullish & optional chaining (see also section 12)
const count = value ?? 0;
const city = user?.address?.city;
```

### 5. Truthy & Falsy Values

```js
// Falsy values — everything else is truthy
Boolean(false);
Boolean(0);
Boolean("");           // empty string
Boolean(null);
Boolean(undefined);
Boolean(NaN);

// Common gotchas
Boolean("0");            // true  — non-empty string, even "0", is truthy
Boolean([]);               // true  — an empty array is truthy
Boolean({});                 // true  — an empty object is truthy

if (someValue) {              // implicitly checks truthiness — very common pattern
  // runs if someValue is anything except the falsy list above
}
```

### 6. Template Literals

```js
const name = "Adrian";
const greeting = `Hello, ${name}!`;         // string interpolation with backticks

const multiLine = `
  This spans
  multiple lines
  with real line breaks preserved.
`;

const price = 19.99;
const label = `Total: $${(price * 1.08).toFixed(2)}`;  // expressions work inside ${}
```

### 7. Conditional Statements

```js
// if / else if / else
const age = 20;
if (age < 13) {
  console.log("child");
} else if (age < 18) {
  console.log("teen");
} else {
  console.log("adult");
}

// Ternary operator — a compact if/else that RETURNS a value
const status = age >= 18 ? "adult" : "minor";

// Switch statement — good for many possible exact-match cases
const day = "Mon";
switch (day) {
  case "Mon":
  case "Tue":
  case "Wed":
  case "Thu":
  case "Fri":
    console.log("Weekday");
    break;                    // without "break", execution "falls through" to the next case
  case "Sat":
  case "Sun":
    console.log("Weekend");
    break;
  default:
    console.log("Invalid day");
}

// Logical AND for conditional execution (very common in React)
isLoggedIn && renderDashboard();
```

### 8. Loops

```js
const arr = [10, 20, 30];

for (let i = 0; i < arr.length; i++) {   // classic loop — full control over the index
  console.log(arr[i]);
}

for (const value of arr) {                // for...of — iterates over VALUES, cleanest for arrays
  console.log(value);
}

const obj = { a: 1, b: 2 };
for (const key in obj) {                   // for...in — iterates over KEYS, used for objects
  console.log(key, obj[key]);
}

let i = 0;
while (i < 5) {                             // runs while the condition stays true
  console.log(i);
  i++;
}

let j = 0;
do {                                          // runs the body ONCE before checking the condition
  console.log(j);
  j++;
} while (j < 5);

arr.forEach((value, index) => {                // functional style — most common in modern code
  console.log(index, value);
});

// break / continue
for (let i = 0; i < 10; i++) {
  if (i === 3) continue;    // skips this iteration, moves to the next
  if (i === 6) break;        // stops the loop entirely
  console.log(i);
}
```

### 9. Functions

```js
// Function declaration — hoisted, can be called before its definition in the file
function add(a, b) {
  return a + b;
}

// Function expression — NOT hoisted, stored in a variable
const subtract = function (a, b) {
  return a - b;
};

// Arrow function — shorter syntax, does NOT have its own "this" (inherits from enclosing scope)
const multiply = (a, b) => {
  return a * b;
};

// Implicit return — no braces, no "return" keyword needed for single expressions
const square = (x) => x * x;

// Single parameter — parens are optional (but common convention keeps them)
const double = (x) => x * 2;

// No parameters — parens are required
const sayHi = () => "hi";

// Default parameters
function greet(name = "friend") {
  return `Hello, ${name}`;
}

// Rest parameters — collects any number of extra arguments into an array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4); // 10

// Immediately Invoked Function Expression (IIFE) — runs once, right away
(function () {
  console.log("runs immediately");
})();

// Higher-order function — a function that takes and/or returns another function
function createMultiplier(factor) {
  return (num) => num * factor;
}
const double2 = createMultiplier(2);
```

### 10. Destructuring

```js
// Array destructuring
const coordinates = [10, 20];
const [x, y] = coordinates;

const [first, , third] = [1, 2, 3];   // skip an item with an empty slot

// with default values
const [a = 1, b = 2] = [10];           // a = 10, b = 2 (default used, since only one value given)

// Object destructuring
const user = { name: "Adrian", role: "Developer" };
const { name, role } = user;

// renaming while destructuring
const { name: userName } = user;       // userName = "Adrian"

// default values
const { age = 30 } = user;             // age = 30, since user.age doesn't exist

// nested destructuring
const response = { data: { id: 1, title: "Post" } };
const { data: { id, title } } = response;

// destructuring in function parameters — very common in React props
function UserCard({ name, role }) {
  return `${name} - ${role}`;
}
```

### 11. Spread & Rest

```js
// Spread — expands an array/object into individual elements
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];          // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };        // { a: 1, b: 2, c: 3 }

// common pattern: updating state immutably (React)
const updated = { ...user, role: "Senior Developer" }; // copies user, overrides one field

// spreading into function arguments
function add3(a, b, c) { return a + b + c; }
const nums = [1, 2, 3];
add3(...nums); // 6

// Rest — the opposite direction: gathers remaining items INTO an array/object
function logAll(first, ...rest) {
  console.log(first, rest);
}
logAll(1, 2, 3, 4); // 1  [2, 3, 4]

const { id, ...otherFields } = { id: 1, name: "Adrian", role: "Dev" };
// otherFields = { name: "Adrian", role: "Dev" }
```

### 12. Optional Chaining & Nullish Coalescing

```js
// Optional chaining — safely access nested properties that might not exist
const city = user?.address?.city;   // undefined instead of throwing an error, if address doesn't exist
user?.greet?.();                     // safely call a method that might not exist
arr?.[0];                             // safely access an array index

// Nullish coalescing — fallback ONLY for null/undefined (unlike || which also triggers on 0, "", false)
const count = userCount ?? 0;         // count = 0 only if userCount is null/undefined
const label = "" || "default";         // "default" — || treats "" as falsy too
const label2 = "" ?? "default";         // "" — ?? does NOT treat "" as nullish

// Short-circuit default assignment
const name = providedName || "Guest";
```

### 13. Arrays — Creating & Reading

```js
const arr = Array.of(1, 2, 3);          // [1, 2, 3]
const arr2 = Array.from({ length: 3 }, (_, i) => i);  // [0, 1, 2] — builds from an array-like/iterable
const arr3 = new Array(5).fill(0);       // [0, 0, 0, 0, 0]

const nums = [1, 2, 3, 4, 5];
nums[0];                 // 1 — access by index
nums.at(-1);               // 5 — access from the end (negative indexing)
nums.length;                 // 5
```

### 14. Arrays — Transforming & Searching

```js
const nums = [1, 2, 3, 4, 5];

nums.map((n) => n * 2);              // [2, 4, 6, 8, 10] — transforms each item, same length
nums.filter((n) => n % 2 === 0);      // [2, 4] — keeps items that pass a test
nums.reduce((sum, n) => sum + n, 0);   // 15 — collapses the array into a single value
nums.reduceRight((acc, n) => acc + n, 0); // same as reduce, but right-to-left

nums.find((n) => n > 3);                 // 4 — first item that passes a test
nums.findIndex((n) => n > 3);             // 3 — index of first match
nums.findLast((n) => n > 3);               // 5 — last item that passes a test
nums.findLastIndex((n) => n > 3);           // 4 — index of last match

nums.some((n) => n > 4);                   // true — does AT LEAST ONE item pass?
nums.every((n) => n > 0);                   // true — do ALL items pass?
nums.includes(3);                            // true
nums.indexOf(3);                              // 2
nums.lastIndexOf(3);                           // 2

nums.flat();                    // flattens one level of nested arrays
[[1, 2], [3, 4]].flat();          // [1, 2, 3, 4]
nums.flatMap((n) => [n, n * 2]);   // maps, then flattens the result one level
```

### 15. Arrays — Mutating vs. Non-Mutating

```js
const nums = [1, 2, 3, 4, 5];

// Non-mutating — return a NEW array, original stays untouched (preferred in React/state updates)
nums.slice(1, 3);          // [2, 3]
nums.concat([6, 7]);         // [1, 2, 3, 4, 5, 6, 7]
[...nums, 6];                  // [1, 2, 3, 4, 5, 6] — spread is the modern go-to for this
nums.join(", ");                 // "1, 2, 3, 4, 5" — returns a STRING, not an array
[...nums].sort();                  // spread first to sort without mutating the original

// Mutating — CHANGE the original array directly, be careful with these
nums.push(6);                // adds to the end
nums.pop();                    // removes from the end
nums.unshift(0);                 // adds to the beginning
nums.shift();                      // removes from the beginning
nums.splice(1, 2);                   // removes 2 items starting at index 1
nums.splice(1, 0, "new");              // inserts "new" at index 1, removes nothing
nums.sort((a, b) => a - b);              // sorts ascending (numbers need a compare function)
nums.reverse();                            // reverses in place
nums.fill(0, 1, 3);                          // fills indexes 1-2 with 0
```

### 16. Strings — Common Methods

```js
const str = "  Hello, World!  ";

str.trim();                    // "Hello, World!" — removes leading/trailing whitespace
str.toUpperCase();               // "  HELLO, WORLD!  "
str.toLowerCase();                 // "  hello, world!  "

str.includes("World");               // true
str.startsWith("  Hello");             // true
str.endsWith("!  ");                     // true

str.indexOf("World");                      // index of first match, -1 if not found
str.slice(2, 7);                             // "Hello" — extracts by index range
str.substring(2, 7);                           // "Hello" — similar to slice, doesn't accept negatives

str.replace("World", "Adrian");                  // replaces FIRST match only
str.replaceAll("l", "L");                          // replaces ALL matches

str.split(", ");                                     // ["  Hello", "World!  "] — string to array
["a", "b", "c"].join("-");                             // "a-b-c" — array to string

str.charAt(0);                                            // " "
str.at(-1);                                                  // " " — from the end (negative indexing)

"5".padStart(3, "0");                                          // "005"
"5".padEnd(3, "0");                                              // "500"
"ha".repeat(3);                                                     // "hahaha"

"5" + 5;                                                                // "55" — string concatenation
`Value: ${5 + 5}`;                                                       // "Value: 10" — template literal (preferred)
```

### 17. Objects — Common Methods

```js
const user = { name: "Adrian", role: "Developer" };

Object.keys(user);          // ["name", "role"]
Object.values(user);        // ["Adrian", "Developer"]
Object.entries(user);        // [["name", "Adrian"], ["role", "Developer"]]
Object.fromEntries([["name", "Adrian"]]); // { name: "Adrian" } — reverse of entries()

Object.assign({}, user, { role: "Senior Developer" }); // merges objects (spread is preferred in modern code)

Object.freeze(user);          // prevents any changes to the object
Object.seal(user);              // prevents adding/removing properties, but existing ones can still change
Object.isFrozen(user);            // true/false

user.hasOwnProperty("name");        // true — checks if the property exists directly on this object
"name" in user;                       // true — also checks inherited properties, via the prototype chain

Object.keys(user).length;               // count of own properties

// shorthand property names (when key and variable name match)
const name = "Adrian";
const role = "Developer";
const obj = { name, role };     // same as { name: name, role: role }

// shorthand methods
const obj2 = {
  greet() {                     // same as greet: function() {...}
    return "hi";
  },
};

// computed property names
const key = "dynamicKey";
const obj3 = { [key]: "value" };  // { dynamicKey: "value" }
```

### 18. Numbers & Math

```js
Number.isInteger(5);        // true
Number.isFinite(5);           // true
Number.parseFloat("3.14");      // 3.14
(3.14159).toFixed(2);             // "3.14" — rounds to 2 decimal places, returns a STRING

Math.round(4.5);              // 5
Math.floor(4.9);                // 4 — always rounds down
Math.ceil(4.1);                   // 5 — always rounds up
Math.abs(-5);                       // 5
Math.max(1, 5, 3);                    // 5
Math.min(1, 5, 3);                      // 1
Math.pow(2, 3);                           // 8 — same as 2 ** 3
Math.sqrt(16);                              // 4
Math.random();                                // random number between 0 (inclusive) and 1 (exclusive)

Math.floor(Math.random() * 10);                 // random whole number from 0-9
```

### 19. Classes

```js
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  // instance method — available on every instance
  describe() {
    return `${this.make} ${this.model}`;
  }

  // getter
  get displayName() {
    return `${this.make} - ${this.model}`;
  }

  // setter
  set nickname(value) {
    this._nickname = value;
  }

  // static method — called on the class itself, not an instance
  static compare(v1, v2) {
    return v1.make === v2.make;
  }
}

const car = new Vehicle("Toyota", "Camry");
car.describe();          // "Toyota Camry"
car.displayName;          // "Toyota - Camry" (no parens — it's a getter)

// Inheritance
class Truck extends Vehicle {
  constructor(make, model, bedLength) {
    super(make, model);       // calls the parent constructor — required before using "this"
    this.bedLength = bedLength;
  }

  describe() {
    return `${super.describe()} (bed: ${this.bedLength}ft)`; // calls the parent's version, then extends it
  }
}
```

### 20. Prototypes (what classes are built on)

```js
// ES6 classes are "syntactic sugar" over JS's actual inheritance model: prototypes.
// Every object has an internal link to another object — its prototype — that it
// falls back to when a property/method isn't found on itself.

function Vehicle(make, model) {
  this.make = make;
  this.model = model;
}

// methods added to the prototype are SHARED across all instances (memory-efficient),
// instead of being recreated on every single object
Vehicle.prototype.describe = function () {
  return `${this.make} ${this.model}`;
};

const car = new Vehicle("Toyota", "Camry");
car.describe();  // works — JS looks at car, doesn't find describe(), checks car's prototype, finds it there

// this is what "class" and "extends" do automatically under the hood
console.log(car.__proto__ === Vehicle.prototype); // true
```

### 21. `this` Keyword

```js
const obj = {
  name: "Adrian",
  regularFunction: function () {
    console.log(this.name);  // "Adrian" — regular functions get "this" from HOW they're called
  },
  arrowFunction: () => {
    console.log(this.name);  // undefined — arrow functions inherit "this" from the SURROUNDING scope, not the object
  },
};

// this is why arrow functions are usually safer inside callbacks/class methods —
// they don't create their own "this", so they don't lose track of it unexpectedly

class Counter {
  count = 0;

  incrementBad = function () {
    this.count++;   // if this gets passed as a callback and called elsewhere, "this" may be wrong
  };

  incrementGood = () => {
    this.count++;   // arrow function locks in "this" from the class instance, safe to pass as a callback
  };
}
```

### 22. Closures

```js
// A closure is a function that "remembers" the variables from where it was created,
// even after that outer function has finished running.

function createCounter() {
  let count = 0;               // this variable is "enclosed" by the returned function

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3 — count persisted between calls, and is completely private/inaccessible from outside

// practical use: creating private variables, or functions with pre-configured behavior
function multiplyBy(factor) {
  return (num) => num * factor;
}
const double = multiplyBy(2);
const triple = multiplyBy(3);
double(5); // 10
triple(5); // 15
```

### 23. Error Handling

```js
try {
  const result = JSON.parse("{ invalid json");
} catch (error) {
  console.error("Something went wrong:", error.message);
} finally {
  console.log("This runs no matter what — success or failure");
}

// throwing your own errors
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (error) {
  console.error(error.message); // "Cannot divide by zero"
}

// custom error classes
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

throw new ValidationError("Email is required");
```

### 24. Promises & Async/Await

```js
// A Promise represents a value that will exist eventually (or fail trying)
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("data loaded");
      } else {
        reject("something went wrong");
      }
    }, 1000);
  });
};

// .then/.catch/.finally syntax
fetchData()
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  .finally(() => console.log("done, either way"));

// async/await — cleaner syntax for the same thing, reads top-to-bottom like sync code
async function loadData() {
  try {
    const result = await fetchData();  // pauses here until the Promise resolves
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// running multiple promises in parallel
async function loadEverything() {
  const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]); // fails fast if ANY reject
}

// like Promise.all, but doesn't fail fast — waits for all, reports each outcome individually
async function loadEverythingSafely() {
  const results = await Promise.allSettled([fetchUsers(), fetchPosts()]);
}

Promise.race([fetchData(), timeout(3000)]);   // resolves/rejects as soon as the FIRST one settles

// real-world fetch example
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
}
```

### 25. Modules (import/export)

```js
// Named exports — a file can have multiple
export const PI = 3.14159;
export function add(a, b) { return a + b; }

// importing named exports — names must match, wrapped in { }
import { PI, add } from "./mathUtils.js";

// renaming on import
import { add as sum } from "./mathUtils.js";

// Default export — one per file, name is chosen at import time
export default function Button() { /* ... */ }

// importing a default export — no { }, any name works
import Button from "./Button.jsx";

// mixing both in one file
export default function Card() { /* ... */ }
export const CardHeader = () => { /* ... */ };
import Card, { CardHeader } from "./Card.jsx";

// importing everything as a namespace object
import * as MathUtils from "./mathUtils.js";
MathUtils.add(1, 2);
```

### 26. Map & Set

```js
// Map — like an object, but keys can be ANY type (not just strings), and preserves insertion order
const map = new Map();
map.set("name", "Adrian");
map.set(1, "one");
map.get("name");        // "Adrian"
map.has("name");         // true
map.delete("name");
map.size;                 // count of entries

for (const [key, value] of map) {
  console.log(key, value);
}

// Set — a collection of UNIQUE values (no duplicates allowed)
const set = new Set([1, 2, 2, 3, 3, 3]);
set;                       // Set(3) {1, 2, 3} — duplicates automatically removed
set.add(4);
set.has(2);                 // true
set.delete(2);
[...set];                    // convert back to an array

// common real use: deduplicating an array
const unique = [...new Set([1, 1, 2, 2, 3])]; // [1, 2, 3]
```

### 27. Events (DOM / click handling)

```js
// Note: direct DOM event handling like this is for vanilla JS — in React, this is
// usually done declaratively instead (onClick={handleClick} in JSX).

const button = document.querySelector(".btn");

button.addEventListener("click", function (event) {
  console.log("Button clicked!");
  console.log(event.target);        // the actual element that was clicked
});

button.addEventListener("click", (event) => {
  event.preventDefault();            // stops default browser behavior (e.g. form submission, link navigation)
  event.stopPropagation();             // stops the event from bubbling up to parent elements
});

button.removeEventListener("click", handleClick);  // requires a NAMED function reference to remove

// common event types
document.addEventListener("keydown", (e) => console.log(e.key));
input.addEventListener("input", (e) => console.log(e.target.value));
form.addEventListener("submit", (e) => e.preventDefault());
window.addEventListener("resize", () => console.log("window resized"));
window.addEventListener("scroll", () => console.log("scrolled"));

// event delegation — attach ONE listener to a parent, check what was actually clicked
document.querySelector(".list").addEventListener("click", (e) => {
  if (e.target.matches(".list-item")) {
    console.log("a list item was clicked");
  }
});
```

### 28. Equality & Comparison

```js
0 == "0";           // true  — loose equality, allows type coercion (avoid in modern code)
0 === "0";          // false — strict equality, checks type AND value (always prefer this)

null == undefined;    // true  — one special case where == is commonly allowed
null === undefined;   // false

NaN === NaN;            // false — NaN is never equal to itself
Number.isNaN(NaN);       // true — the correct way to check for NaN

Object.is(NaN, NaN);      // true — a stricter equality check, rarely needed day-to-day
```

### 29. JSON

```js
const obj = { name: "Adrian", role: "Developer" };

const jsonString = JSON.stringify(obj);          // '{"name":"Adrian","role":"Developer"}'
JSON.stringify(obj, null, 2);                      // same, but pretty-printed with 2-space indentation

const parsed = JSON.parse(jsonString);              // back to a real JS object

// common real use: reading/writing to localStorage (browser-only, not for Claude artifacts)
localStorage.setItem("user", JSON.stringify(obj));
const saved = JSON.parse(localStorage.getItem("user"));
```

### 30. Generators & Iterators (advanced, less common day-to-day)

```js
// A generator function can pause and resume — it returns an "iterator" instead of a single value
function* countUp() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = countUp();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }

// generators are iterable, so they work with for...of and spread
for (const num of countUp()) {
  console.log(num); // 1, 2, 3
}
[...countUp()]; // [1, 2, 3]
```

### Notes

- `const` is the right default for most variables — reach for `let` only when a value genuinely needs to be reassigned, and avoid `var` entirely in modern code.
- Arrow functions and regular functions aren't fully interchangeable — the `this` behavior difference (section 21) is a real, common source of bugs, not just a style preference.
- **Mutating vs. non-mutating array methods matter a lot in React** — state updates rely on creating NEW arrays/objects, not mutating existing ones. See sections 14-15 for exactly which methods are safe (return new arrays) vs. which mutate in place.
- Optional chaining (`?.`) and nullish coalescing (`??`) are both genuinely modern ES2020 additions — extremely common in current React codebases for safely handling data that might not exist yet (e.g. before an API response arrives).
- Section 27 (DOM events) is vanilla-JS-specific — in React, event handling is declarative (`onClick`, `onChange` as JSX props), not `addEventListener` calls, though the underlying `event` object and methods like `preventDefault()` behave the same either way.
- This is a reference for vanilla JavaScript syntax and patterns — React-specific concepts (hooks, JSX, component patterns) are covered separately in the React hooks cheat-sheet.