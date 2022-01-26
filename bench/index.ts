import { Suite } from "benchmark";
import twcnc from "../lib/twcnc";

function bench(name: string, ...args: string[]) {
  console.log(`\n# ${name}`);
  new Suite()
    .add(() => twcnc.apply(twcnc, args))
    .on("cycle", (event: { target: string }) => {
      console.log(" " + event.target);
    })
    .run();
}

bench(
  "string classes",
  "text-xl font-medium text-black",
  "shadow-lg flex items-center space-x-4"
);
