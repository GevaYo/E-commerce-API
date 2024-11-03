import { RapydClient } from "../rapyd/RapydClient";
import DatabaseService from "../db/DatabaseService";

export default class PaymentService {
  private rapydClient: RapydClient;
  private databaseService: typeof DatabaseService;

  constructor(
    rapydClient: RapydClient,
    databaseService: typeof DatabaseService
  ) {
    this.rapydClient = rapydClient;
    this.databaseService = databaseService;
  }
}
