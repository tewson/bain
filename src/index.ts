import * as program from "commander";
import * as detectCsv from "detect-csv";
import * as fs from "fs";

program
  .version("1.0.0");

program
  .option("-i, --input", "Input SAPS .csv file")
  .option("-o, --output", "Output .csv file");

program
  .action((inputFilename: string, outputFilename: string) => {
    fs.readFile(inputFilename, (readError, fileContent) => {
      if (readError) {
        console.error(readError);
        process.exit(1);
      }

      const csvProps = detectCsv(fileContent);
      if (csvProps === null) {
        console.error("Input SAPS file is not a .csv file.");
        process.exit(1);
      }

      fs.writeFile(outputFilename, fileContent, (writeError) => {
        if (writeError) {
          console.error(writeError);
          process.exit(1);
        }
      });
    });
  });

program.parse(process.argv);
