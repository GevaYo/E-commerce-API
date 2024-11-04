import DatabaseService from "../db/DatabaseService";
import RapydClient from "./RapydClient";

// Abstract class for Rapyd services to extend from
export abstract class RapydBaseService {
  protected readonly db: typeof DatabaseService;
  protected readonly rapydClient: RapydClient;

  protected constructor(db: typeof DatabaseService, rapydClient: RapydClient) {
    this.db = db;
    this.rapydClient = rapydClient;
  }
}
