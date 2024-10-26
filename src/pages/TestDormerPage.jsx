import React from "react";
import filePermit from "@/utils/useFilePermit";
import getUserPermits from "@/utils/useGetUserPermits";

export default function TestDormPage() {
  async function handleSubmit(permitData) {
    await filePermit(permitData);
  }

  async function handleGetPermits() {
    const userPermits = await getUserPermits();
    console.log(userPermits);
  }
  return (
    <>
      <h1>This is testing page for filing permit</h1>
      <form
        action=""
        onSubmit={(e) => {
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
    </>
  );
}
