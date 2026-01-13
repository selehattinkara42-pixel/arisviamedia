import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient | null }

// Veritabanı artık aktif!
const ENABLE_DATABASE = true

// Check if DATABASE_URL is set AND database is enabled
const isDatabaseConfigured = ENABLE_DATABASE && !!process.env.DATABASE_URL

export const prisma: PrismaClient | null = isDatabaseConfigured
    ? (globalForPrisma.prisma || new PrismaClient({ log: ['query'] }))
    : null

if (process.env.NODE_ENV !== 'production' && prisma) {
    globalForPrisma.prisma = prisma
}

// Helper to check if database is available
export const isDatabaseAvailable = () => isDatabaseConfigured && prisma !== null
