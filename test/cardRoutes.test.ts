import request from "supertest";
import app from "../src/app";

describe("POST /api/cards/tokenize", () => {
  it("should tokenize a card and return a token", async () => {
    const res = await request(app).post("/api/cards/tokenize").send({
      cardNumber: "4111111111111111",
      cvv: "123",
      expirationMonth: "12",
      expirationYear: "2025",
      cardholderName: "John Doe",
      email: "johndoe@gmail.com",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

describe("GET /api/cards/card/:token", () => {
  it("should retrieve card data for a given token", async () => {
    const tokenResponse = await request(app).post("/api/cards/tokenize").send({
      cardNumber: "4111111111111111",
      cvv: "123",
      expirationMonth: "12",
      expirationYear: "2025",
      cardholderName: "John Doe",
      email: "johndoe@gmail.com",
    });

    const token = tokenResponse.body.token;
    expect(token).toBeDefined();

    const res = await request(app).get(`/api/cards/card/${token}`);
    expect(res.statusCode).toBe(200);
  });
});
