import twcnc from "../src/twcnc";

test("Test 00: Return", () => {
  expect(typeof twcnc).toBe("function");
  expect(typeof twcnc()).toBe("string");
});

test("Test 01: String", () => {
  expect(
    twcnc(
      " text-xl font-medium   text-black   ",
      "shadow-lg   flex items-center    space-x-4 "
    )
  ).toBe(
    "text-xl font-medium text-black shadow-lg flex items-center space-x-4"
  );
});

test("Test 02: Array", () => {
  expect(
    twcnc([
      " text-xl font-medium   text-black   ",
      "shadow-lg   flex items-center    space-x-4 ",
    ])
  ).toBe(
    "text-xl font-medium text-black shadow-lg flex items-center space-x-4"
  );
});

test("Test 03: Object", () => {
  expect(
    twcnc({
      flex: " flex-wrap  text-xl font-medium   text-black   ",
      grid: " grid-cols-4   gap-4   shadow-lg  items-center ",
    })
  ).toBe(
    "flex flex-wrap text-xl font-medium text-black " +
      "grid grid-cols-4 gap-4 shadow-lg items-center"
  );
});

test("Test 04: Object w/ Class Modifier", () => {
  expect(
    twcnc({
      ":": " text-xl font-medium   text-black   ",
      "hover:": "shadow-lg   flex items-center    space-x-4 ",
    })
  ).toBe(
    "text-xl font-medium text-black " +
      "hover:shadow-lg hover:flex hover:items-center hover:space-x-4"
  );
});

test("Test 05: Object w/ Array", () => {
  expect(
    twcnc({
      flex: [" flex-wrap   text-xl ", "font-medium   text-black "],
      grid: ["   grid-cols-4  gap-4", "   shadow-lg  items-center"],
    })
  ).toBe(
    "flex flex-wrap text-xl font-medium text-black " +
      "grid grid-cols-4 gap-4 shadow-lg items-center"
  );
});

test("Test 06: Object w/ Array & Class Modifier", () => {
  expect(
    twcnc({
      ":": [" text-xl ", "  font-medium", "text-black   "],
      "hover:": ["shadow-lg   flex", "  items-center  space-x-4 "],
    })
  ).toBe(
    "text-xl font-medium text-black " +
      "hover:shadow-lg hover:flex hover:items-center hover:space-x-4"
  );
});

test("Test 07: Object w/ Boolean", () => {
  expect(
    twcnc({
      "  flex  flex-wrap    text-xl font-medium  text-black  ": true,
      "grid   grid-cols-4 gap-4    shadow-lg  items-center  ": true,
      "text-xl font-medium text-black shadow-lg flex items-center space-x-4":
        false,
    })
  ).toBe(
    "flex flex-wrap text-xl font-medium text-black " +
      "grid grid-cols-4 gap-4 shadow-lg items-center"
  );
});

test("Test 08: Invalid", () => {
  expect(
    twcnc(null, undefined, "", " ", [], {}, [null, undefined, "", " "], {
      " ": "foo",
      "0": " ",
      "1": null,
      "2": undefined,
      "3": [],
      "4": [null, undefined, "", " "],
      " :": " ",
      "0:": " ",
      "1:": null,
      "2:": undefined,
      "3:": [],
      "4:": [null, undefined, "", " "],
    })
  ).toBe("");
});
