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

// ==================== ÚNICO PRODUTO ====================

const produtos = [
  {
    blocked: false,
    objectId: "fast-pass",
    name: "Fast Pass - Pula Fila",
    productDescription: "Acesso prioritário a atrações principais do parque. Pule filas e aproveite mais o seu dia. Disponível em diferentes níveis de acesso.",
    externalUrl: "https://www2.betocarrero.com.br/opcionais/fast-pass",
    externalProduct: false,
    mainVariant: {
      objectId: "fast-pass-silver",
      externalImageURL: "https://via.placeholder.com/400x300?text=Fast+Pass+Silver",
      erpId: "SKU-BC-FPS-2024-V1",
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
        erpId: "SKU-BC-FPS-2024-V1",
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
        erpId: "SKU-BC-FPG-2024-V1",
        name: "Fast Pass Gold (10 Atrações)",
        visible: true,
        price: 349.99,
        salePrice: 299.99,
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
      },
      {
        objectId: "fast-pass-platinum",
        externalImageURL: "https://via.placeholder.com/400x300?text=Fast+Pass+Platinum",
        erpId: "SKU-BC-FPP-2024-V1",
        name: "Fast Pass Platinum (20 Atrações)",
        visible: true,
        price: 449.99,
        salePrice: 449.99,
        quantity: 0,
        sellerId: "beto-carrero",
        sellerName: "Beto Carrero World",
        width: 5,
        height: 10,
        variantLength: 0.5,
        weight: 0.1,
        variations: [
          { key: "Tipo", value: "Platinum" },
          { key: "Atrações", value: "20 Principais" }
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
    version: '6.0-radical',
    timestamp: new Date().toISOString(),
    message: 'API Mock Beto Carrero - 1 Produto Apenas',
    totalProducts: 1
  });
});

app.get('/', (req, res) => {
  res.json({
    name: 'API Mock Beto Carrero World',
    version: '6.0-radical',
    specification: 'OmniChat SearchProduct API - 1 Produto Apenas',
    totalProducts: 1,
    endpoints: {
      health: 'GET /health',
      search: 'GET /search',
      product: 'GET /products/fast-pass'
    }
  });
});

app.get('/search', authenticateToken, (req, res) => {
  res.json(produtos);
});

app.get('/products/search', authenticateToken, (req, res) => {
  res.json(produtos);
});

app.get('/products/:productId', authenticateToken, (req, res) => {
  const produto = produtos.find(p => p.objectId === req.params.productId);

  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.json(produto);
});

app.get('/products', authenticateToken, (req, res) => {
  res.json(produtos);
});

// ==================== PORTA ====================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Mock Beto Carrero (v6.0-radical - 1 Produto Apenas)`);
  console.log(`📡 Porta: ${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/health`);
  console.log(`🔍 Search: http://localhost:${PORT}/search`);
  console.log(`📦 Produto: Fast Pass - 3 Variantes`);
});