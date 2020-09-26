import Eval from "../index.js";

const ev = new Eval();

ev.eval("node", "console.log('hello world')").then(console.log);