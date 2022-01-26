const { Suite } = require("benchmark");
const twcnc = require("../lib/twcnc");

const suite = new Suite();

suite
  .add("twcnc - test", () =>
    twcnc(
      "text-xl font-medium text-black",
      "shadow-lg flex items-center space-x-4"
    )
  )
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
  
function bench(name, ...args) {
  new Suite().add(() => twcnc.default)
}