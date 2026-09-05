```js
/*
 █████╗ ██████╗ ██╗
██╔══██╗██╔══██╗██║
███████║██████╔╝██║
██╔══██║██╔═══╝ ██║
██║  ██║██║     ██║
╚═╝  ╚═╝╚═╝     ╚═╝                                                       
*/
```
# RESTful APIs / Fetch & Ajax - Cheatsheet

Quick reference for REST API concepts and making HTTP requests in JavaScript.

### 1. What "RESTful API" Means

REST (Representational State Transfer) is a set of conventions for designing APIs around **resources** (things — users, products, posts) accessed via URLs, using standard HTTP methods to indicate the action being taken. A RESTful API is predictable: the URL identifies WHAT you're working with, the HTTP method identifies WHAT you're doing to it.

```
GET    /api/products          -> get a list of all products
GET    /api/products/12         -> get one specific product (id 12)
POST   /api/products              -> create a new product
PUT    /api/products/12             -> replace product 12 entirely
PATCH  /api/products/12               -> update part of product 12
DELETE /api/products/12                 -> delete product 12
```

### 2. HTTP Methods

```
GET       -> retrieve data, should never change anything on the server (safe/idempotent)
POST        -> create a new resource, or trigger an action
PUT           -> replace an entire existing resource
PATCH           -> partially update an existing resource (only the fields sent)
DELETE             -> remove a resource
```

**PUT vs. PATCH, the common point of confusion:** PUT expects the FULL resource (anything not sent is often wiped/reset), PATCH sends only the fields that are actually changing.

### 3. HTTP Status Codes

```
2xx — Success
  200 OK                 -> standard success response
  201 Created               -> a new resource was successfully created (common after POST)
  204 No Content               -> success, but no body to return (common after DELETE)

3xx — Redirection
  301 Moved Permanently
  304 Not Modified            -> cached version is still valid, nothing new to send

4xx — Client Error (something wrong with the REQUEST)
  400 Bad Request                -> malformed request, invalid data sent
  401 Unauthorized                  -> not logged in / missing or invalid credentials
  403 Forbidden                       -> logged in, but not allowed to do this
  404 Not Found                          -> the resource/URL doesn't exist
  429 Too Many Requests                    -> rate limit exceeded

5xx — Server Error (something wrong on the SERVER'S side)
  500 Internal Server Error
  503 Service Unavailable
```

### 4. Request & Response Anatomy

```
Request:
  Method:  POST
  URL:     https://api.example.com/products
  Headers: Content-Type: application/json
           Authorization: Bearer abc123token
  Body:    { "name": "Sticker Pack", "price": 5.99 }

Response:
  Status:  201 Created
  Headers: Content-Type: application/json
  Body:    { "id": 42, "name": "Sticker Pack", "price": 5.99 }
```

### 5. `fetch()` — Basic GET Request

```js
fetch("https://api.example.com/products")
  .then((response) => response.json())     // parses the JSON body — this itself returns a Promise too
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// async/await version — cleaner, reads top-to-bottom
async function getProducts() {
  try {
    const response = await fetch("https://api.example.com/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}
```

### 6. `fetch()` — POST / PUT / PATCH / DELETE

```js
async function createProduct(product) {
  const response = await fetch("https://api.example.com/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),     // request body must be a STRING — stringify it
  });
  return response.json();
}

async function updateProduct(id, updates) {
  const response = await fetch(`https://api.example.com/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return response.json();
}

async function deleteProduct(id) {
  const response = await fetch(`https://api.example.com/products/${id}`, {
    method: "DELETE",
  });
  return response.status === 204; // DELETE often returns no body, just a status
}
```

### 7. Fetch's #1 Gotcha — It Doesn't Reject on HTTP Errors

```js
// fetch() only rejects (triggers .catch) on a NETWORK failure —
// a 404 or 500 response still counts as a "successful" fetch as far as fetch() is concerned!

async function getProduct(id) {
  const response = await fetch(`https://api.example.com/products/${id}`);

  if (!response.ok) {                        // response.ok is true for any 2xx status, false otherwise
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}

// without this check, a 404 response would silently try to parse an error page as JSON
// and fail confusingly later, instead of failing clearly at the actual point of the problem
```

### 8. Headers

```js
fetch("https://api.example.com/products", {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer abc123token",       // common auth pattern
    "Accept": "application/json",
  },
});

// reading response headers
const response = await fetch(url);
response.headers.get("Content-Type");
response.headers.forEach((value, key) => console.log(key, value));
```

### 9. Query Parameters

```js
// manually building a query string
fetch("https://api.example.com/products?category=stickers&sort=price");

// using URLSearchParams — safer, handles encoding automatically
const params = new URLSearchParams({
  category: "stickers",
  sort: "price",
});
fetch(`https://api.example.com/products?${params}`);
// -> ?category=stickers&sort=price

// reading query params on the receiving/client side (e.g. from the current page URL)
const currentParams = new URLSearchParams(window.location.search);
currentParams.get("category");
```

### 10. Running Multiple Requests

```js
// in parallel — both start immediately, wait for both to finish
async function loadPageData() {
  const [products, categories] = await Promise.all([
    fetch("/api/products").then((r) => r.json()),
    fetch("/api/categories").then((r) => r.json()),
  ]);
}

// sequentially — one depends on the result of the previous
async function loadUserThenOrders() {
  const user = await fetch("/api/user").then((r) => r.json());
  const orders = await fetch(`/api/orders?userId=${user.id}`).then((r) => r.json());
  return orders;
}
```

### 11. Canceling a Request — `AbortController`

```js
const controller = new AbortController();

fetch("https://api.example.com/products", {
  signal: controller.signal,
})
  .then((response) => response.json())
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("Request was cancelled");
    }
  });

controller.abort(); // cancels the in-flight request

// common real use: cancelling a stale request in a React useEffect cleanup function
// (e.g. a search-as-you-type input, where old requests should be abandoned when a new one starts)
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then((r) => r.json())
    .then(setResults);

  return () => controller.abort(); // cleanup — cancels if the effect re-runs before this finishes
}, [query]);
```

### 12. Ajax / `XMLHttpRequest` (legacy, pre-fetch)

```js
// the original way to make async requests, before fetch() existed —
// still shows up in older/legacy codebases (relevant given jQuery is on your stack)
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/products");
xhr.onload = function () {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  }
};
xhr.send();

// jQuery's $.ajax() wraps this same underlying mechanism with a friendlier API
$.ajax({
  url: "https://api.example.com/products",
  method: "GET",
  success: function (data) {
    console.log(data);
  },
  error: function (error) {
    console.error(error);
  },
});

// fetch() is the modern standard now — Promise-based, cleaner syntax, no library needed
```

### 13. CORS (Cross-Origin Resource Sharing)

```
A browser blocks a fetch request to a DIFFERENT origin (domain/port/protocol) than
the page itself, UNLESS the server explicitly allows it via response headers:

  Access-Control-Allow-Origin: https://yoursite.com
  (or "*" to allow any origin — common for public APIs, avoided for anything sensitive)

This is a SERVER-side configuration — nothing fixable from the client/fetch call itself.
A CORS error in the browser console means the API's server hasn't allowed your domain,
not that your fetch code is written wrong.
```

### 14. Common React Data-Fetching Pattern

```jsx
import { useState, useEffect } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {products.map((p) => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}

// this loading/error/data three-state pattern is the standard shape of nearly
// every real-world data-fetching component
```

### Notes

- **`fetch()` only rejects on network failure, never on HTTP error status codes** (section 7) — this is the single most common fetch bug. Always check `response.ok` (or `response.status`) explicitly before assuming a request "succeeded."
- REST is a set of conventions, not a strict enforced standard — real-world APIs vary in how closely they follow it. The patterns here (resource-based URLs, HTTP methods mapping to actions) represent the common, expected shape, not a hard rule every API follows perfectly.
- `AbortController` (section 11) matters more than it might seem in React specifically — without it, a component that unmounts (or re-runs an effect) while a fetch is still in-flight can try to update state on a component that no longer exists, causing console warnings or subtle bugs.
- This is a reference for the browser-side (client) half of API communication — see the JSON cheat-sheet for `JSON.stringify`/`JSON.parse` mechanics, and the JavaScript cheat-sheet's Promises/async-await section for the underlying async patterns used throughout this sheet.