"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var detectCsv = require("detect-csv");
var fs = require("fs");
program
    .version("1.0.0");
program
    .option("-i, --input", "Input SAPS .csv file")
    .action(function (inputFilename) {
    fs.readFile(inputFilename, function (error, fileContent) {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        else {
            var csvProps = detectCsv(fileContent);
            if (csvProps === null) {
                console.error("Input SAPS file is not a .csv file.");
            }
            else {
                console.error("Prepare to extract data.");
            }
        }
    });
});
program.parse(process.argv);
