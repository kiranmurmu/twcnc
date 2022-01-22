import twcnc from "../twcnc";

test("Test 00: Input type - all | check if value is empty", () => {
  expect(twcnc("", [], {})).toBe("");
});

test("Test 01: Input type - string | multiple class names", () => {
  expect(twcnc("class1", "class2", ["class3"])).toBe("class1 class2");
});
