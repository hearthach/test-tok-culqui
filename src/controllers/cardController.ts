import { Request, Response } from 'express';
import { tokenizeCard, getCardData } from '../models/cardModel';
import validator from 'validator';
import luhn from 'luhn';

const validateEmailDomain = (email: string) => {
  const validDomains = process.env.VALID_EMAIL_DOMAINS?.split(',') || ['gmail.com', 'hotmail.com', 'yahoo.es'];
  return validDomains.some(domain => email.endsWith(domain));
};

export const tokenizeCardController = async (req: Request, res: Response) => {
  try {
    const { cardNumber, cvv, expirationMonth, expirationYear, email } = req.body;

    // 1-Validación del número de tarjeta con Luhn y longitud
    if (!luhn.validate(cardNumber) || cardNumber.length < 13 || cardNumber.length > 16) {
      return res.status(400).send('Número de tarjeta inválido.');
    }

    // 2-Validación de longitud del CVV
    if (cvv.length < 3 || cvv.length > 4) {
      return res.status(400).send('CVV inválido.');
    }

    // 3-Validación de fecha de expiración
    const currentYear = new Date().getFullYear();
    if (parseInt(expirationMonth, 10) < 1 || parseInt(expirationMonth, 10) > 12 ||
        parseInt(expirationYear, 10) < currentYear || parseInt(expirationYear, 10) > currentYear + 5) {
      return res.status(400).send('Fecha de expiración inválida.');
    }

    // 4-Validación de email
    if (!validateEmailDomain(email) || !validator.isEmail(email)) {
      return res.status(400).send('Email inválido.');
    }

    console.log("Datos recibidos en tokenize:", req.body);
    const token = await tokenizeCard(req.body);
    res.json({ token });
  } catch (error: any) {
    console.error("Error en tokenizeCardController:", error);
    res.status(500).send('Error al tokenizar la tarjeta: ' + error.message);
  }
};

export const getCardDataController = async (req: Request, res: Response) => {
  try {
    console.log("Token recibido:", req.params.token);
    const cardData = await getCardData(req.params.token);
    console.log("Datos de la tarjeta recuperados:", cardData);
    res.json(cardData);
  } catch (error: any) {
    console.error("Error en getCardDataController:", error);
    res.status(500).send('Error al obtener datos de la tarjeta: ' + error.message);
  }
};
