import sqlite3 from 'sqlite3';
import path from 'path';

export class Database {
  private db: sqlite3.Database;

  constructor() {
    const dbPath = path.join(__dirname, '../../shipment.db');
    this.db = new sqlite3.Database(dbPath);
    this.initializeTables();
  }

  private initializeTables(): void {
    this.db.serialize(() => {
      // Users table
      this.db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          phone TEXT,
          address TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Shipments table
      this.db.run(`
        CREATE TABLE IF NOT EXISTS shipments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          trackingNumber TEXT UNIQUE NOT NULL,
          userId INTEGER NOT NULL,
          senderName TEXT NOT NULL,
          senderAddress TEXT NOT NULL,
          senderPhone TEXT,
          receiverName TEXT NOT NULL,
          receiverAddress TEXT NOT NULL,
          receiverPhone TEXT,
          packageSize TEXT NOT NULL,
          weight REAL,
          description TEXT,
          status TEXT DEFAULT 'pending',
          estimatedDelivery DATETIME,
          actualDelivery DATETIME,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users (id)
        )
      `);

      // Tracking events table
      this.db.run(`
        CREATE TABLE IF NOT EXISTS tracking_events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          shipmentId INTEGER NOT NULL,
          status TEXT NOT NULL,
          location TEXT,
          description TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (shipmentId) REFERENCES shipments (id)
        )
      `);
    });
  }

  getDatabase(): sqlite3.Database {
    return this.db;
  }

  close(): void {
    this.db.close();
  }
}

export const database = new Database();
