import twcnc from "../src/twcnc";

test("Test 00: Input type - all | invalid classes", () => {
  expect(twcnc("", [], {})).toBe("");
});

test("Test 01: Input type - string | string classes", () => {
  expect(
    twcnc(
      " text-xl font-medium   text-black   ",
      "shadow-lg   flex items-center    space-x-4 "
    )
  ).toBe(
    "text-xl font-medium text-black shadow-lg flex items-center space-x-4"
  );
});

test("Test 02: Input type - string array | string array classes", () => {
  expect(
    twcnc([
      " text-xl font-medium   text-black   ",
      "shadow-lg   flex items-center    space-x-4 ",
    ])
  ).toBe(
    "text-xl font-medium text-black shadow-lg flex items-center space-x-4"
  );
});

test("Test 03: Input type - object | object classes with key modifier", () => {
  expect(
    twcnc({
      "focus:": " text-xl font-medium   text-black   ",
      "hover:": "shadow-lg   flex items-center    space-x-4 ",
    })
  ).toBe(
    "focus:text-xl focus:font-medium focus:text-black " +
      "hover:shadow-lg hover:flex hover:items-center hover:space-x-4"
  );
});

test("Test 04: Input type - object | object classes without key modifier", () => {
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

test("Test 05: Input type - object | object classes with string array", () => {
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

test("Test 06: Input type - object | object classes with string array and key modifier", () => {
  expect(
    twcnc({
      "focus:": [" text-xl ", "  font-medium", "text-black   "],
      "hover:": ["shadow-lg   flex", "  items-center  space-x-4 "],
    })
  ).toBe(
    "focus:text-xl focus:font-medium focus:text-black " +
      "hover:shadow-lg hover:flex hover:items-center hover:space-x-4"
  );
});

test("Test 07: Input type - object | object classes with boolean", () => {
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
