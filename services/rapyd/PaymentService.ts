import { RapydClient } from "../rapyd/RapydClient";
import { RapydBaseService } from "./BaseService";
import DatabaseService from "../db/DatabaseService";
export default class PaymentService extends RapydBaseService {
  constructor(db: typeof DatabaseService, rapydClient: RapydClient) {
    super(db, rapydClient);
  }
}
