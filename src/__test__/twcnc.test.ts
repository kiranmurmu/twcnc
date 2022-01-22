import twcnc from "../twcnc";

test("Test 00: Input type - all | check if value is empty", () => {
  expect(twcnc("", [], {})).toBe("");
});

test("Test 01: Input type - string | multiple normal class names", () => {
  expect(twcnc("text-xl font-medium text-black")).toBe(
    "text-xl font-medium text-black"
  );
});
