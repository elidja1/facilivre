const { PrismaClient } = require('@prisma/client');

const passwords = [
  'spbk pmen isps afbu',
  'spbk%20pmen%20isps%20afbu',
  'adedokunalabi1',
];

const regions = [
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'us-west-2',
  'af-south-1',
  'ap-southeast-1',
  'ap-south-1',
  'sa-east-1',
];

async function check() {
  console.log('Testing direct and pooler combinations...');

  // 1. Test direct host
  for (const pw of passwords) {
    const directUrl = `postgresql://postgres:${encodeURIComponent(pw)}@db.hdsgirzomgxmbzztcevj.supabase.co:5432/postgres`;
    const p = new PrismaClient({ datasources: { db: { url: directUrl } } });
    try {
      const res = await p.$queryRawUnsafe('SELECT version()');
      console.log('✅ DIRECT CONNECTION WORKED!');
      console.log('URL:', directUrl);
      console.log('Result:', res);
      await p.$disconnect();
      return directUrl;
    } catch (e) {
      // console.log('Direct failed:', e.message.slice(0, 60));
    } finally {
      await p.$disconnect().catch(() => {});
    }
  }

  // 2. Test poolers
  for (const r of regions) {
    for (const pw of passwords) {
      for (const port of [6543, 5432]) {
        const poolerUrl = `postgresql://postgres.hdsgirzomgxmbzztcevj:${encodeURIComponent(pw)}@aws-0-${r}.pooler.supabase.com:${port}/postgres${port === 6543 ? '?pgbouncer=true' : ''}`;
        const p = new PrismaClient({ datasources: { db: { url: poolerUrl } } });
        try {
          const res = await p.$queryRawUnsafe('SELECT version()');
          console.log(`\n🎉 SUCCESS! Connected to pooler region: ${r} on port ${port}!`);
          console.log('WORKING DATABASE_URL:');
          console.log(poolerUrl);
          console.log('Result:', res);
          await p.$disconnect();
          return poolerUrl;
        } catch (e) {
          // continue
        } finally {
          await p.$disconnect().catch(() => {});
        }
      }
    }
  }

  console.log('❌ None succeeded. Let us diagnose.');
}

check();
