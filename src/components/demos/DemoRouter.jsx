import { createBrowserRouter, RouterProvider, Outlet, Link, useParams } from "react-router";

// a shared layout — the nav stays mounted, only the Outlet content changes
const DemoLayout = () => (
  <div className="p-4 rounded-md border border-amber-300 bg-white">
    <nav className="flex gap-3 mb-3 pb-3 border-b border-amber-200">
      <Link to="/" className="text-xs font-medium text-amber-700 hover:underline">Home</Link>
      <Link to="/about" className="text-xs font-medium text-amber-700 hover:underline">About</Link>
      <Link to="/products/42" className="text-xs font-medium text-amber-700 hover:underline">Product 42</Link>
    </nav>
    <Outlet />
  </div>
);

const DemoHome = () => <p className="text-sm text-black">You're on the Home route ("/").</p>;
const DemoAbout = () => <p className="text-sm text-black">You're on the About route ("/about").</p>;

const DemoProduct = () => {
  const { id } = useParams();
  return <p className="text-sm text-black">Viewing product ID: <span className="font-mono">{id}</span></p>;
};

const demoRouter = createBrowserRouter([
  {
    path: "/",
    element: <DemoLayout />,
    children: [
      { index: true, element: <DemoHome /> },
      { path: "about", element: <DemoAbout /> },
      { path: "products/:id", element: <DemoProduct /> },
    ],
  },
]);

const DemoRouter = () => <RouterProvider router={demoRouter} />;

export default DemoRouter;
/** What proves the concept here:
 * The nav bar stays fixed at the top across all three links — only the content below it (rendered via <Outlet />) changes. This is the composition pattern from your earlier card, applied to routing specifically.
 * Clicking "Product 42" demonstrates the dynamic :id segment — useParams() reads 42 directly out of the URL, no props manually passed anywhere.
 * Your browser's actual URL bar will update as you click between links (/, /about, /products/42) — and critically, no full page reload happens — this is genuinely different from clicking a plain <a> tag, and worth confirming by noticing the page doesn't flash/reload.
 * 
 * 
 * One real caveat worth flagging before you test this: since this demo creates its own separate router, nested inside your existing sandbox app
 * (which likely already has its own routing setup, or none at all depending on how App.jsx is structured), having two separate RouterProvider instances
 * active on the same page can behave unpredictably in a real app — this works fine as an isolated, self-contained demo specifically because it's not nested
 * inside another router. Just flagging this isn't necessarily the pattern for wiring multiple real routers together — it's illustrating the core mechanic in isolation.
 */