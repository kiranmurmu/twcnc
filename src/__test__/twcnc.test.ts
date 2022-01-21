import twcnc from "../twcnc";

test("Test 01: Input type - string | multiple class names", () => {
  expect(twcnc("class1", "class2")).toBe("class1 class2");
});
