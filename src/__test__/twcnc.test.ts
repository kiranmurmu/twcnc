import twcnc from "../twcnc";

test("Test 00: Input type - all | invalid classes", () => {
  expect(twcnc("", [], {})).toBe("");
});

test("Test 01: Input type - string | string classes", () => {
  expect(
    twcnc(
      "text-xl font-medium text-black",
      "shadow-lg flex items-center space-x-4"
    )
  ).toBe(
    "text-xl font-medium text-black shadow-lg flex items-center space-x-4"
  );
});

test("Test 02: Input type - string array | string array classes", () => {
  expect(
    twcnc([
      "text-xl font-medium text-black",
      "shadow-lg flex items-center space-x-4",
    ])
  ).toBe(
    "text-xl font-medium text-black shadow-lg flex items-center space-x-4"
  );
});

test("Test 03: Input type - object | key, value classes", () => {
  expect(
    twcnc({
      "focus:": "text-xl font-medium text-black",
      "hover:": "shadow-lg flex items-center space-x-4",
    })
  ).toBe(
    "focus:text-xl focus:font-medium focus:text-black " +
      "hover:shadow-lg hover:flex hover:items-center hover:space-x-4"
  );
});
