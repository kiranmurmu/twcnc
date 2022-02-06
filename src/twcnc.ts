type cobj = {
  [key: string]: string | boolean | string[];
};
type argv = string | string[] | cobj;

function _cn_cln(_val: string): string {
  let _res = "";

  if (_val) {
    for (const _cnv of _val.split(" ")) {
      if (!_cnv) continue;
      if (_res) _res += " ";
      _res += _cnv;
    }
  }

  return _res;
}

function _cn_str(_key: string, _val: string): string {
  let _res = "";
  let _tmp = "";

  if (_key && !_key.includes(" ") && _key.endsWith(":")) {
    if (_val) {
      for (const _cnv of _val.split(" ")) {
        if (!_cnv) continue;
        if (_res) _res += " ";
        _res += _key + _cnv;
      }
    }
  } else {
    if (_val) {
      for (const _cnv of _val.split(" ")) {
        if (!_cnv) continue;
        if (_tmp) _tmp += " ";
        _tmp += _cnv;
      }
    }

    if (_tmp) {
      if (_key) _res += _key;
      if (_res) _res += " ";
      _res += _tmp;
    }
  }

  return _res;
}

function _cn_arr(_key: string, _val: string[]): string {
  let _res = "";
  let _tmp = "";

  if (_key && !_key.includes(" ") && _key.endsWith(":")) {
    if (_val) {
      for (const _cni of _val) {
        if (!_cni) continue;

        for (const _cnv of _cni.split(" ")) {
          if (!_cnv) continue;
          if (_res) _res += " ";
          _res += _key + _cnv;
        }
      }
    }
  } else {
    if (_val) {
      for (const _cni of _val) {
        if (!_cni) continue;

        for (const _cnv of _cni.split(" ")) {
          if (!_cnv) continue;
          if (_tmp) _tmp += " ";
          _tmp += _cnv;
        }
      }
    }

    if (_tmp) {
      if (_key) _res += _key;
      if (_res) _res += " ";
      _res += _tmp;
    }
  }

  return _res;
}

function _cn_bol(_key: string, _val: boolean) {
  let _res = "";

  if (_key && _val) {
    for (const _cnv of _key.split(" ")) {
      if (!_cnv) continue;
      if (_res) _res += " ";
      _res += _cnv;
    }
  }

  return _res;
}

function _cn_obj(_ent: string[] | cobj): string {
  let _res = "";
  let _tmp = "";

  if (Array.isArray(_ent)) {
    _res += _cn_arr("", _ent);
  } else {
    for (const _key in _ent) {
      const _val = _ent[_key];

      switch (typeof _val) {
        case "string":
          _tmp = _cn_str(_cn_cln(_key), _val);
          if (!_tmp) break;
          if (_res) _res += " ";
          _res += _tmp;
          break;

        case "object":
          _tmp = _cn_arr(_cn_cln(_key), _val);
          if (!_tmp) break;
          if (_res) _res += " ";
          _res += _tmp;
          break;

        default:
          _tmp = _cn_bol(_key, _val);
          if (!_tmp) break;
          if (_res) _res += " ";
          _res += _tmp;
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
