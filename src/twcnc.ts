type cobj = {
  [key: string]: string | boolean | string[];
};
type argv = string | string[] | cobj;

function _cn_cln(_val: string): string {
  let _res = "";

  for (const _cnv of _val.split(" ")) {
    if (!_cnv) continue;
    if (_res) _res += " ";
    _res += _cnv;
  }

  return _res;
}

function _cn_str(_key: string, _val: string[]): string {
  let _res = "";

  if (!_key.includes(" ") && _key.endsWith(":") && !_key.startsWith(":")) {
    for (const _cnv of _val) {
      if (!_cnv) continue;
      if (_res) _res += " ";
      _res += _key + _cnv;
    }
  } else {
    if (_key) _res += _key;

    for (const _cnv of _val) {
      if (!_cnv) continue;
      if (_res) _res += " ";
      _res += _cnv;
    }
  }

  return _res;
}

function _cn_arr(_key: string, _val: string[]): string {
  let _res = "";

  if (!_key.includes(" ") && _key.endsWith(":") && !_key.startsWith(":")) {
    for (const _cni of _val) {
      for (const _cnv of _cni.split(" ")) {
        if (!_cnv) continue;
        if (_res) _res += " ";
        _res += _key + _cnv;
      }
    }
  } else {
    if (_key) _res += _key;

    for (const _cni of _val) {
      for (const _cnv of _cni.split(" ")) {
        if (!_cnv) continue;
        if (_res) _res += " ";
        _res += _cnv;
      }
    }
  }

  return _res;
}

function _cn_obj(_ent: string[] | cobj): string {
  let _res = "";

  if (Array.isArray(_ent)) {
    _res += _cn_arr("", _ent);
  } else {
    for (const _key in _ent) {
      const _val = _ent[_key];

      switch (typeof _val) {
        case "string":
          if (_res) _res += " ";
          _res += _cn_str(_cn_cln(_key), _val.split(" "));
          break;

        case "object":
          if (_res) _res += " ";
          _res += _cn_arr(_cn_cln(_key), _val);
          break;

        default:
          if (!_val) break;
          if (_res) _res += " ";
          _res += _cn_cln(_key);
          break;
      }
    }
  }

  return _res;
}

function _cn_mix(_arg: argv): string {
  if (typeof _arg === "object") {
    return _cn_obj(_arg);
  } else {
    return _cn_cln(_arg);
  }
}

function twcnc(...args: argv[]): string {
  let _res = "";

  for (const _arg of args) {
    if (_res) _res += " ";
    _res += _cn_mix(_arg);
  }

  return _res;
}

export default twcnc;
