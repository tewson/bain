#!/usr/bin/env node

import * as program from "commander";
import {
  readFile,
  writeFile
} from "fs";
import { promisify } from "util";

interface IFeature {
  properties: {
    COUNTYNAME: string;
  };
}

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

async function extract(boundaryFilePath: string, countyName: string, outputFilePath?: string) {

  try {

    if (!boundaryFilePath) {

      throw "A Small Area boundary file is required.";

    }

    if (!boundaryFilePath.endsWith(".geojson")) {

      throw `Specified Small Area boundary file "${boundaryFilePath}" must be in GeoJSON format.`;

    }

    if (!countyName) {

      throw "A county name is required.";

    }

    const boundaryFile = await readFileAsync(boundaryFilePath, "utf-8");
    const countyFeatures = JSON.parse(boundaryFile)
      .features
      .filter((feature: IFeature) => {

        return feature.properties.COUNTYNAME === countyName;

      });

    const countyGeoJsonString = JSON.stringify({
      type: "FeatureCollection",
      features: countyFeatures
    });

    if (outputFilePath) {

      return writeFileAsync(outputFilePath, JSON.stringify(countyGeoJsonString));

    } else {

      console.log(countyGeoJsonString);

    }

  } catch (error) {

    console.error(error.toString());
    process.exit(1);

  }

}

program
  .option("-b, --boundary-file <path>", "Input Small Area boundary file (.geojson)")
  .option("-C, --county-name <COUNTYNAME>", "OSi National Statistical Boundaries COUNTYNAME")
  .option("-o, --output <path>", "Output .geojson file")
  .parse(process.argv);

const boundaryFilePath = program.boundaryFile as string;
const countyName = program.countyName as string;
const outputFilePath = program.output as string;

extract(boundaryFilePath, countyName, outputFilePath);
