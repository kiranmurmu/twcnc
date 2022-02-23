## twcnc

> _**T**ail**w**ind **c**lass**N**ame **c**onstructor_ is a tiny utility for constructing `className` strings using [Tailwind CSS](https://tailwindcss.com/) class & pseudo-class modifier.

### Install

```
$ npm i -D twcnc
```

### Api doc

The `twcnc` function accepts any number of arguments and each of which can be _String, String Array or Object_. In case of _Object_, key can be _String_ and value must be _String, String Array or Boolean_.

```ts
/**
 * Tailwind className constructor
 * @type {argv} - string | string[] | { [key: string]: string | boolean | string[] }
 * @param {argv[]} args - any number of arguments
 * @returns {string} string
 */
declare function twcnc(...args: argv[]): string;
```

### Usage

```ts
import twcnc from "twcnc";

// String
twcnc(
  " text-xl font-medium   text-black   ",
  "shadow-lg   flex items-center    space-x-4 "
);
// => "text-xl font-medium text-black shadow-lg flex items-center space-x-4"

// Array
twcnc([
  " text-xl font-medium   text-black   ",
  "shadow-lg   flex items-center    space-x-4 ",
]);
// => "text-xl font-medium text-black shadow-lg flex items-center space-x-4"

// Object
twcnc({
  flex: " flex-wrap  text-xl font-medium   text-black   ",
  grid: " grid-cols-4   gap-4   shadow-lg  items-center ",
});
// => "flex flex-wrap text-xl font-medium text-black grid grid-cols-4 gap-4 shadow-lg items-center"

// Object w/ Class Modifier
twcnc({
  ":": " text-xl font-medium   text-black   ",
  "hover:": "shadow-lg   flex items-center    space-x-4 ",
});
// => "text-xl font-medium text-black hover:shadow-lg hover:flex hover:items-center hover:space-x-4"

// Object w/ Array
twcnc({
  flex: [" flex-wrap   text-xl ", "font-medium   text-black "],
  grid: ["   grid-cols-4  gap-4", "   shadow-lg  items-center"],
});
// => "flex flex-wrap text-xl font-medium text-black grid grid-cols-4 gap-4 shadow-lg items-center"

// Object w/ Array & Class Modifier
twcnc({
  ":": [" text-xl ", "  font-medium", "text-black   "],
  "hover:": ["shadow-lg   flex", "  items-center  space-x-4 "],
});
// => "text-xl font-medium text-black hover:shadow-lg hover:flex hover:items-center hover:space-x-4"

// Object w/ Boolean
twcnc({
  "  flex  flex-wrap    text-xl font-medium  text-black  ": true,
  "grid   grid-cols-4 gap-4    shadow-lg  items-center  ": true,
  "text-xl font-medium text-black shadow-lg flex items-center space-x-4": false,
});
// => "flex flex-wrap text-xl font-medium text-black grid grid-cols-4 gap-4 shadow-lg items-center"

// falsey values are discarded!
twcnc(null, undefined, "", " ", [], {}, [null, undefined, "", " "], {
  " ": "foo",
  0: " ",
  1: null,
  2: undefined,
  3: [],
  4: [null, undefined, "", " "],
  " :": " ",
  "0:": " ",
  "1:": null,
  "2:": undefined,
  "3:": [],
  "4:": [null, undefined, "", " "],
});
// => ""
```

### Example

```jsx
// Input - jsx script
import twcnc from "twcnc";

function ButtonSave() {
  return (
    <button
      type="button"
      className={twcnc({
        "text-white": [
          "bg-violet-500 px-5 py-2",
          "rounded-full font-semibold",
          "text-sm leading-5",
        ],
        "hover:": "bg-violet-600 ",
        "focus:": "outline-none ring ring-violet-300",
        "active:": "bg-violet-700",
      })}
    >
      Save changes
    </button>
  );
}

export default ButtonSave;

// Output - html element
<button
  type="button"
  class="text-white bg-violet-500 px-5 py-2 rounded-full font-semibold text-sm leading-5 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700"
>
  Save changes
</button>;
```

### License

MIT © 2022 [Kiran Murmu](mailto:kiranmurmu@outlook.in)
