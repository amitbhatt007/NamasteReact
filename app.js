/**
 * <div id="parent">
 *  <div id="child1">
 *      <h1>i am h1 tag</h1>
 *      <h2> i am h2 tag</h2>
 *  </div>
 * <div id="child2">
 *      <h1>i am h1 tag</h1>
 *      <h2> i am h2 tag</h2>
 *  </div>
 * </div>
 */
const heading1 = React.createElement("h1", {}, "i am h1 tag");
const heading2 = React.createElement("h2", {}, "i am h2 tag");
const child1 = React.createElement("div", { id: "child1" }, [heading1, heading2]);
const child2 = React.createElement("div", { id: 'child2' }, [heading1, heading2]);
const parent = React.createElement("div", { id: 'parent' }, [child1, child2]);
console.log(parent)  //object
// const heading = React.createElement("h1", { id: "heading", xyz: "abc" }, "Hello world from React");
// console.log(heading) //object
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(parent); // After render all the content inside root will be replaced by parent element