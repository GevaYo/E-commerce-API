import axios, { AxiosInstance, Method } from "axios";
import crypto from "crypto";

export class RapydClient {
  private client: AxiosInstance;
  private accessKey: string;
  private secretKey: string;

  constructor() {
    this.accessKey = process.env.RAPYD_ACCESS_KEY!;
    this.secretKey = process.env.RAPYD_SECRET_KEY!;

    this.client = axios.create({
      baseURL: process.env.RAPYD_API_URL || "https://sandboxapi.rapyd.net",
      timeout: 10000,
    });
  }

  private generateSignature(
    method: Method,
    path: string,
    salt: string,
    timestamp: number,
    body?: any
  ): string {
    const toSign =
      method +
      path +
      salt +
      timestamp +
      this.accessKey +
      this.secretKey +
      (body ? JSON.stringify(body) : "");
    return crypto
      .createHmac("sha256", this.secretKey)
      .update(toSign)
      .digest("hex");
  }

  public async makeRequest(method: Method, path: string, body?: any) {
    const salt = crypto.randomBytes(12).toString("hex");
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = this.generateSignature(
      method,
      path,
      salt,
      timestamp,
      body
    );

    try {
      const response = await this.client.request({
        method,
        url: path,
        data: body,
        headers: {
          access_key: this.accessKey,
          signature: signature,
          salt: salt,
          timestamp: timestamp,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Rapyd API Error: ${error.response?.data?.message || error.message}`
      );
    }
  }
}

export default RapydClient;