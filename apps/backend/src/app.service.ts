import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot() {
    return {
      name: 'Orden Interno API',
      version: '0.1.0',
      description: 'Cooperative Management & SICSES Compliance Platform',
      documentation: '/api/docs',
      health: '/api/health',
    };
  }

  getHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
