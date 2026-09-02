// import components
import DemoUseState from "../components/demos/DemoUseState.jsx"; // the component that renders a useState();

// source: https://www.w3schools.com/

const detail = [
  {
    title: "Core Concepts: ",
    description:
      "",
    example: `
    ███╗   ██╗███████╗██╗    ██╗
    ████╗  ██║██╔════╝██║    ██║

    ██║╚██╗██║██╔══╝  ██║███╗██║
    ██║ ╚████║███████╗╚███╔███╔╝
    ╚═╝  ╚═══╝╚══════╝ ╚══╝╚══╝                      

    // ============================================
    // React Core: 
    // ============================================
    //
    
  `,
  tags: [
    "tag",
  ],
  demo: DemoUseState, // calling the component that renders the concept; so it can be used in the CoreCard.jsx component
  category: "Core React",
  },
];

// export the data from the detail array in detailData.js
export default detail;