//#region ClientItem

export interface ClientItem {
  item?: string;
}

//#endregion

//#region Auth

export interface User {
  id: string;
  token: string;
}

type UserData = Record<string, unknown>;

export type ResetPass = UserData;

export type SignIn = UserData;

export type SignUp = UserData;

//#endregion
