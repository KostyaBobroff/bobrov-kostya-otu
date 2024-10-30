import * as readline from "node:readline";
import * as fs from "node:fs";
import * as process from "node:process";

async function run(input, output) {
  const readable = fs.createReadStream(input, {
    highWaterMark: 8,
    encoding: "utf-8",
  });
  const rl = readline.createInterface({
    input: readable,
    crlfDelay: Infinity,
  });
  const writableStream = fs.createWriteStream(output);
  let wordCountMap = {};
  for await (let line of rl) {
    const words = line
      .split(" ")
      .map((val) => val.replace(/[^a-zA-Zа-яА-Я]/g, ""))
      .filter(Boolean);

    wordCountMap = words.reduce((accum, word) => {
      if (accum[word]) {
        accum[word]++;
      } else {
        accum[word] = 1;
      }

      return accum;
    }, wordCountMap);
  }
  const sortedArray = Object.keys(wordCountMap)
    .sort()
    .map((key) => wordCountMap[key]);
  console.log(wordCountMap, Object.keys(wordCountMap).sort(), sortedArray);
  writableStream.write(JSON.stringify(sortedArray));
}

const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3] || "output.txt";

if (inputFilePath) {
  run(inputFilePath, outputFilePath).catch(console.error);
} else {
  throw new Error("Передайте входной файл");
}
