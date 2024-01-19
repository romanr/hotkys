import fs from "fs";
import path from "path";
import { ShortcutsParser } from "@/app/lib/load/input-parser";
import Validator from "@/app/lib/load/validator";
import { ShortcutsProvider } from "@/app/lib/load/shortcuts-provider";
import { AllApps } from "@/app/lib/model/input/input-models";

const shortcutsDirectory = path.join(process.cwd(), "public/data");

export function getAllShortcuts() {
  const keyCodes = JSON.parse(fs.readFileSync(path.join(shortcutsDirectory, "key-codes.json"), "utf-8")) as {
    keyCodes: [string, string][]
  };
  const combinedAppsContents = JSON.parse(fs.readFileSync(path.join(shortcutsDirectory, "combined-apps.json"), "utf8")) as AllApps;

  return new ShortcutsProvider(combinedAppsContents,
    new ShortcutsParser(),
    new Validator(new Map(keyCodes.keyCodes))).getShortcuts();
}
