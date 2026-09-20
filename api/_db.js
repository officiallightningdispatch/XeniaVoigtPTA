import { neon } from '@neondatabase/serverless';

export function db(){
  if(!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured');
  return neon(process.env.DATABASE_URL);
}

export async function ensureSchema(sql){
  await sql`CREATE TABLE IF NOT EXISTS pta_volunteers (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'new',
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    event TEXT,
    payload JSONB NOT NULL
  )`;
  await sql`CREATE TABLE IF NOT EXISTS pta_vendors (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'new',
    business_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    payload JSONB NOT NULL,
    confirmed_at TIMESTAMPTZ,
    confirmed_by TEXT,
    confirmation_email_sent_at TIMESTAMPTZ
  )`;
  await sql`ALTER TABLE pta_vendors ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMPTZ`;
  await sql`ALTER TABLE pta_vendors ADD COLUMN IF NOT EXISTS confirmed_by TEXT`;
  await sql`ALTER TABLE pta_vendors ADD COLUMN IF NOT EXISTS confirmation_email_sent_at TIMESTAMPTZ`;
  await sql`CREATE TABLE IF NOT EXISTS pta_newsletter (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    email TEXT NOT NULL UNIQUE,
    source TEXT
  )`;
  await sql`CREATE TABLE IF NOT EXISTS pta_trunk_hosts (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'new',
    host_name TEXT NOT NULL,
    host_type TEXT NOT NULL,
    grade_org TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    theme TEXT,
    vehicle_type TEXT,
    payload JSONB NOT NULL
  )`;
  await sql`CREATE TABLE IF NOT EXISTS pta_board_users (
    username TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    must_change_password BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS pta_board_sessions (
    token_hash TEXT PRIMARY KEY,
    username TEXT NOT NULL REFERENCES pta_board_users(username) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
  )`;
  await sql`CREATE INDEX IF NOT EXISTS pta_board_sessions_username_idx ON pta_board_sessions(username)`;
  await sql`CREATE INDEX IF NOT EXISTS pta_board_sessions_expires_idx ON pta_board_sessions(expires_at)`;
}

export function cleanText(v,max=500){
  if(v===undefined||v===null)return '';
  return String(v).trim().slice(0,max);
}

export function jsonBody(req){
  if(!req.body) return {};
  return typeof req.body==='string'?JSON.parse(req.body):req.body;
}

export function send(res,status,data){
  res.status(status).setHeader('Content-Type','application/json');
  res.end(JSON.stringify(data));
}
