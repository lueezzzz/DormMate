import React from "react";
import filePermit from "@/utils/useFilePermit";
import getUserPermits from "@/utils/useGetUserPermits";
import getDorms from "@/utils/useGetDorms";

export default function TestDormPage() {
  //usage of all the new utils
  //NOTE: these utils are async so there is a WAIT TIME (around 2-3 seconds). be patient pls, we can add a loading animation in the future
  async function handleSubmit(permitData) {
    //just pass the permit data OBJECT -> {} with corresponding properties
    await filePermit(permitData);
  }

  async function handleGetPermits() {
    //it returns an ARRAY of object permits
    const userPermits = await getUserPermits();
    console.log(userPermits);
  }
  async function handleGetDorms() {
    // returns an ARRAY of OBJECTS
    const dorms = await getDorms();
    console.log(dorms);
    //if you look at the console here, each object has a property of isAvailable
    //you can loop or sumth on each element and check if isAvailable is true or not
    //then do conditional rendering stuff
  }
  return (
    <>
      <h1>This is testing page for filing permit</h1>
      <form
        action=""
        onSubmit={(e) => {
          //IMPORTANT NOTE: in react, onsubmit event rerenders the whole page, it is important to use e.preventDefault when using onsubmit events
          //to prevent rerendering while doing async functions (it cuts off the async tasks)
          //you can also avoid this by just doing onClick on buttons and use handler functions (see get permits and dorm mechanism)
          e.preventDefault();
          handleSubmit({
            type: "overnight",
            purpose: "wala lungz",
            randomProp: "hekhok",
          });
        }}
      >
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => handleGetPermits()}>
        get the permits of this user
      </button>
      <br></br>
      <button onClick={() => handleGetDorms()}>get all the dorms</button>
    </>
  );
}
