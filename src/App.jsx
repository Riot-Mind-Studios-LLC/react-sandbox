/* ============================================

------------------------- App.jsx — how it works

- App.jsx is usually the ROOT component of a React app.
- Vite/CRA render it into the actual HTML page from main.jsx:
  - main.jsx
  - import App from "./App.jsx";
  - ReactDOM.createRoot(document.getElementById("root")).render(<App />);
- Whatever App.jsx returns becomes everything the user sees.

---------------------------------- App function

1. It's just a function that returns JSX
2. It's the natural home for "top-level" state
  - If a piece of state is needed by MULTIPLE unrelated components
  - (not just parent -> one child), App.jsx is usually where it lives,
  - then gets passed down as props. This is called "lifting state up."
3. It often controls "what page/section is showing"
  - Without React Router, a common pattern is a simple state variable that decides which section renders
4. It wraps the app in "providers"
  - Any Context or provider that the whole app needs usually wraps everything INSIDE App.jsx's return statement
  - Anything that needs that Context (like useSidebar()) must be rendered INSIDE the provider — which is why components that
  - consume a Context/provider can't be the component that also creates it.
5. Quick mental model
  - main.jsx   -> boots the app, renders <App /> into the DOM
  - App.jsx    -> the trunk of the tree: shared state, top-level layout, section switching, provider wrapping
  - components -> the branches: everything else gets built from here down

============================================ */

// import layout
// import components
import HookCard from "./components/HookCard.jsx";
import CoreCard from "./components/CoreCard.jsx";
import ProductionCard from "./components/ProductionCard.jsx";
import SandboxCard from "./components/SandboxCard.jsx";

const App = () => {
  // add javascript

  return (
    // add jsx

      <div className="min-h-screen overflow-x-hidden">

        {/* main content of the page */}
        <main>
          <HookCard />
          <CoreCard />
          <ProductionCard />
          <SandboxCard />
        </main>
        
      </div>

  );
};

export default App;
// Like any other component — but it's the top of the tree.
// Every other component gets rendered somewhere inside App,
// directly or through nested components.
