interface twcobj {
  [name: string]: string | boolean | string[];
}
type argv = string | twcobj | string[];
interface twc {
  clean: (_val: string) => string;
  split: (_val: string) => string[];
}
/*
isMod: (_val: string) => boolean;
check: (_val: argv) => boolean;

function clean(_val: string) {
  return _val.replace(/\s\s+/g, " ").trim();
}

function split(_val: string) {
  return clean(_val).split(" ");
}
*/
const _twc: twc = {
  clean: (_val) => _val.replace(/\s\s+/g, " ").trim(),
  split: (_val) => _twc.clean(_val).split(" "),
  /*
  isMod: (_val) => {
    if (
      !!_val &&
      !_val.includes(" ") &&
      _val.endsWith(":") &&
      !_val.startsWith(":")
    )
      return true;
    else return false;
  },

  check: (_val) => {
    switch (typeof _val) {
      case "object":
        return !!_val && Array.isArray(_val)
          ? !!_val.length
          : !!Object.keys(_val).length;
      case "string":
        return !!_val;
      default:
        return false;
    }
  },*/
};

function reduce(_arg: argv): string[] {
  const _res: string[] = [""];
  switch (typeof _arg) {
    case "string":
      const _val: string = _twc.clean(_arg);
      if (!!_val) _res.push(..._twc.split(_val));
      break;
    case "object":
      if (Array.isArray(_arg)) {
        for (const _val of _arg) {
          if (!!_val) _res.push(..._twc.split(_val));
        }
      } else {
        for (const [_idx, _val] of Object.entries(_arg)) {
          const _key: string = _twc.clean(_idx);
          if (!!_key) {
            if (typeof _val === "string") {
              if (
                !_key.includes(" ") &&
                _key.endsWith(":") &&
                !_key.startsWith(":")
              ) {
                for (const _cnv of _twc.split(_val)) {
                  _res.push(_key + _cnv);
                }
              } else {
                _res.push(..._twc.split(_key + " " + _val));
              }
            } else if (typeof _val === "object") {
              _res.push(...reduce(_val));
            } else {
              if (_val) _res.push(..._twc.split(_key));
            }
          }
        }
      }
      break;
  }
  return _res;
}

function twcnc(...args: argv[]): string {
  // const _res: string[] = [];
  return !!args.length
    ? args
        .map((_arg) => {
          return reduce(_arg).join(" ").trim();
        })
        .join(" ")
        .trim()
    : "";

  /*
  return !!args.length
    ? args
        .map((_arg) => {
          return reduce(_arg).join(" ").trim();
        })
        .join(" ")
        .trim()
    : "";

for (const _arg of args) {
    if (
      (typeof _arg === "string" && !!_arg) ||
      (typeof _arg === "object" && Array.isArray(_arg)
        ? !!_arg.length
        : !!Object.keys(_arg).length)
    ) {
      _res.push(...reduce(_arg));
    }
  }*/
  // return _res.join(" ").trim();
}

export default twcnc;
