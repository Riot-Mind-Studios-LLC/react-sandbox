// import components
import ListBuilder from "../components/demos/sandboxDemos/ListBuilder.jsx"; // the component that renders the demo;
import WeatherApp from "../components/demos/sandboxDemos/WeatherApp.jsx"; // the component that renders the demo;

const detail = [
  {
    title: "List Builder App",
    description:
      "a user needs an easy way to create a list based off their inputs.",
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
      "A user needs to check current weather for every state in one application.",
    tags: ["useState()"],
    demo: WeatherApp, // calling the component that renders the concept; so it can be used in the CoreCard.jsx component
    category: "Sandbox Project",
  },
];

// export the data from the detail array in sandboxDetailData.js
export default detail;
