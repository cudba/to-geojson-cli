#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const toGeoJson = require("@tmcw/togeojson");
const DOMParser = require("xmldom").DOMParser;
const parseArgs = require("minimist");

const args = parseArgs(process.argv.slice(2));

let inputType = "gpx";
let inputDirectory = process.cwd();
let outputDirectory = process.cwd();

if ("i" in args) {
  const customInputType = args["i"];
  if (customInputType !== "gpx" && customInputType !== "kml") {
    console.error(`Invalid format provided ${customInputType}`);
    process.exit(1);
  }
  inputType = customInputType;
}

if ("d" in args) {
  inputDirectory = args["d"];
}

if ("o" in args) {
  outputDirectory = args["o"];
}

const files = fs.readdirSync(inputDirectory);
for (let file of files) {
  const filename = path.join(inputDirectory, file);
  const stat = fs.lstatSync(filename);
  if (!stat.isDirectory() && filename.indexOf(inputType) > 0) {
    const input = new DOMParser().parseFromString(
      fs.readFileSync(filename, "utf8")
    );

    const converted = toGeoJson[inputType](input);
    fs.writeFileSync(
      path.join(
        outputDirectory,
        `${file.substring(0, file.indexOf(inputType))}json`
      ),
      JSON.stringify(converted)
    );
  }
}

process.exit(0);
