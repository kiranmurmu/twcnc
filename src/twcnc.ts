type twcArg = Array<string | Array<string>>;

function twcnc(...twcArg: twcArg): string {
  const _res: Array<string> = [];
  twcArg.forEach((_arg) => {
    if (typeof _arg === "string") _res.push(_arg);
  });
  return _res.join(" ").trim();
}

export default twcnc;
