import { FlyerData, SystemModule, IndustryOption } from '../types';

export const initialFlyerData: FlyerData = {
  developerName: 'Tu Sitio Web Río Cuarto',
  role: 'Programadores Web & Desarrolladores de Software (Anahí Gilardi & Enzo Girardi)',
  hookTitle: '¿LENTITUD EN TU NEGOCIO? MULTIPLICÁ TUS VENTAS HOY',
  slogan: 'Diseñamos tu sitio web y programas a medida que automatizan tu gestión, eliminan errores y ordenan tus ventas',
  phone: '5493584860640',
  phoneFormatted: '+54 358 486-0640',
  email: 'anagilardi1234@gmail.com',
  location: 'Río Cuarto / Córdoba • Envíos e Instalación a todo el país',
  whatsappMessage: 'Hola Anahí y Enzo! Vi su web de Tu Sitio Web Río Cuarto y quisiera consultar por un proyecto para mi negocio.',
  mainServices: [
    'Diseño y Desarrollo de Páginas Web & Tiendas Online',
    'Sistemas de Gestión Gastronómica (Comandas, Mesas, Delivery)',
    'Facturación Electrónica ARCA (ex AFIP) Automática A / B / C',
    'Historias Clínicas Digitales & Turnos para Salud y Consultorios',
    'Control de Stock e Inventario para Indumentaria y Calzado',
    'Puntos de Venta (POS) y Facturación Rápida en Caja',
    'ERP SaaS Multirrubro (Ferreterías, Talleres, Inmobiliarias)',
    'Reportes de Ventas e Ingresos Diarios en Tiempo Real'
  ],
  keyBenefits: [
    '100% Personalizado a la medida de tu negocio',
    'CERO Comisiones por venta ni cuotas abusivas',
    'Diseño moderno, rápido y adaptado a celulares',
    'Atención y soporte directo con Anahí Gilardi & Enzo Girardi (Programadores)'
  ],
  promoBadge: '🔥 ¡DEMO GRATUITA Y ASESORAMIENTO SIN CARGO! 🔥',
  guaranteeText: 'Garantía total de satisfacción + Instalación y capacitación guiada',
  qrUrl: 'https://wa.me/5493584860640?text=Hola%20Anah%C3%AD%20y%20Enzo!%20Me%20interesa%20un%20sitio%20web%20o%20programa%20a%20medida.',
  callToAction: '¡ESCANEÁ EL QR O ESCRIBINOS AHORA MISMO Y ACCEDÉ A TU DEMO!'
};

export const portfolioModules: SystemModule[] = [
  {
    id: 'el-patron-resto',
    title: 'El Patrón - Gestión Gastronómica',
    rubro: 'gastronomia',
    subtitle: 'Casa de Comidas y Vinos / Resto Bar POS',
    description: 'Sistema completo para restaurantes y bares con distribución de mesas interactiva, comandas para mozos en turno, despacho en cocina, caja y menú digital.',
    badge: 'GASTRONOMÍA PREMIUM',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Mapa de mesas en tiempo real (Libre / Ocupada)',
      'Selección de Mozos en turno (Enzo, Micaela, Sofía)',
      'Filtro de categorías premium (Tragos, Carnes, Pastas, Pescados)',
      'Control de despacho en barra y cocina',
      'Facturación Electrónica ARCA (ex AFIP) y comanda automatizada'
    ],
    clientExample: 'restaurante-potro.vercel.app',
    colorScheme: 'from-amber-900 via-stone-800 to-amber-950',
    mockUI: {
      type: 'resto',
      metrics: [
        { label: 'Mesas Ocupadas', value: '3 / 12', color: 'text-amber-400' },
        { label: 'Comandas Activas', value: '8', color: 'text-emerald-400' },
        { label: 'Mozo Activo', value: 'Enzo Girardi', color: 'text-rose-400' }
      ],
      tables: [
        { id: 1, name: 'Mesa 1', status: 'libre' },
        { id: 2, name: 'Mesa 2', status: 'ocupada', waiter: 'Enzo' },
        { id: 3, name: 'Mesa 3', status: 'libre' },
        { id: 4, name: 'Mesa 4', status: 'libre' },
        { id: 5, name: 'Mesa 5', status: 'libre' },
        { id: 6, name: 'Mesa 6', status: 'ocupada', waiter: 'Micaela' },
        { id: 8, name: 'Mesa 8', status: 'libre' },
        { id: 12, name: 'Mesa 12', status: 'ocupada', waiter: 'Sofía' }
      ],
      items: [
        { id: '1', name: 'Aperol Spritz', category: 'Tragos', price: '$4.900', status: 'Disp: 218u', tag: 'Trago Autor' },
        { id: '2', name: 'Fernet Branca Estilo Patrón', category: 'Tragos', price: '$4.500', status: 'Disp: 424u', tag: 'Más vendido' },
        { id: '3', name: 'Gin Tonic Heráclito', category: 'Tragos', price: '$4.800', status: 'Disp: 225u', tag: 'Recomendado' },
        { id: '4', name: 'Whisky Macallan 12 Años', category: 'Destilados', price: '$7.500', status: 'Disp: 300u', tag: 'Premium' }
      ]
    }
  },
  {
    id: 'colores-pizzeria',
    title: 'Colores Pizzería - POS & Delivery',
    rubro: 'gastronomia',
    subtitle: 'Pizzería al Horno & Rotisería',
    description: 'Gestión ágil para pizzerías con pedidos Mitad y Mitad, Armado de Pizza personalizada, módulo de Delivery y Retiro en Local.',
    badge: 'PIZZERÍA & ROTISERÍA',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Módulo "Mitad y Mitad" y "Armá tu Pizza"',
      'Gestión de Pedidos Takeaway vs Delivery',
      'Filtro rápido por 63 gustos de pizzas y empanadas',
      'Despacho rápido a horno con avisos sonoros',
      'Integración con comandas de WhatsApp'
    ],
    clientExample: 'restaurante-colores.vercel.app',
    colorScheme: 'from-orange-900 via-stone-900 to-amber-900',
    mockUI: {
      type: 'resto',
      metrics: [
        { label: 'En Horno', value: '5 Pizzas', color: 'text-orange-400' },
        { label: 'En Delivery', value: '2 Cadetes', color: 'text-yellow-400' },
        { label: 'Caja del Día', value: '$184.500', color: 'text-emerald-400' }
      ],
      tables: [
        { id: 1, name: 'Mesa 1', status: 'libre' },
        { id: 2, name: 'Mesa 2', status: 'libre' },
        { id: 3, name: 'VIP-1', status: 'libre' },
        { id: 4, name: 'Terraza-3', status: 'libre' }
      ],
      items: [
        { id: '101', name: 'Baguette Albondiguette de Ternera', category: 'Especialidades', price: '$11.500', status: 'Stock: 999u', tag: 'Promoción' },
        { id: '102', name: 'Baguette Mortadela Bologna & Crema Olivas', category: 'Especialidades', price: '$10.500', status: 'Stock: 999u', tag: 'Destacado' },
        { id: '103', name: 'Baguette Clásica Jamón Natural & Cheddar', category: 'Baguettes', price: '$10.000', status: 'Stock: 999u', tag: 'Clásico' },
        { id: '104', name: 'Baguette Cruda y Queso', category: 'Baguettes', price: '$11.000', status: 'Stock: 999u', tag: 'Clásico' }
      ]
    }
  },
  {
    id: 'blessed-tienda',
    title: 'BLESSED - Indumentaria & Zapatillas',
    rubro: 'indumentaria',
    subtitle: 'Ropa Urbana & Sneakers Store',
    description: 'Sistema de gestión de inventario y punto de venta para locales de ropa. Control riguroso de stock, matriz de talles y colores, e historial de ventas.',
    badge: 'TIENDA DE ROPA',
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Matriz de Talles (XS a XXXL / 37 a 45) y Colores',
      'Alertas de Stock Bajo ("1 Bajo | 0 S/S")',
      'Modelo de Ingresos, Precios de Costo y Márgenes',
      'Facturación Electrónica ARCA (ex AFIP) opcional',
      'Carga súper rápida de productos textiles'
    ],
    clientExample: 'tiendadigitalropa-phi.vercel.app',
    colorScheme: 'from-zinc-900 via-neutral-900 to-orange-950',
    mockUI: {
      type: 'ecommerce',
      metrics: [
        { label: 'Total Productos', value: '14 Items', color: 'text-amber-400' },
        { label: 'Valor del Stock', value: '$14.643.000', color: 'text-emerald-400' },
        { label: 'Alertas Stock', value: '1 Bajo', color: 'text-red-400' }
      ],
      items: [
        { id: 'zap-4', name: 'All-Terrain Urban Stealth Black', category: 'ZAPATILLAS', price: '$110.000', status: 'Stock: 5 u.', tag: '#zap-4' },
        { id: 'tex-1', name: 'Buzo Urban Core Oversized', category: 'ROPA', price: '$55.000', status: 'Stock: 20 u.', tag: '#tex-1' },
        { id: 'tex-11', name: 'Camisa Leñadora Heavy Flannel', category: 'ROPA', price: '$62.000', status: 'Stock: 16 u.', tag: '#tex-11' },
        { id: 'zap-3', name: 'Court Classics Minimalist White', category: 'ZAPATILLAS', price: '$85.000', status: 'Stock: 15 u.', tag: '#zap-3' }
      ]
    }
  },
  {
    id: 'salud-historias-clinicas',
    title: 'Consultorio & Salud - Historia Clínica Digital',
    rubro: 'salud-estetica',
    subtitle: 'Gestión Médica, Agenda de Turnos & Fichas de Pacientes',
    description: 'Sistema especializado para médicos, odontólogos, psicólogos y clínicas. Registra historias clínicas digitales, fichas de pacientes, turnos programados y archivos adjuntos de estudios.',
    badge: 'SALUD & CONSULTORIOS',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Historia Clínica Digital con diagnóstico y antecedentes',
      'Agenda de Turnos con avisos y recordatorios automáticos',
      'Ficha de Paciente con evoluciones y tratamientos',
      'Carga de Recetas y órdenes médicas en PDF',
      'Acceso seguro y rápido desde cualquier dispositivo'
    ],
    clientExample: 'salud-historiaclinica.vercel.app',
    colorScheme: 'from-teal-900 via-slate-900 to-cyan-950',
    mockUI: {
      type: 'saas',
      metrics: [
        { label: 'Pacientes Atendidos', value: '1.240 Fichas', color: 'text-teal-400' },
        { label: 'Turnos Hoy', value: '18 Agendados', color: 'text-cyan-400' },
        { label: 'Estado Consultorio', value: 'Atendiendo', color: 'text-emerald-400' }
      ],
      items: [
        { id: 'p1', name: 'Dr. Alejandro Gomez - Turno 09:30', category: 'Paciente: María S.', price: 'Historia #1084', status: 'En consulta', tag: 'Turno Hoy' },
        { id: 'p2', name: 'Evolución Médica & Diagnóstico', category: 'Ficha Digital', price: 'Completada', status: 'Tratamiento en curso', tag: 'HC Digital' },
        { id: 'p3', name: 'Receta Digital & Estudio Adjunto', category: 'Documentos PDF', price: 'Adjunto', status: 'Laboratorio enviado', tag: 'Estudio' },
        { id: 'p4', name: 'Recordatorio WhatsApp Pacientes', category: 'Notificaciones', price: 'Automático', status: '18 avisos enviados', tag: 'WhatsApp' }
      ]
    }
  },
  {
    id: 'ferreteria-corralon',
    title: 'Ferretería & Corralón El Vulcano',
    rubro: 'ferreteria-taller',
    subtitle: 'Control de Stock, Cuentas Corrientes & Presupuestos PDF',
    description: 'Sistema integral para ferreterías, buloneras y corralones. Búsqueda instantánea por código de barras o descripción, manejo de cuentas corrientes de clientes con límite de crédito y emisión de presupuestos y remitos.',
    badge: 'FERRETERÍA & CORRALÓN',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Búsqueda de artículos por Código de Barras o Palabras clave',
      'Facturación Electrónica ARCA (ex AFIP) comprobantes A, B y C',
      'Cuentas Corrientes de Clientes con historial de pagos y recibos',
      'Presupuestos y Remitos inmediatos exportables a PDF',
      'Actualización masiva de precios por porcentaje o proveedor'
    ],
    clientExample: 'ferreteria-elvulcano.vercel.app',
    colorScheme: 'from-amber-950 via-slate-900 to-orange-950',
    mockUI: {
      type: 'saas',
      metrics: [
        { label: 'Artículos en Stock', value: '4.850 Insumos', color: 'text-amber-400' },
        { label: 'Cuentas Corrientes', value: '82 Clientes', color: 'text-cyan-400' },
        { label: 'Presupuestos Hoy', value: '14 Emitidos', color: 'text-emerald-400' }
      ],
      items: [
        { id: 'f1', name: 'Taladro Percutor 750W Industrial', category: 'Herramientas', price: '$85.000', status: 'Stock: 12 u.', tag: 'Popular' },
        { id: 'f2', name: 'Bolsa Cemento Loma Negra 50kg', category: 'Corralón', price: '$9.800', status: 'Stock: 320 u.', tag: 'Masivo' },
        { id: 'f3', name: 'Juego de Llaves Combinadas x12', category: 'Ferretería', price: '$34.500', status: 'Stock: 8 u.', tag: 'Calidad' },
        { id: 'f4', name: 'Cuenta Corriente - Empresa Constructora AR', category: 'Ctas. Ctes.', price: 'Saldo: $420.000', status: 'Al día', tag: 'Cliente VIP' }
      ]
    }
  },
  {
    id: 'taller-mecanico-autofix',
    title: 'AutoFix - Taller Mecánico & Servicentro',
    rubro: 'ferreteria-taller',
    subtitle: 'Órdenes de Trabajo, Fichas de Vehículos & Repuestos',
    description: 'Gestión especializada para talleres automotrices, lubricentros y gomerías. Control de órdenes de trabajo asociadas a patentes de vehículos, mano de obra, repuestos y aviso directo al cliente por WhatsApp.',
    badge: 'TALLER MECÁNICO',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Registro de Órdenes de Trabajo por Patente, Vehículo y Modelo',
      'Desglose de Repuestos utilizados y Horas de Mano de Obra',
      'Historial mecánico completo de cada vehículo atendido',
      'Notificaciones automáticas por WhatsApp: "Tu auto está listo para retirar"',
      'Impresión de comprobante de ingreso y presupuesto preliminar'
    ],
    clientExample: 'taller-autofix.vercel.app',
    colorScheme: 'from-zinc-900 via-red-950 to-stone-900',
    mockUI: {
      type: 'saas',
      metrics: [
        { label: 'Unidades en Taller', value: '7 Autos', color: 'text-red-400' },
        { label: 'Órdenes Hoy', value: '5 Finalizadas', color: 'text-emerald-400' },
        { label: 'Avisos WhatsApp', value: '100% Enviados', color: 'text-emerald-400' }
      ],
      items: [
        { id: 't1', name: 'Toyota Hilux [Patente AB123CD] - Service 50.000km', category: 'Orden #402', price: '$120.000', status: 'En reparación', tag: 'Mecánico: Carlos' },
        { id: 't2', name: 'Ford Ranger [Patente AF888ZZ] - Cambio de Pastillas & Discos', category: 'Orden #403', price: '$85.000', status: 'Listo p/ retirar', tag: 'WhatsApp enviado' },
        { id: 't3', name: 'Volkswagen Gol Trend [Patente AA999XX] - Diagnóstico Freno', category: 'Orden #404', price: '$45.000', status: 'En diagnóstico', tag: 'Mecánico: Marcos' },
        { id: 't4', name: 'Aceite sintético 5W30 x 4L + Filtros', category: 'Repuestos', price: '$48.000', status: 'Stock: 24 u.', tag: 'Insumos' }
      ]
    }
  },
  {
    id: 'super-market-express',
    title: 'MarketExpress - Minimarket & Supermercado',
    rubro: 'super-almacen',
    subtitle: 'Punto de Venta Rápido, Código de Barras & Control de Caja',
    description: 'Sistema ultrarrápido diseñado para cobrar en caja en segundos. Soporta escáner de barras físico, balanzas de peso, ofertas por cantidad, cobranza con múltiples medios de pago y arqueo diario.',
    badge: 'SUPERMERCADO & MINIMARKET',
    imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Cobra por código de barras a máxima velocidad',
      'Facturación Electrónica ARCA (ex AFIP) integrada en caja',
      'Múltiples formas de pago por ticket (Efectivo + Mercado Pago / Tarjeta)',
      'Alertas de vencimiento de productos en góndola',
      'Cierre y arqueo de caja x turno con reporte de diferencias'
    ],
    clientExample: 'market-express.vercel.app',
    colorScheme: 'from-emerald-950 via-slate-900 to-green-950',
    mockUI: {
      type: 'ecommerce',
      metrics: [
        { label: 'Ventas del Día', value: '142 Tickets', color: 'text-emerald-400' },
        { label: 'Caja Recaudada', value: '$380.500', color: 'text-emerald-400' },
        { label: 'Tiempo x Ticket', value: '18 Segundos', color: 'text-cyan-400' }
      ],
      items: [
        { id: 'm1', name: 'Leche Entera La Serenísima 1L', category: 'LÁCTEOS', price: '$1.350', status: 'Stock: 120 u.', tag: '#7790001' },
        { id: 'm2', name: 'Coca-Cola Sabor Original 2.25L', category: 'BEBIDAS', price: '$2.800', status: 'Stock: 85 u.', tag: '#7790002' },
        { id: 'm3', name: 'Pan Criollo por Kilo (Balanza)', category: 'PANADERÍA', price: '$2.200', status: 'Pinchado', tag: '#TeclaF1' },
        { id: 'm4', name: 'Galletitas Criollitas x3 Packs', category: 'ALMACÉN', price: '$1.100', status: 'Stock: 200 u.', tag: '#7790004' }
      ]
    }
  },
  {
    id: 'saas-multirrubro',
    title: 'SaaS Gestión ERP Multirrubro & ARCA',
    rubro: 'saas-multirrubro',
    subtitle: 'Plataforma para +14 Rubros Comerciales con Facturación ARCA',
    description: 'Sistema integral adaptado para Ferreterías, Talleres Mecánicos, Gimnasios, Consultorios Médicos, Supermercados, Inmobiliarias y Servicios Profesionales.',
    badge: 'ERP MULTIRRUBRO',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Facturación Electrónica ARCA (ex AFIP) integrada en todos los módulos',
      'Gastronomía (Mesas, comandas, despacho de cocina)',
      'Tienda de Ropa (Variantes de talles, colores y stock multisucursal)',
      'Consultorio / Salud (Agenda de turnos e historias clínicas digitales)',
      'Supermercado / Almacén (Escáner código de barras y venta rápida)',
      'Ferretería & Insumos (Herramientas, pesados y materiales)',
      'Taller Mecánico (Órdenes de trabajo, repuestos y mecánicos)'
    ],
    clientExample: 'programa-saas.vercel.app',
    colorScheme: 'from-blue-900 via-slate-900 to-indigo-950',
    mockUI: {
      type: 'saas',
      metrics: [
        { label: 'Rubros Soportados', value: '14 Módulos', color: 'text-blue-400' },
        { label: 'Facturación ARCA', value: 'Comprobantes A/B/C', color: 'text-emerald-400' },
        { label: 'Soporte', value: 'Anahí Gilardi & Enzo Girardi', color: 'text-rose-400' }
      ],
      items: [
        { id: 'm1', name: 'Gastronomía & Comandas', category: '10 Módulos', price: 'Incluido', status: 'Mesas, comandas y despacho', tag: 'Popular' },
        { id: 'm2', name: 'Tienda de Ropa / Indumentaria', category: '8 Módulos', price: 'Incluido', status: 'Talles, colores y multisucursal', tag: 'Popular' },
        { id: 'm3', name: 'Consultorio / Salud', category: '4 Módulos', price: 'Incluido', status: 'Turnos e historias clínicas', tag: 'Salud' },
        { id: 'm4', name: 'Facturación ARCA (ex AFIP)', category: 'Oficial', price: 'Incluido', status: 'Factura A, B y C automática', tag: 'ARCA' }
      ]
    }
  }
];

export const industryOptions: IndustryOption[] = [
  {
    id: 'gastronomia',
    name: 'Gastronomía (Resto, Bar, Pizzería, Cafetería)',
    icon: 'Utensils',
    recommendedFeatures: ['mesas', 'comandas', 'cocina', 'delivery', 'stock-ingredientes', 'caja']
  },
  {
    id: 'indumentaria',
    name: 'Tienda de Ropa / Zapatillas / Calzado',
    icon: 'ShoppingBag',
    recommendedFeatures: ['matriz-talles', 'pos-rapido', 'stock-alertas', 'cupones', 'codigos-barras']
  },
  {
    id: 'ferreteria-taller',
    name: 'Ferretería, Corralón o Taller Mecánico',
    icon: 'Wrench',
    recommendedFeatures: ['ordenes-trabajo', 'codigo-barras', 'mantenimiento', 'presupuestos', 'cuenta-corriente']
  },
  {
    id: 'super-almacen',
    name: 'Supermercado, Almacén o Minimarket',
    icon: 'ShoppingCart',
    recommendedFeatures: ['pos-rapido', 'lector-barras', 'balanza', 'vencimientos', 'caja-diaria']
  },
  {
    id: 'salud-estetica',
    name: 'Consultorio, Peluquería, Estética o Gym',
    icon: 'Calendar',
    recommendedFeatures: ['agenda-turnos', 'historia-cliente', 'recordatorios-whatsapp', 'pagos-mensuales']
  },
  {
    id: 'inmobiliaria-servicios',
    name: 'Inmobiliaria, Expensas o Servicios Profesionales',
    icon: 'Building',
    recommendedFeatures: ['contratos', 'liquidacion-expensas', 'honorarios', 'documentos-pdf']
  }
];
