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

function _cn_str(_val: string): string[] {
  const _res: string = _val.replace(/\s\s+/g, " ").trim();
  if (!!_res) return _res.split(" ");
  return [""];
}

function _cn_obj(_ent: string[] | twcobj): string {
  let _res = "";
  if (Array.isArray(_ent)) {
    for (const _val of _ent) {
      if (!_val) continue;
      if (_res) _res += " ";
      _res += _val;
    }
  } else {
    for (const _key in _ent) {
      if (!_ent[_key] || !_key) continue;
      if (_res) _res += " ";
      _res += _ent[_key];
    }
  }
  return _res;
}

function _cn_mix(_arg: argv): string[] {
  const _res: string[] = [];
  switch (typeof _arg) {
    case "string":
      _res.push(..._cn_str(_arg));
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
            } else if (typeof _val === "object" && Array.isArray(_val)) {
              const _arr: string[] = _cn_mix(_val);
              if (
                !_key.includes(" ") &&
                _key.endsWith(":") &&
                !_key.startsWith(":")
              ) {
                for (const _cnv of _arr) {
                  _res.push(_key + _cnv);
                }
              } else {
                _arr.unshift(_key);
                _res.push(..._arr);
              }
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
    _res.push(..._cn_mix(_arg));
  }
  return _res.join(" ").trim();
}

export default twcnc;
