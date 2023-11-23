import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = process.env.ENCRYPTION_KEY || "default_encryption_key";

if (!process.env.ENCRYPTION_KEY) {
  console.warn(
    "Advertencia: ENCRYPTION_KEY no está definida. Usando clave predeterminada."
  );
}

const iv = crypto.randomBytes(16);

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
};

export const decrypt = (encryptedData: {
  iv: string;
  encryptedData: string;
}) => {
  const iv = Buffer.from(encryptedData.iv, "hex");
  const encryptedText = Buffer.from(encryptedData.encryptedData, "hex");
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
