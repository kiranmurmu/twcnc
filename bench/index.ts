import { Suite } from "benchmark";
import twcnc from "../lib/twcnc";

type cobj = {
  [key: string]: string | boolean | string[];
};
type argv = string | string[] | cobj;

function bench(name: string, ...args: argv[]) {
  console.log(`\n# ${name}`);
  new Suite()
    .add(() => twcnc.apply(twcnc, args))
    .on("cycle", (event: { target: string }) => {
      console.log(" " + event.target);
    })
    .run();
}

bench("String", "ab cd", "ef gh");

bench("Array", ["ab cd ef gh"]);

bench("Object", {
  ab: "cd ef gh",
});

bench("Object w/ Class Modifier", {
  "ab:": "cd ef gh",
});

bench("Object w/ Array", {
  ab: ["cd", "ef", "gh"],
});

bench("Object w/ Array & Class Modifier", {
  "ab:": ["cd", "ef", "gh"],
});

bench("Object w/ Boolean", {
  "ab cd ef gh": true,
});
