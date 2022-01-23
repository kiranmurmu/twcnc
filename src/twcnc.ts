interface twcobj {
  [name: string]: string | boolean | string[];
}
type argv = string | twcobj | string[];
interface twc {
  clean: (_val: string) => string;
  split: (_val: string) => string[];
}

const _twc: twc = {
  clean: (_val) => _val.replace(/\s\s+/g, " ").trim(),
  split: (_val) => _twc.clean(_val).split(" "),
};

function reduce(_arg: argv): string[] {
  const _res: string[] = [];
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
  const _res: string[] = [];
  for (const _arg of args) {
    _res.push(...reduce(_arg));
  }
  return _res.join(" ").trim();
}

export default twcnc;
