/*
*** react-syntax-highlighter
- A React component that takes a code string and renders it with real syntax highlighting — colored
keywords, strings, comments, etc., the way a code editor like VS Code displays code, instead of plain monospace text.
Under the hood it wraps two well-known highlighting engines (Prism.js or Highlight.js — you pick which one), and comes
with a large set of prebuilt color themes (like oneDark, dracula, vs, atomDark) you can drop in without building your
own styling from scratch. You tell it what language the snippet is (javascript, jsx, css, etc.) and it parses the
string and colors it accordingly. It's a very common, well-maintained choice for this exact use case — showing
code snippets inside a React app — which is why it fits what you're trying to do with your card component's example field.

*** installation: npm install react-syntax-highlighter
*** import:
- import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
- import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
*/
