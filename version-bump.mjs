import { readFileSync, writeFileSync } from "fs";

const targetVersion = process.env.npm_package_version;

const stringify = (obj) => JSON.stringify(obj, null, "\t") + "\n";

// read minAppVersion from manifest.json and bump version to target version
let manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion } = manifest;
manifest.version = targetVersion;
writeFileSync("manifest.json", stringify(manifest));

// update versions.json with target version and minAppVersion from manifest.json
let versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", stringify(versions));
