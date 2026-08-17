const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock JWT Token
const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZXRvY2FycmVyb195cmV0YWlsZXIiLCJpYXQiOjE3MjQxMDAwMDB9.abc123xyz";

// Autenticação middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  if (token !== mockToken && token !== 'any-token-works') {
    return res.status(401).json({ error: 'Token inválido' });
  }

  next();
};

// ==================== PRODUTOS (PREÇOS ESTÁTICOS) ====================

const produtos = [
  {
    blocked: false,
    objectId: "passport-gold-annual",
    name: "Passaporte Gold Anual",
    productDescription: "Acesso ilimitado ao parque por 12 meses consecutivos. Inclui estacionamento grátis, 4 vouchers para acompanhante e acesso prioritário a filas. Ideal para quem quer aproveitar o parque o ano todo.",
    externalUrl: "https://www2.betocarrero.com.br/passaportes/ouro-anual",
    externalProduct: false,
    mainVariant: {
      objectId: "passport-gold-annual-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Gold+Anual",
      erpId: "SKU-BC-PGA-2024",
      name: "Passaporte Gold Anual",
      visible: true,
      price: 1890.00,
      salePrice: 1606.50,
      quantity: 500,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.2,
      variations: [
        { key: "Tipo", value: "Gold" },
        { key: "Validade", value: "12 Meses" },
        { key: "Acesso", value: "Ilimitado" }
      ]
    },
    variants: [
      {
        objectId: "passport-gold-annual-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Gold+Anual",
        erpId: "SKU-BC-PGA-2024",
        name: "Passaporte Gold Anual",
        visible: true,
        price: 1890.00,
        salePrice: 1606.50,
        quantity: 500,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          { key: "Tipo", value: "Gold" },
          { key: "Validade", value: "12 Meses" },
          { key: "Acesso", value: "Ilimitado" }
        ]
      }
    ],
    sellOutOfStock: false,
    trackInventory: true
  },
  {
    blocked: false,
    objectId: "passport-silver-annual",
    name: "Passaporte Silver Anual",
    productDescription: "Acesso ao parque por 12 meses com bloqueios em feriados prolongados. Inclui estacionamento parcial e 2 vouchers para acompanhante. Excelente opção para uso regular.",
    externalUrl: "https://www2.betocarrero.com.br/passaportes/prata-anual",
    externalProduct: false,
    mainVariant: {
      objectId: "passport-silver-annual-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Silver+Anual",
      erpId: "SKU-BC-PSA-2024",
      name: "Passaporte Silver Anual",
      visible: true,
      price: 990.00,
      salePrice: 841.50,
      quantity: 800,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.2,
      variations: [
        { key: "Tipo", value: "Silver" },
        { key: "Validade", value: "12 Meses" },
        { key: "Bloqueios", value: "Feriados Prolongados" }
      ]
    },
    variants: [
      {
        objectId: "passport-silver-annual-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Silver+Anual",
        erpId: "SKU-BC-PSA-2024",
        name: "Passaporte Silver Anual",
        visible: true,
        price: 990.00,
        salePrice: 841.50,
        quantity: 800,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          { key: "Tipo", value: "Silver" },
          { key: "Validade", value: "12 Meses" },
          { key: "Bloqueios", value: "Feriados Prolongados" }
        ]
      }
    ],
    sellOutOfStock: false,
    trackInventory: true
  },
  {
    blocked: false,
    objectId: "passport-gold-3days",
    name: "Passaporte Gold 3 Dias",
    productDescription: "Acesso ao parque por 3 dias consecutivos. Inclui estacionamento para todos os dias e acesso prioritário. Perfeito para férias curtas ou finais de semana prolongados.",
    externalUrl: "https://www2.betocarrero.com.br/passaportes/ouro-3dias",
    externalProduct: false,
    mainVariant: {
      objectId: "passport-gold-3days-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Gold+3+Dias",
      erpId: "SKU-BC-PG3-2024",
      name: "Passaporte Gold 3 Dias",
      visible: true,
      price: 489.00,
      salePrice: 415.65,
      quantity: 1200,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.2,
      variations: [
        { key: "Tipo", value: "Gold" },
        { key: "Duração", value: "3 Dias" },
        { key: "Acesso", value: "Consecutivo" }
      ]
    },
    variants: [
      {
        objectId: "passport-gold-3days-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Gold+3+Dias",
        erpId: "SKU-BC-PG3-2024",
        name: "Passaporte Gold 3 Dias",
        visible: true,
        price: 489.00,
        salePrice: 415.65,
        quantity: 1200,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          { key: "Tipo", value: "Gold" },
          { key: "Duração", value: "3 Dias" },
          { key: "Acesso", value: "Consecutivo" }
        ]
      }
    ],
    sellOutOfStock: false,
    trackInventory: true
  },
  {
    blocked: false,
    objectId: "passport-silver-3days",
    name: "Passaporte Silver 3 Dias",
    productDescription: "Acesso ao parque por 3 dias consecutivos. Inclui estacionamento e acesso básico. Ótima opção para visitantes ocasionais que desejam aproveitar vários dias.",
    externalUrl: "https://www2.betocarrero.com.br/passaportes/prata-3dias",
    externalProduct: false,
    mainVariant: {
      objectId: "passport-silver-3days-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Silver+3+Dias",
      erpId: "SKU-BC-PS3-2024",
      name: "Passaporte Silver 3 Dias",
      visible: true,
      price: 289.00,
      salePrice: 245.65,
      quantity: 1500,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.2,
      variations: [
        { key: "Tipo", value: "Silver" },
        { key: "Duração", value: "3 Dias" },
        { key: "Acesso", value: "Consecutivo" }
      ]
    },
    variants: [
      {
        objectId: "passport-silver-3days-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Silver+3+Dias",
        erpId: "SKU-BC-PS3-2024",
        name: "Passaporte Silver 3 Dias",
        visible: true,
        price: 289.00,
        salePrice: 245.65,
        quantity: 1500,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          { key: "Tipo", value: "Silver" },
          { key: "Duração", value: "3 Dias" },
          { key: "Acesso", value: "Consecutivo" }
        ]
      }
    ],
    sellOutOfStock: false,
    trackInventory: true
  },
  {
    blocked: false,
    objectId: "passport-1day",
    name: "Passaporte 1 Dia",
    productDescription: "Acesso ao parque por 1 dia inteiro. Inclui entrada e acesso a todas as atrações. Ideal para visitas rápidas ou para conhecer o parque antes de optar por passaporte anual.",
    externalUrl: "https://www2.betocarrero.com.br/passaportes/1dia",
    externalProduct: false,
    mainVariant: {
      objectId: "passport-1day-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+1+Dia",
      erpId: "SKU-BC-P1D-2024",
      name: "Passaporte 1 Dia",
      visible: true,
      price: 179.00,
      salePrice: 152.15,
      quantity: 2000,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.2,
      variations: [
        { key: "Duração", value: "1 Dia" },
        { key: "Tipo", value: "Básico" }
      ]
    },
    variants: [
      {
        objectId: "passport-1day-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+1+Dia",
        erpId: "SKU-BC-P1D-2024",
        name: "Passaporte 1 Dia",
        visible: true,
        price: 179.00,
        salePrice: 152.15,
        quantity: 2000,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          { key: "Duração", value: "1 Dia" },
          { key: "Tipo", value: "Básico" }
        ]
      }
    ],
    sellOutOfStock: false,
    trackInventory: true
  },
  {
    blocked: false,
    objectId: "passport-weekend-gold",
    name: "Passaporte Weekend Gold",
    productDescription: "Acesso ao parque nos finais de semana (sábado e domingo). Inclui estacionamento e acesso prioritário. Perfeito para quem quer aproveitar os finais de semana do ano todo.",
    externalUrl: "https://www2.betocarrero.com.br/passaportes/weekend-gold",
    externalProduct: false,
    mainVariant: {
      objectId: "passport-weekend-gold-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Weekend+Gold",
      erpId: "SKU-BC-PWG-2024",
      name: "Passaporte Weekend Gold",
      visible: true,
      price: 599.00,
      salePrice: 509.15,
      quantity: 600,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.2,
      variations: [
        { key: "Tipo", value: "Gold" },
        { key: "Dias", value: "Fins de Semana" },
        { key: "Validade", value: "12 Meses" }
      ]
    },
    variants: [
      {
        objectId: "passport-weekend-gold-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Weekend+Gold",
        erpId: "SKU-BC-PWG-2024",
        name: "Passaporte Weekend Gold",
        visible: true,
        price: 599.00,
        salePrice: 509.15,
        quantity: 600,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          { key: "Tipo", value: "Gold" },
          { key: "Dias", value: "Fins de Semana" },
          { key: "Validade", value: "12 Meses" }
        ]
      }
    ],
    sellOutOfStock: false,
    trackInventory: true
  },
  {
    blocked: false,
    objectId: "fast-pass",
    name: "Fast Pass - Pula Fila",
    productDescription: "Acesso prioritário a atrações principais do parque. Pule filas e aproveite mais o seu dia. Disponível em diferentes opções (Silver 5 atrações ou Gold 10 atrações).",
    externalUrl: "https://www2.betocarrero.com.br/opcionais/fast-pass",
    externalProduct: false,
    mainVariant: {
      objectId: "fast-pass-silver",
      externalImageURL: "https://via.placeholder.com/400x300?text=Fast+Pass+Silver",
      erpId: "SKU-BC-FPS-2024",
      name: "Fast Pass Silver (5 Atrações)",
      visible: true,
      price: 199.99,
      salePrice: 169.99,
      quantity: 400,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 5,
      height: 10,
      variantLength: 0.5,
      weight: 0.1,
      variations: [
        { key: "Tipo", value: "Silver" },
        { key: "Atrações", value: "5 Principais" }
      ]
    },
    variants: [
      {
        objectId: "fast-pass-silver",
        externalImageURL: "https://via.placeholder.com/400x300?text=Fast+Pass+Silver",
        erpId: "SKU-BC-FPS-2024",
        name: "Fast Pass Silver (5 Atrações)",
        visible: true,
        price: 199.99,
        salePrice: 169.99,
        quantity: 400,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 5,
        height: 10,
        variantLength: 0.5,
        weight: 0.1,
        variations: [
          { key: "Tipo", value: "Silver" },
          { key: "Atrações", value: "5 Principais" }
        ]
      },
      {
        objectId: "fast-pass-gold",
        externalImageURL: "https://via.placeholder.com/400x300?text=Fast+Pass+Gold",
        erpId: "SKU-BC-FPG-2024",
        name: "Fast Pass Gold (10 Atrações)",
        visible: true,
        price: 349.99,
        salePrice: 297.49,
        quantity: 250,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 5,
        height: 10,
        variantLength: 0.5,
        weight: 0.1,
        variations: [
          { key: "Tipo", value: "Gold" },
          { key: "Atrações", value: "10 Principais" }
        ]
      }
    ],
    sellOutOfStock: false,
    trackInventory: true
  },
  {
    blocked: false,
    objectId: "foto-profissional",
    name: "Sessão de Fotos Profissional",
    productDescription: "Sessão de fotos profissional com fotógrafo dedicado em locais estratégicos do parque. Escolha entre diferentes pacotes de duração e número de fotos.",
    externalUrl: "https://www2.betocarrero.com.br/opcionais/fotos-profissionais",
    externalProduct: false,
    mainVariant: {
      objectId: "foto-prof-30min",
      externalImageURL: "https://via.placeholder.com/400x300?text=Fotos+30min",
      erpId: "SKU-BC-FP30-2024",
      name: "Sessão 30 Minutos (30 fotos)",
      visible: true,
      price: 249.99,
      salePrice: 212.49,
      quantity: 150,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.2,
      variations: [
        { key: "Duração", value: "30 Minutos" },
        { key: "Fotos", value: "30 Fotos" }
      ]
    },
    variants: [
      {
        objectId: "foto-prof-30min",
        externalImageURL: "https://via.placeholder.com/400x300?text=Fotos+30min",
        erpId: "SKU-BC-FP30-2024",
        name: "Sessão 30 Minutos (30 fotos)",
        visible: true,
        price: 249.99,
        salePrice: 212.49,
        quantity: 150,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          { key: "Duração", value: "30 Minutos" },
          { key: "Fotos", value: "30 Fotos" }
        ]
      },
      {
        objectId: "foto-prof-60min",
        externalImageURL: "https://via.placeholder.com/400x300?text=Fotos+60min",
        erpId: "SKU-BC-FP60-2024",
        name: "Sessão 60 Minutos (60 fotos)",
        visible: true,
        price: 429.99,
        salePrice: 365.49,
        quantity: 100,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          { key: "Duração", value: "60 Minutos" },
          { key: "Fotos", value: "60 Fotos" }
        ]
      }
    ],
    sellOutOfStock: false,
    trackInventory: true
  },
  {
    blocked: false,
    objectId: "tour-guiado",
    name: "Tour Guiado Premium",
    productDescription: "Tour guiado com especialista do parque. Conheça a história e curiosidades do Beto Carrero com um guia experiente. Disponível em 2 ou 4 horas.",
    externalUrl: "https://www2.betocarrero.com.br/opcionais/tour-guiado",
    externalProduct: false,
    mainVariant: {
      objectId: "tour-2horas",
      externalImageURL: "https://via.placeholder.com/400x300?text=Tour+2h",
      erpId: "SKU-BC-TG2-2024",
      name: "Tour Guiado 2 Horas",
      visible: true,
      price: 199.99,
      salePrice: 169.99,
      quantity: 80,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.2,
      variations: [
        { key: "Duração", value: "2 Horas" },
        { key: "Tipo", value: "Guiado" }
      ]
    },
    variants: [
      {
        objectId: "tour-2horas",
        externalImageURL: "https://via.placeholder.com/400x300?text=Tour+2h",
        erpId: "SKU-BC-TG2-2024",
        name: "Tour Guiado 2 Horas",
        visible: true,
        price: 199.99,
        salePrice: 169.99,
        quantity: 80,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          { key: "Duração", value: "2 Horas" },
          { key: "Tipo", value: "Guiado" }
        ]
      },
      {
        objectId: "tour-4horas",
        externalImageURL: "https://via.placeholder.com/400x300?text=Tour+4h",
        erpId: "SKU-BC-TG4-2024",
        name: "Tour Guiado 4 Horas",
        visible: true,
        price: 299.99,
        salePrice: 254.99,
        quantity: 50,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          { key: "Duração", value: "4 Horas" },
          { key: "Tipo", value: "Guiado Premium" }
        ]
      }
    ],
    sellOutOfStock: false,
    trackInventory: true
  }
];

// ==================== ENDPOINTS ====================

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '5.0-simples',
    timestamp: new Date().toISOString(),
    message: 'API Mock Beto Carrero - OmniChat SearchProduct API (Listagem Pura)',
    features: [
      'Array direto de produtos',
      'Preços estáticos',
      'Sem dinâmica de preço',
      'Sem filtros complexos'
    ]
  });
});

app.get('/', (req, res) => {
  res.json({
    name: 'API Mock Beto Carrero World',
    version: '5.0-simples',
    specification: 'OmniChat SearchProduct API (Listagem Pura)',
    documentation: 'https://developers.omni.chat/docs/how-to-implement-the-searchproduct-api',
    endpoints: {
      health: 'GET /health',
      search: 'GET /search'
    }
  });
});

// ========== SEARCH PRODUCT ENDPOINT (Simples - Apenas Retorna Todos) ==========
app.get('/search', authenticateToken, (req, res) => {
  const from = parseInt(req.query.from) || 0;
  const size = parseInt(req.query.size) || 10;

  // Paginação simples
  const paginados = produtos.slice(from, from + size);

  // Retorna array direto
  res.json(paginados);
});

// ========== ENDPOINT ALTERNATIVO ==========
app.get('/products/search', authenticateToken, (req, res) => {
  const from = parseInt(req.query.from) || 0;
  const size = parseInt(req.query.size) || 10;

  const paginados = produtos.slice(from, from + size);

  res.json(paginados);
});

// Buscar produto por ID
app.get('/products/:productId', authenticateToken, (req, res) => {
  const produto = produtos.find(p => p.objectId === req.params.productId);

  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.json(produto);
});

// Retorna TODOS os produtos sem paginação
app.get('/products', authenticateToken, (req, res) => {
  res.json(produtos);
});

// ==================== PORTA ====================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Mock Beto Carrero (v5.0-simples)`);
  console.log(`📡 Porta: ${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/health`);
  console.log(`📋 Todos os produtos: http://localhost:${PORT}/products`);
  console.log(`🔍 Search puro: http://localhost:${PORT}/search`);
  console.log(`🎯 Total de produtos: ${produtos.length}`);
});