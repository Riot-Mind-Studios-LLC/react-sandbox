/*


========================================================================================================================================================================================================================================== >
========================================================================================================================================================================================================================================== >
██████╗ ███████╗ █████╗  ██████╗████████╗
██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝
██████╔╝█████╗  ███████║██║        ██║   
██╔══██╗██╔══╝  ██╔══██║██║        ██║   
██║  ██║███████╗██║  ██║╚██████╗   ██║   
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   

███████╗███╗   ██╗██╗██████╗ ██████╗ ███████╗████████╗███████╗
██╔════╝████╗  ██║██║██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔════╝
███████╗██╔██╗ ██║██║██████╔╝██████╔╝█████╗     ██║   ███████╗
╚════██║██║╚██╗██║██║██╔═══╝ ██╔═══╝ ██╔══╝     ██║   ╚════██║
███████║██║ ╚████║██║██║     ██║     ███████╗   ██║   ███████║
╚══════╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝     ╚══════╝   ╚═╝   ╚══════╝
=========================================================================================================================================================================================================================================== >
=========================================================================================================================================================================================================================================== >


├── ------------------------------------------------------------------------------------------------------ REACT HOOKS
├── State Management: work with react state
├──     - useState: re-render components when the state of the component changes - useState()
├── Ref Hooks: reference javascript values or dom elements
├──     - useRef
├── Effect Hooks: perform side effects
├──     - useEffect
├── Context Hooks: read from react context
├──     - useContext
├── React 19 Hooks
├──     - useFromStatus
├──     - useFormState
├──     - useOptimistic(): what to do while we're waiting for action to finish running - good for real-time apps and to avoid making users wait
├──     - use(): lets you load resources asynchronously - resolves promises or context (replaces useEffect and useContext)
├──
├──
├──
├──
├──
└──

├── ------------------------------------------------------------------------------------------------------ DIRECTORY
├── BASIC REACT COMPONENTS
├── PULL JSON DATA FROM AN ARRAY
├── RENDER JSON ARRAY DATA AS A LIST
├── BASIC JSON DATA
├── DESTRUCTURING A TYPICAL COMPONENT
├── TURN DATA INTO UI
├── DECIDE WHAT TO RENDER BASED ON A CONDITION
├── OPTIONAL CHAINING & NULLISH COALESCING
├── REACT HOOKS
├──
├──
├──
├──
├──
├──
├──
├──
├──
└──

*/


/* ======================================================================================================= BASIC REACT COMPONENTS */
const ComponentOne = () => {
  return (
    // single item
    <div>Stuff</div>
  )
}
export default ComponentOne;

// add to main App.jsx file
<ComponentOne />


const ComponentTwo = () => {
  return (
    // multiple items
    <>
        <h1>Header Stuff</h1>
        <p>Paragraph stuff in here</p>
    </>
    
  )
}
export default ComponentTwo;

// add to main App.jsx file
<ComponentTwo />


/* ======================================================================================================= PULL JSON DATA */
    // a component that pulls from a data.json file
    // requires a data.json file with an array of info to pull from

const Info = (item) => {
    return (
        <>
            <h1>{item.title}</h1>
            <p>{item.type}</p>
            <p>{item.description}</p>
        </>
    )
}
export default Info


/* ======================================================================================================= RENDER JSON ARRAY DATA AS A LIST */
// import the json data from the Info component
import Info from './Info';// imports the Info component where the data is stored for the HTML rendering
import items from '../data.json';// returns an array from the json file

const listItems = () => {
// check to see if json data has loaded
// console.log(items);

    return (
        <section>
            <div>
                {items.map((item) => (
                    <Info key = {item.id} item = {item}/>
                ))}
            </div>
        </section>
    )

}
export default listItems

// add to main App.jsx file
<Info />


/* ======================================================================================================= BASIC JSON DATA */
[
    {
        "id": 1,
        "title": "Lorem Ipsum Dolor Set",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu quam risus. Pellentesque nulla urna, euismod et facilisis ut, vestibulum elementum est. Donec sagittis lobortis convallis. Phasellus elementum, tortor et vehicula sodales, ante magna sagittis nisl, eu malesuada massa ipsum cursus ante. Aenean eu lectus augue. Vestibulum mollis nisl quam, ultrices luctus ipsum accumsan eu. Cras pellentesque urna vitae est pulvinar interdum. Morbi porta lacus sapien, id ultrices velit molestie vel. Proin at turpis in libero luctus egestas et at nunc. Nulla rutrum commodo mauris, in fermentum libero. Vestibulum consequat posuere magna id laoreet. In ut egestas magna. Donec odio velit, venenatis eu pulvinar vestibulum, commodo eget felis.",
    },
    {
        "id": 2,
        "title": "Lorem Ipsum Dolor Set",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu quam risus. Pellentesque nulla urna, euismod et facilisis ut, vestibulum elementum est. Donec sagittis lobortis convallis. Phasellus elementum, tortor et vehicula sodales, ante magna sagittis nisl, eu malesuada massa ipsum cursus ante. Aenean eu lectus augue. Vestibulum mollis nisl quam, ultrices luctus ipsum accumsan eu. Cras pellentesque urna vitae est pulvinar interdum. Morbi porta lacus sapien, id ultrices velit molestie vel. Proin at turpis in libero luctus egestas et at nunc. Nulla rutrum commodo mauris, in fermentum libero. Vestibulum consequat posuere magna id laoreet. In ut egestas magna. Donec odio velit, venenatis eu pulvinar vestibulum, commodo eget felis.",
    },
    {
        "id": 3,
        "title": "Lorem Ipsum Dolor Set",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu quam risus. Pellentesque nulla urna, euismod et facilisis ut, vestibulum elementum est. Donec sagittis lobortis convallis. Phasellus elementum, tortor et vehicula sodales, ante magna sagittis nisl, eu malesuada massa ipsum cursus ante. Aenean eu lectus augue. Vestibulum mollis nisl quam, ultrices luctus ipsum accumsan eu. Cras pellentesque urna vitae est pulvinar interdum. Morbi porta lacus sapien, id ultrices velit molestie vel. Proin at turpis in libero luctus egestas et at nunc. Nulla rutrum commodo mauris, in fermentum libero. Vestibulum consequat posuere magna id laoreet. In ut egestas magna. Donec odio velit, venenatis eu pulvinar vestibulum, commodo eget felis.",
    },
    {
        "id": 4,
        "title": "Lorem Ipsum Dolor Set",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu quam risus. Pellentesque nulla urna, euismod et facilisis ut, vestibulum elementum est. Donec sagittis lobortis convallis. Phasellus elementum, tortor et vehicula sodales, ante magna sagittis nisl, eu malesuada massa ipsum cursus ante. Aenean eu lectus augue. Vestibulum mollis nisl quam, ultrices luctus ipsum accumsan eu. Cras pellentesque urna vitae est pulvinar interdum. Morbi porta lacus sapien, id ultrices velit molestie vel. Proin at turpis in libero luctus egestas et at nunc. Nulla rutrum commodo mauris, in fermentum libero. Vestibulum consequat posuere magna id laoreet. In ut egestas magna. Donec odio velit, venenatis eu pulvinar vestibulum, commodo eget felis.",
    },
    {
        "id": 5,
        "title": "Lorem Ipsum Dolor Set",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu quam risus. Pellentesque nulla urna, euismod et facilisis ut, vestibulum elementum est. Donec sagittis lobortis convallis. Phasellus elementum, tortor et vehicula sodales, ante magna sagittis nisl, eu malesuada massa ipsum cursus ante. Aenean eu lectus augue. Vestibulum mollis nisl quam, ultrices luctus ipsum accumsan eu. Cras pellentesque urna vitae est pulvinar interdum. Morbi porta lacus sapien, id ultrices velit molestie vel. Proin at turpis in libero luctus egestas et at nunc. Nulla rutrum commodo mauris, in fermentum libero. Vestibulum consequat posuere magna id laoreet. In ut egestas magna. Donec odio velit, venenatis eu pulvinar vestibulum, commodo eget felis.",
    },
    {
        "id": 6,
        "title": "Lorem Ipsum Dolor Set",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu quam risus. Pellentesque nulla urna, euismod et facilisis ut, vestibulum elementum est. Donec sagittis lobortis convallis. Phasellus elementum, tortor et vehicula sodales, ante magna sagittis nisl, eu malesuada massa ipsum cursus ante. Aenean eu lectus augue. Vestibulum mollis nisl quam, ultrices luctus ipsum accumsan eu. Cras pellentesque urna vitae est pulvinar interdum. Morbi porta lacus sapien, id ultrices velit molestie vel. Proin at turpis in libero luctus egestas et at nunc. Nulla rutrum commodo mauris, in fermentum libero. Vestibulum consequat posuere magna id laoreet. In ut egestas magna. Donec odio velit, venenatis eu pulvinar vestibulum, commodo eget felis.",
        "info": {
            "name": "John Doe",
            "age": 46,
            "location": "Brooklyn, NY",
            "contact": "j.doe@gmail.com"
        }
    }
]


/* ======================================================================================================= DESTRUCTURING A TYPICAL COMPONENT */
const ComponentThree = (props) => {// receive the props object

  const {title, price, isActive} = props;// desctructure the object into its own variable
  return (
    // call the properties of the object seperatley
    <div className={isActive ? "car active" : "card"}>
        <h2>{title}</h2>
        <p>${price}</p>
    </div>
  );
}
export default ComponentThree;

// add to main App.jsx file
<ComponentThree />


/* ======================================================================================================= TURN DATA INTO UI */
const ProductList = () => {

  const products = [
    {id: 1, title: "keyboard", price: 49},
    {id: 2, title: "mouse", price: 19},
    {id: 3, title: "monitor", price: 199}
  ]
  return (
    // display the list in the array on the page
    // use map to loop through every item in the list
    <ul>
        {products.map(product => (
            <li key={product.id}>
                {product.title} - ${product.price}
            </li>
        ))}
    </ul>
  );
}
export default ProductList;

// add to main App.jsx file
<ProductList />


/* ======================================================================================================= DECIDE WHAT TO RENDER BASED ON A CONDITION */
return (
    <>
        {inStock ? <button>Buy</button> : <p>Sold out</p>};
    </>
);

// if the expression on the left is true, rwact will render what is on the right
    // condition && valueIfTrue
    // if it is false, react will render nothing

    // when the product is on sale, render text that says "Sale"
return (
    <div>
        {isOnSale && <span>Sale</span>};
    </div>
)


/* ======================================================================================================= OPTIONAL CHAINING & NULLISH COALESCING */
    // the optional chaining (?.) operator accesses an objects property or calls a function.
    // if the object accessed or function called using this operator doesnt exist or is undefined or null, the expression shortcircuits and evaluates to undefined instead of throwing an error
    // lets you access a value only if it exists
    // ?. asks if the user exists
    // ?? (nullish coalescing) is used as a fallback value - only kicks in when the value returns null or undefined

// show a users first name in a heading
// without optional chaining, the app would crash if the user does not exist yet
const [user, setUser] = useState(null);

// Guest is only used when firstname is missing
return(
    <div>
        <h1>{user?.firstname ?? "Guest"}</h1>
    </div>
)


/* ======================================================================================================= REACT HOOKS */
// most common hooks

// useState()
const [] = useState();

// 1. give it an initial value (can be any javascript value)
// 2. that will be stored in your state variable thats returned when you call useState()
// 3. its returned in an array which can be destructured as 2 seperate variables
const [stateVariable, functionOrVariableToUpdateTheStateVariable] = useState('Initial Value');

// use state is good for capturing user inputs in form fields like inputs text areas and selects
// it can be good to show or hide components like modals, tooltips or dropdowns when you give it a boolean state value
// you can also use a boolean state value to conditionally apply classes and styles
// you can ork with number values like in shopping carts or counters
// state is immutable (can't modify directly) while refs are mutable (can modify directly)


// useReducer()
const [] = useReducer();

// 1. takes reducer function and starting state value
// 2. it returns a state variable and a function called dispatch
// 3. when dispatch is called, it runs the reducer function and sends data to it called an "action"
// 4. the action conditionally sets state based off of what action came in

const [stateVariable, dispatch] = useReducer(reducerFunction, startingStateValue)

// useful for performing more complex state management
// good to use if you have a lot of related state
// uses a "reducer" function to update state
// this can simplify code because all the state updates can be done in a single function
// use reducer works well for simplifying components with multiple related state values
// like multiple inputs within a form
// its also good for components where the state depends on other values
// good for apps with a lot of user interactions


// useEffect()
useEffect(() => {

  // 1. Setup code: Runs after the component renders
  return () => {
    // 2. Cleanup code (Optional): Runs before the next effect and on unmount
  };

}, [dependencies]); // 3. Dependency Array (Optional)

// 1. give use effect a function to run - by default, it will run after each render
// 2. to change that behavior, you can give it a dependancies array
// 3. whan any value in this array changes,the effect function will run
// 4. when it changes or an action is taken it will be updated in state which, will cause the effect to run and update

const [dependencies, functionOrVariableToUpdateTheStateVariable] = useState();

useEffect(() => {
    functionToRun = `You clicked ${dependencies} times`;
}, [dependencies]);

<button onClick={() => functionOrVariableToUpdateTheStateVariable(dependencies + 1)}>
    Click Me
</button>

// used to perform side-effects in react
// lets you synchronize with a system outside of react
// useEffect is asynchronous
// types of effects:
    // event based side effects (i.e. button click)
    // render-based sde effects (i.e. fetching data) - runs after render
// instead of performing side effects when an event happens in useEffect, do it directly in an eventHandler
// instead of fetching data when your component mounts and putting it in state, use a more sophisticated too like react query or next.js
// when to use useEffect:
    // when you need to sync your ract code with a browser api


// useRef()
useRef();

// 1. pass in an initial value
// 2. access ref directly
// 3. to access the underlying value, use the "current" property

const ref = useRef(data);
ref.current


// refs are an "escape hatch"
// refs let us remember data kind of like useState but without triggering a re-render
// refs can be given any data value
// ref only return 1 value, which is whatever you passed it
// refs are mutable (can modify directly), while state is immutable (can't modify directly)
    // mutable: current property can be modified directly using the equals operator
// dom elements can also be stored in refs
    // you can do this by connecting a created ref to the ref prop of an element    

const inputElement = useRef(null);

const handleFocus = () => {
    inputElement.current.focus();// use the current property to access the underlying dom element
};

<input ref={inputElement} type='text' />


<button onClick={handleFocus}>Focus</button>


// useTransition()
useTransition();

// in react, all state updates are considered to be urgent
// use transition is a transition hook that allows us to specify that certain state updates are NOT urgent
// this is helpful for state updates that involve heavy computations which can lead to a bad user experience if they're executed immediately
// you can make your app more responsive by wrapping these state updates in a transition
// use transition also gives us an isPedning boolean value to tell us when the transition is pending
// this allows us to show loading state to the user until the state update finishes

// a good usecase for using useTRansition() is filtering a list based on user input
    // typing into the input might cause the UI to freeze or be sluggish because the app is trying to rerender the list after each keystroke

const [filter, setFilter] = useState('');
const [inputValue, setInputValue] = useState('');
const [isPending, startTransition] = useTransition();

const filteredItems = items.filter(item => item.includes(filter));

<input 
    value={inputValue}
    onChange={(e) => {
        setInputValue(e.target.value)
        startTransition(() => {// mark non urgent with startTransition()
            setFilter(e.target.value)
        })
    }}
    placeholder='Type to filter...'/>

{isPending ? <p>Loading...</p> : filteredItems.map(item => <div key={item}> {item} </div>)}