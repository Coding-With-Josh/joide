import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  cover: text("cover").notNull(),
  date: varchar("date", { length: 64 }).notNull(),
  readTime: varchar("read_time", { length: 32 }).notNull(),
  tags: jsonb("tags")
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const caseStudies = pgTable("case_studies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  cover: text("cover").notNull(),
  href: text("href").default("#"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  org: text("org").notNull(),
  year: varchar("year", { length: 16 }).notNull(),
  highlight: text("highlight").notNull(),
  detail: text("detail").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  src: text("src").notNull(),
  alt: text("alt").notNull(),
  priority: integer("priority").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  school: text("school").notNull(),
  description: text("description").notNull(),
  expectedGraduation: varchar("expected_graduation", { length: 32 }).notNull(),
  location: text("location").notNull(),
  current: boolean("current").default(true),
});

export const repos = pgTable("repos", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  tech: jsonb("tech")
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  link: text("link").notNull(),
  stars: varchar("stars", { length: 16 }),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  org: text("org").notNull(),
  period: varchar("period", { length: 64 }).notNull(),
  summary: text("summary").notNull(),
  tags: jsonb("tags")
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
});

export const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  eventType: varchar("event_type", { length: 64 }).notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").defaultNow(),
});
