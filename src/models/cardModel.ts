import { RowDataPacket } from "mysql2";
import crypto from "crypto";
import db from "../services/dbService";
import { encrypt, decrypt } from "../utils/encryption";

export const tokenizeCard = async (cardData: {
  cardNumber: string;
  cvv: string;
  expirationMonth: string;
  expirationYear: string;
  cardholderName: string;
  email: string;
}) => {
  const encryptedCardNumber = encrypt(cardData.cardNumber);
  const encryptedCvv = encrypt(cardData.cvv);

  const token = crypto
    .createHash("sha256")
    .update(cardData.cardNumber + new Date().toISOString())
    .digest("hex");

  const query =
    "INSERT INTO card_tokens (card_number, cvv, expiration_month, expiration_year, cardholder_name, email, token, iv) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  await db.query(query, [
    encryptedCardNumber.encryptedData,
    encryptedCvv.encryptedData,
    cardData.expirationMonth,
    cardData.expirationYear,
    cardData.cardholderName,
    cardData.email,
    token,
    encryptedCardNumber.iv,
  ]);

  return token;
};

export const getCardData = async (token: string) => {
    const query = "SELECT card_number, cvv, expiration_month, expiration_year, cardholder_name, email, iv FROM card_tokens WHERE token = ?";
    const [result] = await db.query(query, [token]);
  
    if (Array.isArray(result) && result.length === 0) {
      throw new Error("Tarjeta no encontrada.");
    }
  
    const rows = result as RowDataPacket[];
    const row = rows[0];
  
    const decryptedCardNumber = decrypt({
      iv: row.iv,
      encryptedData: row.card_number
    });
  
    // Comentado por si se necesita desencriptar el CVV
    // const decryptedCvv = decrypt({
    //   iv: row.iv,
    //   encryptedData: row.cvv
    // });
  
    return {
      cardNumber: decryptedCardNumber,
      // cvv: decryptedCvv, // Descomentar si desencripto el CVV
      expirationMonth: row.expiration_month,
      expirationYear: row.expiration_year,
      cardholderName: row.cardholder_name,
      email: row.email
    };
  };
  
