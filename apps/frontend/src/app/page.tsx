import Link from 'next/link';
import { FileSpreadsheet, Users, Shield, BarChart3 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Orden Interno
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sistema de gestión y cumplimiento regulatorio para cooperativas de ahorro y crédito en Colombia
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<FileSpreadsheet className="w-12 h-12 text-blue-600" />}
            title="SICSES Compliance"
            description="Generación automática de reportes obligatorios para la Supersolidaria"
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-green-600" />}
            title="Gestión de Asociados"
            description="Base de datos centralizada de asociados y gobernanza"
          />
          <FeatureCard
            icon={<Shield className="w-12 h-12 text-purple-600" />}
            title="Seguridad y Auditoría"
            description="Control de acceso basado en roles y trazabilidad completa"
          />
          <FeatureCard
            icon={<BarChart3 className="w-12 h-12 text-orange-600" />}
            title="Business Intelligence"
            description="Dashboards y reportes en tiempo real para la toma de decisiones"
          />
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-lg mb-8 opacity-90">
            Simplifica el cumplimiento regulatorio y la gestión de tu cooperativa
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/demo"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Ver Demo
            </Link>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <InfoCard
            title="Formatos Soportados"
            items={[
              'F9998 - Identificación',
              'F3 - Catálogo Único de Cuentas',
              'F9999 - Base Social',
              'F130 - Información Estadística',
              'F8888 - Órganos de Dirección',
              'F9013 - Informe de Aportes',
            ]}
          />
          <InfoCard
            title="Beneficios Clave"
            items={[
              'Reduce errores humanos en un 95%',
              'Ahorra hasta 80% del tiempo en reportes',
              'Cumplimiento regulatorio garantizado',
              'Multi-tenancy para múltiples cooperativas',
              'Integración con sistemas contables',
              'Auditoría completa de operaciones',
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-600 mr-3">✓</span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
