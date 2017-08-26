import * as program from "commander";
import * as detectCsv from "detect-csv";
import * as fs from "fs";

program
  .version("1.0.0");

program
  .option("-i, --input", "Input SAPS .csv file")
  .action((inputFilename: string) => {
    fs.readFile(inputFilename, (error, fileContent) => {
      if (error) {
        console.error(error);
        process.exit(1);
      } else {
        const csvProps = detectCsv(fileContent);
        if (csvProps === null) {
          console.error("Input SAPS file is not a .csv file.");
        } else {
          console.error("Prepare to extract data.");
        }
      }
    });
  });

program.parse(process.argv);
