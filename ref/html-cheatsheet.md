```js
/*
██╗  ██╗████████╗███╗   ███╗██╗         ███████╗
██║  ██║╚══██╔══╝████╗ ████║██║         ██╔════╝
███████║   ██║   ██╔████╔██║██║         ███████╗
██╔══██║   ██║   ██║╚██╔╝██║██║         ╚════██║
██║  ██║   ██║   ██║ ╚═╝ ██║███████╗    ███████║
╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚══════╝    ╚══════╝                                                
*/
```
# HTML5 - Cheatsheet

Quick reference for HTML5 elements, attributes, and patterns.

### 1. Document Structure & Boilerplate

```html
<!DOCTYPE html>                    <!-- tells the browser to render in standards mode (HTML5) -->
<html lang="en">                    <!-- lang helps screen readers and search engines -->
<head>
  <meta charset="UTF-8" />           <!-- character encoding — should always be first in <head> -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <!-- mobile-responsive scaling -->
  <title>Page Title</title>
  <link rel="stylesheet" href="styles.css" />
  <link rel="icon" href="favicon.ico" />
</head>
<body>
  <!-- visible page content goes here -->
  <script src="script.js"></script>  <!-- scripts commonly go at the end of <body> so HTML loads first -->
</body>
</html>
```

### 2. Semantic Elements (Page Structure)

```html
<header>    </header>    <!-- introductory content, often a page/section header, logo, nav -->
<nav>       </nav>        <!-- a block of primary navigation links -->
<main>      </main>        <!-- the main, unique content of the page — only ONE per page -->
<section>   </section>      <!-- a thematic grouping of content, usually with its own heading -->
<article>   </article>       <!-- self-contained content that could stand alone (a blog post, a card) -->
<aside>     </aside>          <!-- content tangentially related to the main content (sidebar, related links) -->
<footer>    </footer>          <!-- footer content — copyright, links, contact info -->

<!-- Why semantic elements matter over generic <div>s: -->
<!-- 1. Screen readers announce them meaningfully (helps accessibility) -->
<!-- 2. Search engines use them to understand page structure (helps SEO) -->
<!-- 3. They document your layout's intent for other developers reading the code -->
```

### 3. Headings & Text Content

```html
<h1>Main page heading</h1>          <!-- only ONE per page, ideally — the single most important heading -->
<h2>Section heading</h2>
<h3>Sub-section heading</h3>
<h4></h4> <h5></h5> <h6></h6>         <!-- headings should nest in order, don't skip levels for styling alone -->

<p>A paragraph of text.</p>

<blockquote cite="https://source.com">
  A longer quoted passage.
</blockquote>

<pre>
  Preformatted text — preserves whitespace and line breaks exactly as written.
</pre>

<hr />    <!-- a thematic break / horizontal rule -->
<br />     <!-- a single line break — use sparingly, not for spacing (use CSS margin instead) -->
```

### 4. Text-Level Formatting

```html
<strong>Important text</strong>       <!-- bold, semantically means "important" -->
<b>Bold text</b>                        <!-- bold, purely visual, no semantic weight -->
<em>Emphasized text</em>                  <!-- italic, semantically means "emphasis" -->
<i>Italic text</i>                          <!-- italic, purely visual -->
<mark>Highlighted text</mark>
<small>Fine print / side comments</small>
<del>Deleted/removed text</del>
<ins>Inserted text</ins>
<sub>Subscript</sub>  <sup>Superscript</sup>
<code>inline code snippet</code>
<abbr title="HyperText Markup Language">HTML</abbr>  <!-- title shows on hover -->
<span>Generic inline container — no semantic meaning, used for styling/targeting text</span>
```

### 5. Links & Navigation

```html
<a href="https://example.com">External link</a>
<a href="/about">Internal/relative link</a>
<a href="#section-id">Jump to an element with id="section-id" on the same page</a>
<a href="mailto:hire.adrianv@gmail.com">Email link</a>
<a href="tel:+17274803173">Phone link</a>
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Opens in a new tab
  <!-- rel="noopener noreferrer" is a security best practice for target="_blank" links -->
</a>
<a href="file.pdf" download>Download link</a>
```

### 6. Lists

```html
<ul>                      <!-- unordered list -->
  <li>Item one</li>
  <li>Item two</li>
</ul>

<ol>                       <!-- ordered (numbered) list -->
  <li>Step one</li>
  <li>Step two</li>
</ol>

<ol start="5">                <!-- starts numbering at 5 -->
  <li>Item</li>
</ol>

<dl>                            <!-- description list — term/definition pairs -->
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>

<!-- lists can nest -->
<ul>
  <li>Parent item
    <ul>
      <li>Nested item</li>
    </ul>
  </li>
</ul>
```

### 7. Images & Media

```html
<img src="photo.jpg" alt="A description of the image" />
<!-- alt is required for accessibility — describes the image for screen readers -->
<!-- use alt="" (empty) for purely decorative images, so screen readers skip it -->

<img src="photo.jpg" alt="..." width="400" height="300" loading="lazy" />
<!-- loading="lazy" defers loading offscreen images until needed — good for performance -->

<!-- responsive images -->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="..."
/>

<picture>                          <!-- serves different images/formats based on conditions -->
  <source srcset="photo.webp" type="image/webp" />
  <img src="photo.jpg" alt="..." />  <!-- fallback -->
</picture>

<figure>
  <img src="photo.jpg" alt="..." />
  <figcaption>A caption describing the image.</figcaption>
</figure>
```

### 8. Audio & Video

```html
<video controls width="600" poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  Your browser doesn't support video.       <!-- fallback text -->
</video>

<video autoplay muted loop playsinline>       <!-- common pattern for background/hero videos -->
  <source src="bg-video.mp4" type="video/mp4" />
</video>

<audio controls>
  <source src="audio.mp3" type="audio/mpeg" />
</audio>
```

### 9. Tables

```html
<table>
  <caption>Monthly Sales Report</caption>       <!-- accessible table title -->
  <thead>
    <tr>
      <th scope="col">Month</th>                  <!-- scope clarifies header relationship for screen readers -->
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$5,000</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>$5,000</td>
    </tr>
  </tfoot>
</table>

<!-- spanning cells -->
<td colspan="2">Spans two columns</td>
<td rowspan="2">Spans two rows</td>
```

### 10. Forms

```html
<form action="/submit" method="POST">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="4"></textarea>

  <button type="submit">Send</button>
  <button type="reset">Clear</button>
  <button type="button">Does nothing on its own (needs JS)</button>
</form>

<!-- always pair label + input via matching for/id — critical for accessibility & click targets -->
```

### 11. Input Types

```html
<input type="text" />
<input type="email" />
<input type="password" />
<input type="number" min="0" max="100" step="1" />
<input type="tel" />
<input type="url" />
<input type="search" />
<input type="date" />
<input type="time" />
<input type="datetime-local" />
<input type="checkbox" checked />
<input type="radio" name="group" value="option1" />   <!-- radios in the same group share "name" -->
<input type="range" min="0" max="10" />
<input type="color" />
<input type="file" accept="image/*" multiple />
<input type="hidden" name="userId" value="123" />
<input type="submit" value="Submit" />
```

### 12. Input Attributes & Validation

```html
<input type="text" placeholder="Enter your name" />       <!-- hint text, disappears on input — not a label replacement -->
<input type="text" required />                              <!-- must be filled before form submits -->
<input type="text" disabled />                                 <!-- not editable, not submitted with the form -->
<input type="text" readonly />                                   <!-- visible/selectable, but not editable -->
<input type="text" value="Default text" />
<input type="text" maxlength="50" />
<input type="text" pattern="[A-Za-z]{3,}" />                        <!-- regex-based validation -->
<input type="text" autofocus />                                       <!-- focuses this input on page load -->
<input type="text" autocomplete="off" />
```

### 13. Select & Fieldset

```html
<select name="state">
  <option value="">Choose a state</option>
  <option value="ny" selected>New York</option>
  <option value="ca">California</option>
</select>

<select name="colors" multiple>          <!-- allows multiple selections -->
  <option value="red">Red</option>
  <option value="blue">Blue</option>
</select>

<fieldset>                                  <!-- groups related form fields visually + semantically -->
  <legend>Contact Info</legend>               <!-- accessible label for the whole group -->
  <label for="name">Name</label>
  <input type="text" id="name" />
</fieldset>
```

### 14. Global Attributes

```html
<div id="unique-id"></div>                    <!-- must be unique on the page -->
<div class="reusable-class another-class"></div>
<div style="color: red;"></div>                  <!-- inline styles — avoid in favor of a stylesheet/Tailwind -->
<div title="Tooltip text on hover"></div>
<div hidden></div>                                  <!-- removes the element from rendering entirely -->
<div tabindex="0"></div>                              <!-- makes a non-interactive element keyboard-focusable -->
<div contenteditable="true"></div>                      <!-- makes the element directly editable in the browser -->
<div draggable="true"></div>
<div lang="es"></div>                                     <!-- overrides the page language for this element -->
```

### 15. Data Attributes

```html
<div data-user-id="123" data-role="admin">User Card</div>

<!-- accessed in JavaScript via .dataset -->
<script>
  const el = document.querySelector("div");
  el.dataset.userId;   // "123"  — camelCase conversion happens automatically
  el.dataset.role;      // "admin"
</script>
```

### 16. Meta Tags & Head

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="A short description for search engine results" />
<meta name="author" content="Adrian Velazquez" />

<!-- Open Graph tags — control how a link looks when shared on social media -->
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Description for social previews" />
<meta property="og:image" content="https://example.com/preview.jpg" />
<meta property="og:url" content="https://example.com" />

<link rel="canonical" href="https://example.com/page" />   <!-- tells search engines the "real" URL, avoids duplicate-content issues -->
```

### 17. iframe & Embed

```html
<iframe
  src="https://example.com/embed"
  width="600"
  height="400"
  title="Descriptive title for accessibility"
  loading="lazy"
  allowfullscreen
></iframe>

<embed src="file.pdf" type="application/pdf" width="600" height="400" />
```

### 18. SVG Basics

```html
<svg viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="blue" />
  <rect x="10" y="10" width="30" height="30" fill="red" />
  <path d="M10 10 L90 90" stroke="black" stroke-width="2" />
</svg>

<!-- inline SVG can be styled/animated with CSS and JS, unlike <img src="icon.svg" /> -->
```

### 19. Accessibility (ARIA)

```html
<button aria-label="Close menu">✕</button>          <!-- accessible name when visible text isn't descriptive enough -->
<div role="alert">Error: something went wrong</div>    <!-- announces content changes to screen readers -->
<div aria-hidden="true"></div>                            <!-- hides purely decorative content from screen readers -->
<button aria-expanded="false">Toggle dropdown</button>      <!-- communicates open/closed state -->
<nav aria-label="Primary navigation">                          <!-- distinguishes multiple <nav> elements on one page -->
<input aria-invalid="true" aria-describedby="email-error" />
<span id="email-error">Please enter a valid email</span>

<!-- General rule: prefer a real semantic HTML element (<button>, <nav>, <label>) over -->
<!-- a generic <div> + ARIA attributes whenever one exists — native elements come with -->
<!-- built-in accessibility behavior that ARIA alone doesn't replicate. -->
```

### 20. Comments & Void Elements

```html
<!-- This is an HTML comment — not visible on the rendered page -->

<!-- Void elements — self-closing, never wrap content, no closing tag needed -->
<br />
<hr />
<img src="..." alt="..." />
<input type="text" />
<meta charset="UTF-8" />
<link rel="stylesheet" href="..." />
```

### 21. HTML in JSX (React) — Key Differences

```jsx
// class -> className
<div class="card"></div>          {/* HTML */}
<div className="card"></div>       {/* JSX */}

// for -> htmlFor (on <label>)
<label for="email"></label>         {/* HTML */}
<label htmlFor="email"></label>      {/* JSX */}

// self-closing required for void elements
<img src="photo.jpg">                 {/* HTML — closing tag optional */}
<img src="photo.jpg" />                {/* JSX — MUST self-close */}

// inline style is an OBJECT, not a string
<div style="color: red;"></div>          {/* HTML */}
<div style={{ color: "red" }}></div>       {/* JSX — double braces: outer = JS expression, inner = object */}

// camelCase for multi-word attributes
<div tabindex="0" onclick="..."></div>       {/* HTML */}
<div tabIndex="0" onClick={handleClick}></div>  {/* JSX */}

// comments look different
<!-- HTML comment -->
{/* JSX comment */}

// every element needs exactly ONE parent wrapper (or a Fragment)
<><ChildOne /><ChildTwo /></>    {/* Fragment shorthand — groups elements without adding an extra DOM node */}
```

### Notes

- Semantic elements (section 2) aren't just style/naming preference — they carry real meaning for accessibility tools and search engines, and using `<div>` for everything loses that.
- Always pair `<label>` with its input via matching `for`/`id` (or `htmlFor` in JSX) — this isn't optional polish, it's what makes clicking the label focus the input and what screen readers rely on to announce the field correctly.
- `alt` text on images is required for accessibility, even when empty (`alt=""` for decorative images) — never omit the attribute entirely.
- This is a reference for vanilla HTML5 — see section 21 for the specific syntax differences you'll actually be typing day-to-day in your React/JSX components.