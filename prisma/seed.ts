import { prisma } from '@/lib/prisma'


async function main() {
  console.log('🌱 Start seeding...')

  await prisma.ipm.deleteMany()
  await prisma.alat.deleteMany()

  const alat = await prisma.alat.create({
    data: {
      nama: 'Infusion Pump',
      merek: 'B Braun',
      tipe: 'IP-1000',
      noSeri: 'SN12345',
      ruangan: 'ICU',
      tahun: '2024',
      kalibrasi: '2025-01-01',
      keterangan: 'Good condition',
      ipm: {
        create: {
          hasil: 'Normal',
          teknisi: 'Komang',
          setting: 'Default',
          terukur: 'Stable',
        },
      },
    },
  })

  console.log('Created Alat with IPM:', alat.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })