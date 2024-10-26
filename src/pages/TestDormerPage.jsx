import React from "react";
import { filePermit } from "@/utils/useFilePermit";

export default function TestDormPage() {
  async function handleSubmit(permitData) {
    const userInfo = await filePermit(permitData);
    console.log(userInfo);
  }
  return (
    <>
      <h1>This is testing page for filing permit</h1>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({ type: "overnight", purpose: "wala lungz" });
        }}
      >
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
