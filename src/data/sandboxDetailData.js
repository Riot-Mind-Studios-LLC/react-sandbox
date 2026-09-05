// import components
import ListBuilder from "../components/demos/sandboxDemos/ListBuilder.jsx"; // the component that renders the demo;


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
    "[ ]"
  ],
  demo: ListBuilder, // calling the component that renders the concept; so it can be used in the CoreCard.jsx component
  category: "Sandbox Project",
  },
  
];

// export the data from the detail array in sandboxDetailData.js
export default detail;