// import components
import ListBuilder from "../components/demos/sandboxDemos/ListBuilder.jsx"; // the component that renders the demo;
import WeatherApp from "../components/demos/sandboxDemos/WeatherApp.jsx"; // the component that renders the demo;
import QuotesApp from "../components/demos/sandboxDemos/QuotesApp.jsx"; // the component that renders the demo;
import ExpenseTrackerApp from "../components/demos/sandboxDemos/ExpenseTrackerApp.jsx"; // the component that renders the demo;

const detail = [
  {
    title: "List Builder App",
    description:
      "A user needs an easy way to create a list based off their inputs.",
    tags: [
      "useState()",
      "map()",
      "<button>",
      "<input>",
      "[ ... ]",
      "onChange",
      "onCLick",
      "value",
      "e.target.value",
    ],
    demo: ListBuilder, // calling the component that renders the concept; so it can be used in the CoreCard.jsx component
    category: "Sandbox Project",
  },
  {
    title: "Weather App",
    description:
      "A user needs to check current weather for every state in one app.",
    tags: [
      "useState()",
      "useEffect()",
      "fetch()",
      "async / await",
      ".json()",
      "url",
      ".map()",
      "[ parallel ]",
    ],
    demo: WeatherApp, // calling the component that renders the concept; so it can be used in the CoreCard.jsx component
    category: "Sandbox Project",
  },
  {
    title: "Inspirational Quotes App",
    description: "A user wants random inspirational quotes.",
    tags: [
      "useState()",
      "fetch()",
      "api",
      "async / await",
      ".json()",
      "url",
      "<button>",
      "onCLick",
    ],
    demo: QuotesApp, // calling the component that renders the concept; so it can be used in the CoreCard.jsx component
    category: "Sandbox Project",
  },
  {
    title: "Expense Tracker App",
    description: "A user wants to track daily income & expenses",
    tags: ["useState()"],
    demo: ExpenseTrackerApp, // calling the component that renders the concept; so it can be used in the CoreCard.jsx component
    category: "Sandbox Project",
  },
];

// export the data from the detail array in sandboxDetailData.js
export default detail;
