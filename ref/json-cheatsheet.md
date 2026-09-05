```js
/*
     ██╗███████╗ ██████╗ ███╗   ██╗
     ██║██╔════╝██╔═══██╗████╗  ██║
     ██║███████╗██║   ██║██╔██╗ ██║
██   ██║╚════██║██║   ██║██║╚██╗██║
╚█████╔╝███████║╚██████╔╝██║ ╚████║
 ╚════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝                                                         
*/
```
# JSON - Cheatsheet

Quick reference for JSON syntax, structure, and working with it in JavaScript/React.

### 1. What JSON Is

```json
{
  "name": "Adrian",
  "role": "Creative Developer",
  "yearsExperience": 11
}
```

JSON (JavaScript Object Notation) is a plain-text data format — not code, not a JavaScript object itself, just text that FOLLOWS JavaScript's object/array syntax rules closely enough to be easy to read and write. It's language-agnostic — used to send/receive data between a browser and a server, store config files, and pass structured data between completely different programming languages.

### 2. Syntax Rules

```json
{
  "keysMustBeInDoubleQuotes": "always, no exceptions",
  "stringsUseDoubleQuotes": "never single quotes",
  "noTrailingCommas": "the last item in an object/array cannot have a comma after it",
  "noComments": "JSON does not support // or /* */ comments at all",
  "noFunctions": "JSON can only hold data, never executable code",
  "noUndefined": "undefined is not valid JSON — use null instead"
}
```

```json
// INVALID JSON — for reference, do not write JSON like this:
{
  name: "Adrian",              // ERROR — key not in double quotes
  role: 'Developer',             // ERROR — single quotes not allowed
  tags: ["react", "css",],         // ERROR — trailing comma
  // ERROR — this comment itself is invalid in real JSON
}
```

### 3. Data Types

```json
{
  "string": "text goes in double quotes",
  "number": 42,
  "decimal": 3.14,
  "negative": -10,
  "boolean": true,
  "alsoBoolean": false,
  "nullValue": null,
  "array": [1, 2, 3],
  "nestedObject": { "key": "value" }
}
```

JSON has exactly six data types: **string, number, boolean, null, object, and array.** No dates, no functions, no `undefined`, no `Map`/`Set` — anything more complex has to be represented using these six building blocks (e.g. a date is usually stored as a string).

### 4. Objects

```json
{
  "name": "Adrian",
  "role": "Creative Developer",
  "isAvailable": true,
  "skills": ["React", "GSAP", "Tailwind"],
  "address": {
    "city": "New Rochelle",
    "state": "NY"
  }
}
```

Objects use `{ }`, hold key/value pairs, and can nest other objects/arrays inside them to any depth.

### 5. Arrays

```json
[
  { "id": 1, "name": "Sticker Pack" },
  { "id": 2, "name": "Vanity Plate" },
  { "id": 3, "name": "Snapback Hat" }
]
```

Arrays use `[ ]`, hold an ordered list of values, and are extremely common as the top-level structure of an entire JSON file/API response — most real-world data (a list of products, a list of blog posts, a list of users) is an array of objects, exactly like this.

```json
{
  "products": [
    { "id": 1, "name": "Sticker Pack" },
    { "id": 2, "name": "Vanity Plate" }
  ]
}
```

Just as often, that array is nested inside a wrapping object (common in real API responses, since it lets the response also include metadata like `"total"` or `"page"` alongside the actual data array).

### 6. Nesting

```json
{
  "user": {
    "name": "Adrian",
    "business": {
      "name": "a multi-division Shopify e-commerce business",
      "studios": [
        { "name": "Label Co.", "type": "stickers" },
        { "name": "Wovn Depot", "type": "apparel" }
      ]
    }
  }
}
```

JSON can nest objects inside objects, arrays inside objects, objects inside arrays — any combination, to any depth. This is how genuinely complex, structured data gets represented in a single JSON document.

### 7. Escaping Special Characters

```json
{
  "quote": "She said \"hello\" to me",
  "path": "C:\\Users\\Adrian\\Documents",
  "newline": "First line\nSecond line",
  "tab": "Column1\tColumn2",
  "unicode": "Caf\u00e9"
}
```

Since strings are wrapped in double quotes, a literal double quote or backslash inside a string has to be escaped with a backslash — same idea as escape sequences in JavaScript strings.

### 8. JSON vs. JavaScript Objects — Key Differences

```js
// JavaScript object — flexible syntax
const jsObject = {
  name: "Adrian",           // unquoted keys allowed
  role: 'Developer',          // single quotes allowed
  greet() { return "hi"; },     // can hold functions
  today: new Date(),              // can hold real Date objects, Maps, Sets, etc.
};

// JSON — strict syntax, data only
const json = {
  "name": "Adrian",           // keys MUST be double-quoted
  "role": "Developer",          // strings MUST be double-quoted
  "today": "2026-09-01"           // dates must be represented as strings
  // no functions allowed at all
};
```

JSON is a subset of what a JS object can express — every valid JSON document is also valid JS object syntax, but not the other way around.

### 9. `JSON.stringify()` — JS Value to JSON String

```js
const user = { name: "Adrian", role: "Developer", age: 41 };

JSON.stringify(user);
// '{"name":"Adrian","role":"Developer","age":41}'

JSON.stringify(user, null, 2);
// same, but pretty-printed with 2-space indentation — much easier to read/debug

JSON.stringify(user, ["name", "role"]);
// '{"name":"Adrian","role":"Developer"}' — 2nd arg filters to only these keys

// common real use: saving to localStorage (which only stores strings)
localStorage.setItem("user", JSON.stringify(user));
```

### 10. `JSON.parse()` — JSON String to JS Value

```js
const jsonString = '{"name":"Adrian","role":"Developer"}';

const parsed = JSON.parse(jsonString);
parsed.name; // "Adrian" — now a real, usable JS object again

// common real use: reading from localStorage
const saved = JSON.parse(localStorage.getItem("user"));

// common real use: parsing an API response
const response = await fetch("/api/user");
const data = await response.json(); // fetch's .json() does JSON.parse() for you automatically
```

### 11. Common Errors & Gotchas

```js
JSON.parse("{ invalid json");        // throws a SyntaxError — always wrap in try/catch when the source isn't guaranteed valid

try {
  const data = JSON.parse(someString);
} catch (error) {
  console.error("Invalid JSON:", error.message);
}

JSON.stringify(undefined);              // undefined (not the string "undefined") — undefined values are DROPPED entirely
JSON.stringify({ a: undefined, b: 1 }); // '{"b":1}' — key "a" disappears completely
JSON.stringify([undefined, 1]);          // '[null,1]' — inside an array, undefined becomes null instead of being dropped

JSON.stringify({ a: function () {} });     // '{}' — functions are silently dropped, not an error

const circular = {};
circular.self = circular;
JSON.stringify(circular);                    // throws "Converting circular structure to JSON"
```

### 12. Importing `.json` Files Directly (in a JS/React project)

```js
// most modern bundlers (Vite included) let you import a .json file directly, no fetch needed
import data from "./data.json";

console.log(data.products); // works immediately, already parsed into a real JS object/array
```

Useful for static/local data that doesn't come from an API — config files, seed data, a fixed list of options — same general purpose as a `.js` file in a `src/data/` folder, just written in strict JSON syntax instead of JS.

### 13. JSON in API Requests

```js
// sending JSON in a fetch POST request
async function createUser(user) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",  // tells the server the body is JSON
    },
    body: JSON.stringify(user),              // the request body must be a STRING, not a raw object
  });

  return response.json();                       // parses the server's JSON response back into JS
}
```

### Notes

- `JSON.stringify()` and `JSON.parse()` are mirror opposites — stringify going FROM a JS value TO a JSON string, parse going FROM a JSON string TO a JS value. Mixing them up (or forgetting one entirely) is one of the most common JSON-related bugs.
- JSON has no comments, ever — if a `.json` file needs explanatory notes, that's usually a sign it should be a `.js`/`.ts` data file instead (which supports comments and JS syntax), not actual JSON.
- Fetch's `response.json()` method already calls `JSON.parse()` internally — you don't (and shouldn't) call `JSON.parse()` again on its result.
- This is a reference for JSON the data format itself — see the JavaScript (ES6+) cheat-sheet for `Object`/`Array` methods used to work with the resulting JS values once parsed.