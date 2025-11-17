import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

// Import modules (to be created)
// import { TenantsModule } from './tenants/tenants.module';
// import { UsersModule } from './users/users.module';
// import { AssociatesModule } from './associates/associates.module';
// import { GovernanceModule } from './governance/governance.module';
// import { FinancialModule } from './financial/financial.module';
// import { SicsesModule } from './sicses/sicses.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Database
    PrismaModule,

    // Authentication
    AuthModule,

    // Feature modules (uncomment as they are created)
    // TenantsModule,
    // UsersModule,
    // AssociatesModule,
    // GovernanceModule,
    // FinancialModule,
    // SicsesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Apply JWT guard globally to all routes (can be overridden with @Public())
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
