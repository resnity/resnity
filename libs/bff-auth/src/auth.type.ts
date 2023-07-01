export type GetLogoutDataPayload = {
  returnTo: string;
  encryptedIDToken?: string;
};

export type GetTokenDataPayload = {
  callbackCode: string;
  callbackState: string;
  encryptedLoginSession?: string;
  encryptedCSRFToken?: string;
};
