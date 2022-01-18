const path = require("path");
const solc = require("solc");
const fs = require("fs");

const myCoinPath = path.join(__dirname, "../my-coin.sol");
const token = fs.readFileSync(myCoinPath, "utf-8");

const safeMathPath = path.join(__dirname, "../safe-math.sol");
const safeMath = fs.readFileSync(safeMathPath, "utf-8");

const input = {
  language: "Solidity",
  sources: {
    "safe-math.sol": {
      content: safeMath,
    },
    "my-coin.sol": {
      content: token,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);

module.exports = {
  abi: output.contracts["my-coin.sol"].ERC20Basic.abi,
  bytecode: output.contracts["my-coin.sol"].ERC20Basic.evm.bytecode.object,
};
