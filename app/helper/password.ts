const crypto = require("crypto");

export const generatePassword = async () => {
  const length = 20;
  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$";

  const authGeneratePass = Array.from(
    crypto.randomFillSync(new Uint32Array(length)) as Uint32Array
  )
    .map((x: number) => characters[x % characters.length])
    .join("");
  return authGeneratePass;
};
