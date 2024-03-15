import { config } from "../src/config/config";
import { Core } from "@brizy/core-server";
import dotenv from "dotenv";

dotenv.config();

const __CORE__ = new Core(config);

const start = () => {
  try {
    __CORE__.start("5050");
  } catch (e) {
    console.error(e);
  }
};

start();
