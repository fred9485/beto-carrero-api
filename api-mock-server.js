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

// ==================== PRODUTOS ====================
// Estrutura conforme DocumentaçãoOmniChat SearchProduct API

const produtos = [
  {
    blocked: false,
    objectId: "passport-gold-annual",
    name: "Passaporte Gold Anual",
    productDescription: "Acesso ilimitado ao parque por 12 meses consecutivos com estacionamento incluso e 4 vouchers para acompanhante",
    externalUrl: "https://www.betocarrero.com.br/passaportes/ouro-anual",
    externalProduct: false,
    mainVariant: {
      objectId: "passport-gold-annual-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Gold",
      erpId: "SKU-BC-PGA-2024",
      name: "Passaporte Gold Anual",
      visible: true,
      price: 1890.00,
      salePrice: 1490.00,
      quantity: 1000,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.2,
      variations: [
        {
          key: "Validade",
          value: "12 Meses"
        },
        {
          key: "Tipo",
          value: "Gold"
        }
      ]
    },
    variants: [
      {
        objectId: "passport-gold-annual-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Gold",
        erpId: "SKU-BC-PGA-2024",
        name: "Passaporte Gold Anual",
        visible: true,
        price: 1890.00,
        salePrice: 1490.00,
        quantity: 1000,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          {
            key: "Validade",
            value: "12 Meses"
          },
          {
            key: "Tipo",
            value: "Gold"
          }
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
    productDescription: "Acesso ilimitado ao parque por 12 meses com bloqueios em feriados prolongados",
    externalUrl: "https://www.betocarrero.com.br/passaportes/prata-anual",
    externalProduct: false,
    mainVariant: {
      objectId: "passport-silver-annual-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Silver",
      erpId: "SKU-BC-PSA-2024",
      name: "Passaporte Silver Anual",
      visible: true,
      price: 990.00,
      salePrice: 890.00,
      quantity: 1500,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.2,
      variations: [
        {
          key: "Validade",
          value: "12 Meses"
        },
        {
          key: "Tipo",
          value: "Silver"
        }
      ]
    },
    variants: [
      {
        objectId: "passport-silver-annual-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Silver",
        erpId: "SKU-BC-PSA-2024",
        name: "Passaporte Silver Anual",
        visible: true,
        price: 990.00,
        salePrice: 890.00,
        quantity: 1500,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          {
            key: "Validade",
            value: "12 Meses"
          },
          {
            key: "Tipo",
            value: "Silver"
          }
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
    productDescription: "Acesso ao parque por 3 dias consecutivos com estacionamento grátis e acesso VIP",
    externalUrl: "https://www.betocarrero.com.br/passaportes/ouro-3dias",
    externalProduct: false,
    mainVariant: {
      objectId: "passport-gold-3days-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Gold+3+Dias",
      erpId: "SKU-BC-PG3D-2024",
      name: "Passaporte Gold 3 Dias",
      visible: true,
      price: 489.00,
      salePrice: 429.00,
      quantity: 800,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.2,
      variations: [
        {
          key: "Validade",
          value: "3 Dias"
        },
        {
          key: "Tipo",
          value: "Gold"
        }
      ]
    },
    variants: [
      {
        objectId: "passport-gold-3days-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Gold+3+Dias",
        erpId: "SKU-BC-PG3D-2024",
        name: "Passaporte Gold 3 Dias",
        visible: true,
        price: 489.00,
        salePrice: 429.00,
        quantity: 800,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          {
            key: "Validade",
            value: "3 Dias"
          },
          {
            key: "Tipo",
            value: "Gold"
          }
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
    productDescription: "Acesso ao parque por 3 dias consecutivos. Ideal para conhecer as principais atrações",
    externalUrl: "https://www.betocarrero.com.br/passaportes/prata-3dias",
    externalProduct: false,
    mainVariant: {
      objectId: "passport-silver-3days-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Silver+3+Dias",
      erpId: "SKU-BC-PS3D-2024",
      name: "Passaporte Silver 3 Dias",
      visible: true,
      price: 289.00,
      salePrice: 249.00,
      quantity: 1200,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.2,
      variations: [
        {
          key: "Validade",
          value: "3 Dias"
        },
        {
          key: "Tipo",
          value: "Silver"
        }
      ]
    },
    variants: [
      {
        objectId: "passport-silver-3days-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Silver+3+Dias",
        erpId: "SKU-BC-PS3D-2024",
        name: "Passaporte Silver 3 Dias",
        visible: true,
        price: 289.00,
        salePrice: 249.00,
        quantity: 1200,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          {
            key: "Validade",
            value: "3 Dias"
          },
          {
            key: "Tipo",
            value: "Silver"
          }
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
    productDescription: "Acesso por 1 dia ao parque com acesso às principais atrações e áreas de alimentação",
    externalUrl: "https://www.betocarrero.com.br/passaportes/1dia",
    externalProduct: false,
    mainVariant: {
      objectId: "passport-1day-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+1+Dia",
      erpId: "SKU-BC-P1D-2024",
      name: "Passaporte 1 Dia",
      visible: true,
      price: 179.00,
      salePrice: 149.00,
      quantity: 2000,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.2,
      variations: [
        {
          key: "Validade",
          value: "1 Dia"
        }
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
        salePrice: 149.00,
        quantity: 2000,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          {
            key: "Validade",
            value: "1 Dia"
          }
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
    productDescription: "Acesso ilimitado aos sábados e domingos por 3 meses com estacionamento",
    externalUrl: "https://www.betocarrero.com.br/passaportes/weekend-gold",
    externalProduct: false,
    mainVariant: {
      objectId: "passport-weekend-gold-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Weekend+Gold",
      erpId: "SKU-BC-PWG-2024",
      name: "Passaporte Weekend Gold",
      visible: true,
      price: 599.00,
      salePrice: 499.00,
      quantity: 500,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.2,
      variations: [
        {
          key: "Validade",
          value: "90 Dias"
        },
        {
          key: "Tipo",
          value: "Weekend"
        }
      ]
    },
    variants: [
      {
        objectId: "passport-weekend-gold-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Weekend+Gold",
        erpId: "SKU-BC-PWG-2024",
        name: "Passaporte Weekend Gold",
        visible: true,
        price: 599.00,
        salePrice: 499.00,
        quantity: 500,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.2,
        variations: [
          {
            key: "Validade",
            value: "90 Dias"
          },
          {
            key: "Tipo",
            value: "Weekend"
          }
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
    productDescription: "Acesso prioritário às 10 atrações mais procuradas do parque",
    externalUrl: "https://www.betocarrero.com.br/opcionais/fast-pass",
    externalProduct: false,
    mainVariant: {
      objectId: "fast-pass-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Fast+Pass",
      erpId: "SKU-BC-FP-2024",
      name: "Fast Pass",
      visible: true,
      price: 189.00,
      salePrice: 159.00,
      quantity: 600,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.1,
      variations: [
        {
          key: "Tipo",
          value: "Fast Pass"
        },
        {
          key: "Atrações",
          value: "10 Principais"
        }
      ]
    },
    variants: [
      {
        objectId: "fast-pass-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Fast+Pass",
        erpId: "SKU-BC-FP-2024",
        name: "Fast Pass",
        visible: true,
        price: 189.00,
        salePrice: 159.00,
        quantity: 600,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.1,
        variations: [
          {
            key: "Tipo",
            value: "Fast Pass"
          },
          {
            key: "Atrações",
            value: "10 Principais"
          }
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
    productDescription: "Sessão de fotos profissional em locais estratégicos do parque com fotógrafo dedicado",
    externalUrl: "https://www.betocarrero.com.br/opcionais/fotos",
    externalProduct: false,
    mainVariant: {
      objectId: "foto-profissional-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Fotos+Profissionais",
      erpId: "SKU-BC-FPR-2024",
      name: "Sessão de Fotos Profissional",
      visible: true,
      price: 299.00,
      salePrice: 249.00,
      quantity: 300,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.5,
      variations: [
        {
          key: "Tipo",
          value: "Fotografia"
        },
        {
          key: "Duração",
          value: "30 Minutos"
        }
      ]
    },
    variants: [
      {
        objectId: "foto-profissional-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Fotos+Profissionais",
        erpId: "SKU-BC-FPR-2024",
        name: "Sessão de Fotos Profissional",
        visible: true,
        price: 299.00,
        salePrice: 249.00,
        quantity: 300,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.5,
        variations: [
          {
            key: "Tipo",
            value: "Fotografia"
          },
          {
            key: "Duração",
            value: "30 Minutos"
          }
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
    productDescription: "Tour guiado de 4 horas com especialista do parque incluindo história e curiosidades",
    externalUrl: "https://www.betocarrero.com.br/opcionais/tour",
    externalProduct: false,
    mainVariant: {
      objectId: "tour-guiado-1",
      externalImageURL: "https://via.placeholder.com/400x300?text=Tour+Guiado",
      erpId: "SKU-BC-TG-2024",
      name: "Tour Guiado Premium",
      visible: true,
      price: 349.00,
      salePrice: 299.00,
      quantity: 200,
      sellerId: "beto-carrero",
      sellerName: "Beto Carrero World",
      width: 10,
      height: 15,
      variantLength: 1,
      weight: 0.3,
      variations: [
        {
          key: "Tipo",
          value: "Tour"
        },
        {
          key: "Duração",
          value: "4 Horas"
        }
      ]
    },
    variants: [
      {
        objectId: "tour-guiado-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Tour+Guiado",
        erpId: "SKU-BC-TG-2024",
        name: "Tour Guiado Premium",
        visible: true,
        price: 349.00,
        salePrice: 299.00,
        quantity: 200,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 10,
        height: 15,
        variantLength: 1,
        weight: 0.3,
        variations: [
          {
            key: "Tipo",
            value: "Tour"
          },
          {
            key: "Duração",
            value: "4 Horas"
          }
        ]
      }
    ],
    sellOutOfStock: false,
    trackInventory: true
  }
];

// ==================== FUNÇÕES AUXILIARES ====================

function searchByText(query, products) {
  if (!query || query.trim() === '') {
    return products;
  }

  const lowerQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.productDescription.toLowerCase().includes(lowerQuery) ||
    p.mainVariant.name.toLowerCase().includes(lowerQuery)
  );
}

function searchById(id, products) {
  return products.filter(p => p.objectId === id);
}

function searchBySKU(sku, products) {
  return products.filter(p => p.mainVariant.erpId === sku);
}

function searchByURL(url, products) {
  return products.filter(p => p.externalUrl === url);
}

function searchByReference(reference, products) {
  return products.filter(p => p.mainVariant.erpId === reference);
}

// ==================== ROTAS ====================

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API Mockada Online - Beto Carrero' });
});

// Documentação da API
app.get('/', (req, res) => {
  res.json({
    name: 'API Mock - Beto Carrero World',
    version: '2.0.0',
    description: 'API agnóstica de Commerce conforme documentação OmniChat SearchProduct',
    endpoints: {
      search: 'GET /search',
      health: 'GET /health'
    },
    documentation: 'Conforme https://developers.omni.chat/docs/how-to-implement-the-searchproduct-api'
  });
});

// ========== SEARCH PRODUCT ENDPOINT (Conforme OmniChat API) ==========
app.get('/search', authenticateToken, (req, res) => {
  // Parâmetros conforme documentação OmniChat
  const query = req.query.query || '';
  const from = parseInt(req.query.from) || 0;
  const size = parseInt(req.query.size) || 10;
  const teamId = req.query.teamId;
  const userId = req.query.userId;
  const userEmail = req.query.userEmail;
  const integrationId = req.query.integrationId;
  const searchType = (req.query.searchType || 'TEXT').toUpperCase();

  let resultado = [];

  // Buscar conforme tipo
  switch (searchType) {
    case 'TEXT':
      resultado = searchByText(query, produtos);
      break;
    case 'ID':
      resultado = searchById(query, produtos);
      break;
    case 'SKUID':
      resultado = searchBySKU(query, produtos);
      break;
    case 'URL':
      resultado = searchByURL(query, produtos);
      break;
    case 'REFERENCE':
      resultado = searchByReference(query, produtos);
      break;
    default:
      resultado = searchByText(query, produtos);
  }

  // Aplicar paginação
  const paginados = resultado.slice(from, from + size);

  // Retornar resposta conforme documentação OmniChat
  res.json(paginados);
});

// ========== ENDPOINT ALTERNATIVO (compatibilidade) ==========
app.get('/products/search', authenticateToken, (req, res) => {
  // Compatibilidade com versão anterior
  const query = req.query.query || req.query.category || '';
  const from = parseInt(req.query.from) || 0;
  const size = parseInt(req.query.size) || 10;
  const searchType = (req.query.searchType || 'TEXT').toUpperCase();

  let resultado = [];

  switch (searchType) {
    case 'TEXT':
      resultado = searchByText(query, produtos);
      break;
    case 'ID':
      resultado = searchById(query, produtos);
      break;
    case 'SKUID':
      resultado = searchBySKU(query, produtos);
      break;
    default:
      resultado = searchByText(query, produtos);
  }

  const paginados = resultado.slice(from, from + size);

  res.json({
    products: paginados,
    pagination: {
      from,
      size: paginados.length,
      total: resultado.length,
      pages: Math.ceil(resultado.length / size)
    }
  });
});

// Buscar produto por ID (compatibilidade)
app.get('/products/:productId', authenticateToken, (req, res) => {
  const produto = produtos.find(p => p.objectId === req.params.productId);

  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.json(produto);
});

// ==================== PORTA ====================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Mock Beto Carrero (v2.0 - Conforme OmniChat SearchProduct API) rodando em http://localhost:${PORT}`);
  console.log(`📚 Acesse http://localhost:${PORT}/ para documentação`);
  console.log(`🔍 Endpoint principal: GET /search?query=...&searchType=TEXT|ID|SKUID|URL|REFERENCE`);
});