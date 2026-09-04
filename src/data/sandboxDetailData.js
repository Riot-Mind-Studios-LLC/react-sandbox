// import components
import DemoTestDemo from "../components/demos/sandboxDemos/DemoTestDemo.jsx"; // the component that renders the demo;


// source: https://www.w3schools.com/

const detail = [
  {
    title: "Project Title",
    description:
      "A small description of what this project is",
    example: `
     __________________   ____
    /_  __/  _/_  __/ /  / __/
    / / _/ /  / / / /__/ _/  
    /_/ /___/ /_/ /____/___/  

    // ============================================
    // Project:
    // ============================================
    //
  `,
  tags: [
    "tag",
  ],
  demo: DemoTestDemo, // calling the component that renders the concept; so it can be used in the CoreCard.jsx component
  category: "Sandbox Project",
  },
  
];

// export the data from the detail array in sandboxDetailData.js
export default detail;