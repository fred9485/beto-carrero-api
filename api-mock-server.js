const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock JWT Token
const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZXRvY2FycmVyb19yZXRhaWxlciIsImlhdCI6MTcyNDEwMDAwMH0.abc123xyz";

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

const passaportes = [
  {
    id: "passport-gold-annual",
    name: "Passaporte Gold Anual",
    sku: "SKU-BC-PGA-2024",
    reference: "ref_gold_annual_2024",
    category: "passaportes",
    subcategory: "anuais",
    description: "Acesso ilimitado ao parque por 12 meses consecutivos com estacionamento incluso e 4 vouchers para acompanhante",
    image: "https://via.placeholder.com/400x300?text=Passaporte+Gold",
    benefits: [
      "Acesso ilimitado ao parque",
      "Estacionamento grátis",
      "4 vouchers para acompanhante",
      "Prioridade em filas",
      "15% de desconto em loja",
      "Acesso VIP a eventos especiais"
    ],
    attributes: {
      validity_months: 12,
      includes_parking: true,
      guest_vouchers: 4,
      blackout_dates: false,
      priority_queue: true,
      discount_percentage: 15
    },
    price: {
      currency: "BRL",
      original_price: 1890.00,
      sale_price: 1490.00,
      discount_percentage: 21.16
    },
    availability: {
      in_stock: true,
      quantity: 1000
    },
    url: "https://www2.betocarrero.com.br/passaportes/ouro-anual"
  },
  {
    id: "passport-silver-annual",
    name: "Passaporte Silver Anual",
    sku: "SKU-BC-PSA-2024",
    reference: "ref_silver_annual_2024",
    category: "passaportes",
    subcategory: "anuais",
    description: "Acesso ilimitado ao parque por 12 meses com bloqueios em feriados prolongados",
    image: "https://via.placeholder.com/400x300?text=Passaporte+Silver",
    benefits: [
      "Acesso ilimitado ao parque",
      "10% de desconto em loja",
      "Acesso a eventos regulares"
    ],
    attributes: {
      validity_months: 12,
      includes_parking: false,
      guest_vouchers: 0,
      blackout_dates: true,
      priority_queue: false,
      discount_percentage: 10
    },
    price: {
      currency: "BRL",
      original_price: 990.00,
      sale_price: 890.00,
      discount_percentage: 10.10
    },
    availability: {
      in_stock: true,
      quantity: 1500
    },
    url: "https://www2.betocarrero.com.br/passaportes/prata-anual"
  },
  {
    id: "passport-gold-3days",
    name: "Passaporte Gold 3 Dias",
    sku: "SKU-BC-PG3D-2024",
    reference: "ref_gold_3days_2024",
    category: "passaportes",
    subcategory: "temporarios",
    description: "Acesso ao parque por 3 dias consecutivos com estacionamento grátis e acesso VIP",
    image: "https://via.placeholder.com/400x300?text=Passaporte+Gold+3+Dias",
    benefits: [
      "Acesso por 3 dias consecutivos",
      "Estacionamento grátis",
      "2 vouchers para acompanhante",
      "Prioridade em filas",
      "Acesso VIP a atrações principais"
    ],
    attributes: {
      validity_days: 3,
      includes_parking: true,
      guest_vouchers: 2,
      blackout_dates: false,
      priority_queue: true,
      vip_access: true
    },
    price: {
      currency: "BRL",
      original_price: 489.00,
      sale_price: 429.00,
      discount_percentage: 12.27
    },
    availability: {
      in_stock: true,
      quantity: 800
    },
    url: "https://www2.betocarrero.com.br/passaportes/ouro-3dias"
  },
  {
    id: "passport-silver-3days",
    name: "Passaporte Silver 3 Dias",
    sku: "SKU-BC-PS3D-2024",
    reference: "ref_silver_3days_2024",
    category: "passaportes",
    subcategory: "temporarios",
    description: "Acesso ao parque por 3 dias consecutivos. Ideal para conhecer as principais atrações",
    image: "https://via.placeholder.com/400x300?text=Passaporte+Silver+3+Dias",
    benefits: [
      "Acesso por 3 dias consecutivos",
      "Acesso a todas as atrações",
      "Área de alimentação incluída"
    ],
    attributes: {
      validity_days: 3,
      includes_parking: false,
      guest_vouchers: 0,
      blackout_dates: true,
      priority_queue: false,
      vip_access: false
    },
    price: {
      currency: "BRL",
      original_price: 289.00,
      sale_price: 249.00,
      discount_percentage: 13.84
    },
    availability: {
      in_stock: true,
      quantity: 1200
    },
    url: "https://www2.betocarrero.com.br/passaportes/prata-3dias"
  },
  {
    id: "passport-1day",
    name: "Passaporte 1 Dia",
    sku: "SKU-BC-P1D-2024",
    reference: "ref_1day_2024",
    category: "passaportes",
    subcategory: "temporarios",
    description: "Acesso por 1 dia ao parque com acesso às principais atrações e áreas de alimentação",
    image: "https://via.placeholder.com/400x300?text=Passaporte+1+Dia",
    benefits: [
      "Acesso por 1 dia",
      "Acesso a todas as atrações",
      "Áreas de alimentação inclusas"
    ],
    attributes: {
      validity_days: 1,
      includes_parking: false,
      guest_vouchers: 0,
      blackout_dates: false,
      priority_queue: false,
      vip_access: false
    },
    price: {
      currency: "BRL",
      original_price: 179.00,
      sale_price: 149.00,
      discount_percentage: 16.76
    },
    availability: {
      in_stock: true,
      quantity: 2000
    },
    url: "https://www2.betocarrero.com.br/passaportes/1dia"
  },
  {
    id: "passport-weekend-gold",
    name: "Passaporte Weekend Gold",
    sku: "SKU-BC-PWG-2024",
    reference: "ref_weekend_gold_2024",
    category: "passaportes",
    subcategory: "temporarios",
    description: "Acesso ilimitado aos sábados e domingos por 3 meses com estacionamento",
    image: "https://via.placeholder.com/400x300?text=Weekend+Gold",
    benefits: [
      "Acesso aos finais de semana",
      "Válido por 3 meses",
      "Estacionamento grátis",
      "Prioridade em filas",
      "1 voucher para acompanhante"
    ],
    attributes: {
      validity_days: 90,
      includes_parking: true,
      guest_vouchers: 1,
      blackout_dates: false,
      priority_queue: true,
      vip_access: false
    },
    price: {
      currency: "BRL",
      original_price: 599.00,
      sale_price: 499.00,
      discount_percentage: 16.69
    },
    availability: {
      in_stock: true,
      quantity: 500
    },
    url: "https://www2.betocarrero.com.br/passaportes/weekend-gold"
  }
];

const opcionais = [
  {
    id: "foto-profissional",
    name: "Sessão de Fotos Profissional",
    sku: "SKU-BC-FP-2024",
    category: "opcionais",
    subcategory: "fotografias",
    description: "Sessão de fotos profissional em locais estratégicos do parque com fotógrafo dedicado",
    image: "https://via.placeholder.com/400x300?text=Fotos+Profissionais",
    benefits: [
      "Fotógrafo profissional",
      "30 minutos de sessão",
      "Locais premium selecionados",
      "100 fotos digitais",
      "Álbum impresso incluído"
    ],
    price: {
      currency: "BRL",
      original_price: 299.00,
      sale_price: 249.00,
      discount_percentage: 16.72
    },
    availability: {
      in_stock: true,
      quantity: 300
    }
  },
  {
    id: "fast-pass",
    name: "Fast Pass - Pula Fila",
    sku: "SKU-BC-FP-2024",
    category: "opcionais",
    subcategory: "acessos",
    description: "Acesso prioritário às 10 atrações mais procuradas do parque",
    image: "https://via.placeholder.com/400x300?text=Fast+Pass",
    benefits: [
      "Prioridade nas 10 atrações top",
      "Válido por 1 dia",
      "Pulseira identificadora",
      "Economiza até 3 horas de fila"
    ],
    price: {
      currency: "BRL",
      original_price: 189.00,
      sale_price: 159.00,
      discount_percentage: 15.87
    },
    availability: {
      in_stock: true,
      quantity: 600
    }
  },
  {
    id: "estacionamento-diario",
    name: "Estacionamento Diário",
    sku: "SKU-BC-ED-2024",
    category: "opcionais",
    subcategory: "estacionamento",
    description: "Estacionamento em área coberta com segurança 24h próximo à entrada principal",
    image: "https://via.placeholder.com/400x300?text=Estacionamento",
    benefits: [
      "Área coberta",
      "Segurança 24 horas",
      "Próximo à entrada",
      "Acesso rápido"
    ],
    price: {
      currency: "BRL",
      original_price: 39.90,
      sale_price: 34.90,
      discount_percentage: 12.53
    },
    availability: {
      in_stock: true,
      quantity: 1000
    }
  },
  {
    id: "voucher-alimentacao",
    name: "Voucher Alimentação Premium",
    sku: "SKU-BC-VA-2024",
    category: "opcionais",
    subcategory: "alimentacao",
    description: "Crédito de R$ 200 para gastar em restaurantes e lanchonetes do parque",
    image: "https://via.placeholder.com/400x300?text=Voucher+Alimentacao",
    benefits: [
      "R$ 200 em crédito",
      "Válido em todos os restaurantes",
      "Sem vencimento durante o ano",
      "Não é transferível"
    ],
    price: {
      currency: "BRL",
      original_price: 200.00,
      sale_price: 179.00,
      discount_percentage: 10.50
    },
    availability: {
      in_stock: true,
      quantity: 800
    }
  },
  {
    id: "welcome-package",
    name: "Welcome Package Vip",
    sku: "SKU-BC-WP-2024",
    category: "opcionais",
    subcategory: "pacotes",
    description: "Pacote completo com brinde, mapa, guia e welcome drink",
    image: "https://via.placeholder.com/400x300?text=Welcome+Package",
    benefits: [
      "Brinde exclusivo",
      "Mapa do parque",
      "Guia de atrações",
      "Welcome drink grátis",
      "Sacochila personalizada"
    ],
    price: {
      currency: "BRL",
      original_price: 89.90,
      sale_price: 74.90,
      discount_percentage: 16.80
    },
    availability: {
      in_stock: true,
      quantity: 400
    }
  },
  {
    id: "tour-guiado",
    name: "Tour Guiado Premium",
    sku: "SKU-BC-TG-2024",
    category: "opcionais",
    subcategory: "tours",
    description: "Tour guiado de 4 horas com especialista do parque incluindo história e curiosidades",
    image: "https://via.placeholder.com/400x300?text=Tour+Guiado",
    benefits: [
      "Guia especializado",
      "4 horas de duração",
      "Histórico das atrações",
      "Bastidores de algumas atrações",
      "Lanche incluído"
    ],
    price: {
      currency: "BRL",
      original_price: 349.00,
      sale_price: 299.00,
      discount_percentage: 14.33
    },
    availability: {
      in_stock: true,
      quantity: 200
    }
  },
  {
    id: "seguro-cancelamento",
    name: "Seguro Cancelamento",
    sku: "SKU-BC-SC-2024",
    category: "opcionais",
    subcategory: "seguros",
    description: "Proteção contra cancelamento de visita por motivos de saúde",
    image: "https://via.placeholder.com/400x300?text=Seguro",
    benefits: [
      "Reembolso 100% em caso de cancelamento",
      "Válido por 30 dias",
      "Sem carência",
      "Cobertura até R$ 2.000"
    ],
    price: {
      currency: "BRL",
      original_price: 69.90,
      sale_price: 59.90,
      discount_percentage: 14.34
    },
    availability: {
      in_stock: true,
      quantity: 1000
    }
  },
  {
    id: "kit-memorabilia",
    name: "Kit Memorabilia Exclusivo",
    sku: "SKU-BC-KM-2024",
    category: "opcionais",
    subcategory: "souvenirs",
    description: "Kit especial com camiseta, boné, caneca e chaveiro exclusivos do parque",
    image: "https://via.placeholder.com/400x300?text=Kit+Memorabilia",
    benefits: [
      "Camiseta exclusiva",
      "Boné personalizado",
      "Caneca do parque",
      "Chaveiro colecionável",
      "Sacola exclusiva"
    ],
    price: {
      currency: "BRL",
      original_price: 149.90,
      sale_price: 119.90,
      discount_percentage: 19.99
    },
    availability: {
      in_stock: true,
      quantity: 500
    }
  }
];

// Combina todos os produtos
const todosOsProdutos = [...passaportes, ...opcionais];

// ==================== ROTAS ====================

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API Mockada Online - Beto Carrero' });
});

// Informação da API
app.get('/', (req, res) => {
  res.json({
    name: 'API Mock - Beto Carrero World',
    version: '1.0.0',
    description: 'API agnóstica de Commerce para testes de agentes conversacionais',
    endpoints: {
      auth: 'POST /auth/token',
      products: 'GET /products/search',
      product_detail: 'GET /products/{id}',
      prices: 'GET /prices/{id}',
      carts: 'POST /carts',
      orders: 'POST /orders',
      order_status: 'GET /orders/{id}',
      freight: 'POST /freight/quote'
    },
    headers_required: {
      'Authorization': 'Bearer token',
      'Content-Type': 'application/json',
      'X-Retailer-ID': 'beto-carrero-001'
    }
  });
});

// ========== AUTENTICAÇÃO ==========
app.post('/auth/token', (req, res) => {
  res.json({
    access_token: mockToken,
    token_type: 'Bearer',
    expires_in: 3600,
    scope: 'products:read orders:write'
  });
});

// ========== PRODUTOS ==========

// Listar todos os produtos com filtro
app.get('/products/search', authenticateToken, (req, res) => {
  const from = parseInt(req.query.from) || 0;
  const size = Math.min(parseInt(req.query.size) || 50, 50);
  const category = req.query.category || null;

  let filtrados = todosOsProdutos;
  if (category) {
    filtrados = todosOsProdutos.filter(p => p.category === category);
  }

  const paginados = filtrados.slice(from, from + size);

  res.json({
    products: paginados,
    pagination: {
      from,
      size: paginados.length,
      total: filtrados.length,
      pages: Math.ceil(filtrados.length / size)
    }
  });
});

// Buscar produto por ID
app.get('/products/:productId', authenticateToken, (req, res) => {
  const produto = todosOsProdutos.find(p => p.id === req.params.productId);

  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.json(produto);
});

// Buscar por SKU
app.get('/products/search/sku/:sku', authenticateToken, (req, res) => {
  const produto = todosOsProdutos.find(p => p.sku === req.params.sku);

  if (!produto) {
    return res.status(404).json({ error: 'SKU não encontrado' });
  }

  res.json(produto);
});

// Buscar por categoria
app.get('/categories/:category', authenticateToken, (req, res) => {
  const produtos = todosOsProdutos.filter(p => p.category === req.params.category);
  res.json({
    category: req.params.category,
    products: produtos,
    total: produtos.length
  });
});

// ========== PREÇOS ==========

app.get('/prices/:variantId', authenticateToken, (req, res) => {
  const produto = todosOsProdutos.find(p => p.id === req.params.variantId);

  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.json({
    variant_id: req.params.variantId,
    sku: produto.sku,
    prices: [{
      currency: produto.price.currency,
      original_price: produto.price.original_price,
      sale_price: produto.price.sale_price,
      discount_percentage: produto.price.discount_percentage,
      valid_from: new Date().toISOString(),
      valid_until: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
    }],
    last_updated: new Date().toISOString()
  });
});

app.post('/prices/:variantId', authenticateToken, (req, res) => {
  const produto = todosOsProdutos.find(p => p.id === req.params.variantId);

  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.json({
    variant_id: req.params.variantId,
    message: 'Preço atualizado com sucesso',
    updated_price: {
      currency: req.body.currency || 'BRL',
      original_price: req.body.original_price,
      sale_price: req.body.sale_price,
      discount_percentage: (((req.body.original_price - req.body.sale_price) / req.body.original_price) * 100).toFixed(2),
      valid_from: req.body.valid_from,
      valid_until: req.body.valid_until
    },
    timestamp: new Date().toISOString()
  });
});

// ========== CARRINHO ==========

app.post('/carts', authenticateToken, (req, res) => {
  const { contact_id, items, coupon_code } = req.body;

  let subtotal = 0;
  let itemsProcessados = [];

  items.forEach(item => {
    const produto = todosOsProdutos.find(p => p.id === item.product_id);
    if (produto) {
      const total = produto.price.sale_price * (item.quantity || 1);
      subtotal += total;
      itemsProcessados.push({
        product_id: item.product_id,
        sku: produto.sku,
        name: produto.name,
        quantity: item.quantity || 1,
        unit_price: produto.price.sale_price,
        subtotal: total
      });
    }
  });

  let discount = 0;
  if (coupon_code === 'BETO10') {
    discount = subtotal * 0.10;
  } else if (coupon_code === 'BETO20') {
    discount = subtotal * 0.20;
  }

  const total = subtotal - discount;

  res.status(201).json({
    cart_id: 'cart_' + Math.random().toString(36).substr(2, 9),
    contact_id,
    items: itemsProcessados,
    subtotal,
    discount: {
      coupon: coupon_code,
      amount: discount,
      percentage: discount > 0 ? ((discount / subtotal) * 100).toFixed(2) : 0
    },
    total,
    currency: 'BRL',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  });
});

// ========== PEDIDOS ==========

app.post('/orders', authenticateToken, (req, res) => {
  const { contact_id, items, customer, delivery_address } = req.body;

  let subtotal = 0;
  let itemsProcessados = [];

  items.forEach(item => {
    const produto = todosOsProdutos.find(p => p.id === item.product_id);
    if (produto) {
      const total = produto.price.sale_price * (item.quantity || 1);
      subtotal += total;
      itemsProcessados.push({
        product_id: item.product_id,
        sku: produto.sku,
        name: produto.name,
        quantity: item.quantity || 1,
        unit_price: produto.price.sale_price,
        subtotal: total
      });
    }
  });

  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  res.status(201).json({
    order_id: 'order_' + Date.now(),
    order_number: `BC-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
    contact_id,
    status: 'pending_confirmation',
    items: itemsProcessados,
    customer: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    },
    delivery_address,
    totals: {
      subtotal,
      shipping: 0,
      discount: 0,
      tax,
      total
    },
    currency: 'BRL',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    next_action: 'payment_confirmation'
  });
});

app.get('/orders/:orderId', authenticateToken, (req, res) => {
  res.json({
    order_id: req.params.orderId,
    status: 'confirmed',
    status_history: [
      {
        status: 'pending_confirmation',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        notes: 'Pedido criado'
      },
      {
        status: 'payment_confirmed',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        notes: 'Pagamento aprovado'
      },
      {
        status: 'confirmed',
        timestamp: new Date().toISOString(),
        notes: 'Pedido confirmado'
      }
    ],
    payment_status: 'approved',
    fulfillment_status: 'pending',
    last_updated: new Date().toISOString()
  });
});

app.delete('/orders/:orderId', authenticateToken, (req, res) => {
  res.json({
    order_id: req.params.orderId,
    status: 'cancelled',
    cancellation_reason: req.body.reason || 'customer_request',
    refund_status: 'processing',
    refund_amount: Math.random() * 2000,
    currency: 'BRL',
    cancelled_at: new Date().toISOString()
  });
});

// ========== LOGÍSTICA ==========

app.post('/freight/quote', authenticateToken, (req, res) => {
  res.json({
    quote_id: 'quote_' + Math.random().toString(36).substr(2, 9),
    origin: req.body.origin,
    destination: req.body.destination,
    shipping_options: [
      {
        method: 'normal',
        carrier: 'Correios',
        estimated_days: 10,
        price: 35.50,
        currency: 'BRL'
      },
      {
        method: 'express',
        carrier: 'Sedex',
        estimated_days: 3,
        price: 89.90,
        currency: 'BRL'
      },
      {
        method: 'local_pickup',
        carrier: 'Retirada na Sede',
        estimated_days: 0,
        price: 0.00,
        currency: 'BRL'
      }
    ],
    valid_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  });
});

// ==================== PORTA ====================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Mock Beto Carrero rodando em http://localhost:${PORT}`);
  console.log(`📚 Acesse http://localhost:${PORT}/ para documentação`);
});