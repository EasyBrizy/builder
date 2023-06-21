import { Asset } from "../../types";

export const sortAsset = (a: Asset, b: Asset): number => a.score - b.score;
