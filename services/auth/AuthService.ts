import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../config";

class AuthService {
  private secretKey: string;

  constructor() {
    this.secretKey = config.JWT_SECRET as string;
  }

  public async generateToken(payload: any) {
    if (!this.secretKey) {
      throw new Error("JWT secret key is not configured");
    }
    return jwt.sign(payload, this.secretKey, { expiresIn: "1h" });
  }

  public async verifyToken(token: string) {
    return jwt.verify(token, this.secretKey);
  }

  public async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  public async comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}

export default AuthService;
