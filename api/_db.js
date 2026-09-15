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
    payload JSONB NOT NULL
  )`;
  await sql`CREATE TABLE IF NOT EXISTS pta_newsletter (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    email TEXT NOT NULL UNIQUE,
    source TEXT
  )`;
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
