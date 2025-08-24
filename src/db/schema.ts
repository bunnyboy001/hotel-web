import {
  pgTable,
  serial,
  text,
  integer,
  date,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  roomType: varchar("room_type", { length: 100 }).notNull(),
  guests: integer("guests").notNull(),
  checkIn: date("check_in").notNull(),
  checkOut: date("check_out").notNull(),
  status: varchar("status", { length: 50 }).default("Pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
