import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import modules (to be created)
// import { AuthModule } from './auth/auth.module';
// import { TenantsModule } from './tenants/tenants.module';
// import { UsersModule } from './users/users.module';
// import { AssociatesModule } from './associates/associates.module';
// import { GovernanceModule } from './governance/governance.module';
// import { FinancialModule } from './financial/financial.module';
// import { SicsesModule } from './sicses/sicses.module';
// import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),

    // Feature modules (uncomment as they are created)
    // PrismaModule,
    // AuthModule,
    // TenantsModule,
    // UsersModule,
    // AssociatesModule,
    // GovernanceModule,
    // FinancialModule,
    // SicsesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
