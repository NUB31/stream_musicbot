import defaultSettings from "../bundledAssets/settings.json";
import download from "download";
import fallbackPlaylist from "../bundledAssets/assets/fallbackPlaylist.json";
import fs from "fs-extra";
import requestPlaylist from "../bundledAssets/assets/requestPlaylist.json";

type SetupOptions = {
  resetList: {
    settings?: boolean;
    requestPlaylist?: boolean;
    fallbackPlaylist?: boolean;
  };
};

export default async function setup(options: Partial<SetupOptions> = {}) {
  try {
    // Make assets folder if it does not already exists
    if (!(await fs.pathExists("assets"))) {
      await fs.mkdir("assets");
    }
    if (!(await fs.pathExists("assets/music"))) {
      await fs.mkdir("assets/music");
    }

    if (options?.resetList?.settings || !(await fs.pathExists("settings.json")))
      await resetSettings();
    if (
      options?.resetList?.fallbackPlaylist ||
      !(await fs.pathExists("assets/fallbackPlaylist.json"))
    )
      await resetFallbackPlaylist();
    if (
      options?.resetList?.requestPlaylist ||
      !(await fs.pathExists("assets/requestPlaylist.json"))
    )
      await resetRequestPlaylist();
    if (
      options?.resetList?.requestPlaylist ||
      !(await fs.pathExists("assets/ffplay.exe"))
    )
      await resetFFPlay();
    if (
      options?.resetList?.requestPlaylist ||
      !(await fs.pathExists("assets/win32-x64_lib.node"))
    )
      await resetFFPlayDependency();
  } catch (err) {
    console.error("Something went wrong installing the application. ERROR:");
    throw err;
  }
}

export async function resetSettings() {
  try {
    console.log("Resetting settings");
    await fs.remove("settings.json");
    await fs.writeFile(
      "settings.json",
      JSON.stringify(defaultSettings, null, 2)
    );
  } catch (err) {
    console.error("Something went wrong resetting the settings. ERROR:");
    throw err;
  }
}

export async function resetRequestPlaylist() {
  try {
    console.log("Resetting request playlist");
    await fs.remove("assets/requestPlaylist.json");
    await fs.writeFile(
      "assets/requestPlaylist.json",
      JSON.stringify(requestPlaylist, null, 2)
    );
  } catch (err) {
    console.error("Something went wrong resetting the playlist. ERROR:");
    throw err;
  }
}

export async function resetFallbackPlaylist() {
  try {
    console.log("Resetting fallback playlist");
    await fs.remove("assets/fallbackPlaylist.json");
    await fs.writeFile(
      "assets/fallbackPlaylist.json",
      JSON.stringify(fallbackPlaylist, null, 2)
    );
  } catch (err) {
    console.error("Something went wrong resetting the playlist. ERROR:");
    throw err;
  }
}

export async function resetFFPlay() {
  try {
    console.log("Downloading ffplay");
    await fs.remove("assets/ffplay.exe");
    await download(
      "https://github.com/NUB31/twitch_musicbot/releases/download/asset/ffplay.exe",
      "assets"
    );
  } catch (err) {
    console.error("Something went wrong downloading ffplay. ERROR:");
    throw err;
  }
}

export async function resetFFPlayDependency() {
  try {
    console.log("Downloading win32-x64_lib.node");
    await fs.remove("win32-x64_lib.node");
    await download(
      "https://github.com/NUB31/twitch_musicbot/releases/download/asset/win32-x64_lib.node",
      "./"
    );
  } catch (err) {
    console.error("Something went wrong downloading ffplay. ERROR:");
    throw err;
  }
}

export async function resetServer() {
  try {
    console.log("Downloading main server file");
    await fs.remove("server.exe");
    await download(
      "https://github.com/NUB31/twitch_musicbot/releases/download/v0.1.0/server.exe",
      "./"
    );
  } catch (err) {
    console.error("Something went wrong the server file. ERROR:");
    throw err;
  }
}
