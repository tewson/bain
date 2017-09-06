"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var detectCsv = require("detect-csv");
var fs = require("fs");
program
    .version("1.0.0");
program
    .option("-i, --input", "Input SAPS .csv file")
    .option("-o, --output", "Output .csv file");
program
    .action(function (inputFilename, outputFilename) {
    fs.readFile(inputFilename, function (readError, fileContent) {
        if (readError) {
            console.error(readError);
            process.exit(1);
        }
        var csvProps = detectCsv(fileContent);
        if (csvProps === null) {
            console.error("Input SAPS file is not a .csv file.");
            process.exit(1);
        }
        fs.writeFile(outputFilename, fileContent, function (writeError) {
            if (writeError) {
                console.error(writeError);
                process.exit(1);
            }
        });
    });
});
program.parse(process.argv);
