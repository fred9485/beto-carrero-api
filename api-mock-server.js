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

// ==================== FUNÇÕES DE DINÂMICA DE PREÇO ====================

// Feriados brasileiros fixos (mês-dia)
const feriadosBrasileiros = [
  '01-01', // Ano Novo
  '04-21', // Tiradentes
  '05-01', // Dia do Trabalho
  '09-07', // Independência
  '10-12', // Nossa Senhora Aparecida
  '11-02', // Finados
  '11-15', // Proclamação da República
  '11-20', // Consciência Negra
  '12-25'  // Natal
];

const ehFeriado = (data) => {
  const d = new Date(data + 'T00:00:00Z');
  const mes = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dia = String(d.getUTCDate()).padStart(2, '0');
  return feriadosBrasileiros.includes(`${mes}-${dia}`);
};

const ehFimDeSemana = (data) => {
  const d = new Date(data + 'T00:00:00Z');
  const diaSemana = d.getUTCDay(); // 0=domingo, 6=sábado
  return diaSemana === 0 || diaSemana === 6;
};

const calcularPrecosDinamicos = (precoBase, data) => {
  let preco = precoBase;
  let multiplier = 1;

  // Aumenta preço em fins de semana
  if (ehFimDeSemana(data)) {
    multiplier += 0.15; // +15% fim de semana
  }

  // Aumenta preço em feriados
  if (ehFeriado(data)) {
    multiplier += 0.20; // +20% feriado
  }

  // Mantém 2 casas decimais para compatibilidade
  preco = Math.round(preco * multiplier * 100) / 100;
  const salePrice = Math.round(preco * 0.85 * 100) / 100; // 15% desconto

  return {
    price: preco,
    salePrice: salePrice,
    discount: Math.round(((preco - salePrice) / preco) * 100)
  };
};

const calcularQuantidadeDisponivel = (quantidadeBase, data) => {
  let quantidade = quantidadeBase;

  // Reduz quantidade em fins de semana (maior demanda)
  if (ehFimDeSemana(data)) {
    quantidade = Math.floor(quantidade * 0.6); // 60% da quantidade
  }

  // Reduz ainda mais em feriados
  if (ehFeriado(data)) {
    quantidade = Math.floor(quantidade * 0.4); // 40% da quantidade
  }

  return Math.max(10, quantidade); // Mínimo de 10 unidades
};

// ==================== PRODUTOS BASE COM VARIANTES ESTRUTURADAS ====================

const produtosBase = [
  {
    objectId: "passport-gold-annual",
    name: "Passaporte Gold Anual",
    productDescription: "Acesso ilimitado ao parque por 12 meses consecutivos. Inclui estacionamento grátis, 4 vouchers para acompanhante e acesso prioritário a filas. Ideal para quem quer aproveitar o parque o ano todo.",
    externalUrl: "https://www2.betocarrero.com.br/passaportes/ouro-anual",
    externalProduct: false,
    variants: [
      {
        objectId: "passport-gold-annual-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Gold+Anual",
        erpId: "SKU-BC-PGA-2024",
        name: "Passaporte Gold Anual",
        visible: true,
        priceBase: 1890.00,
        quantityBase: 500,
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
    ]
  },
  {
    objectId: "passport-silver-annual",
    name: "Passaporte Silver Anual",
    productDescription: "Acesso ao parque por 12 meses com bloqueios em feriados prolongados. Inclui estacionamento parcial e 2 vouchers para acompanhante. Excelente opção para uso regular.",
    externalUrl: "https://www2.betocarrero.com.br/passaportes/prata-anual",
    externalProduct: false,
    variants: [
      {
        objectId: "passport-silver-annual-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Silver+Anual",
        erpId: "SKU-BC-PSA-2024",
        name: "Passaporte Silver Anual",
        visible: true,
        priceBase: 990.00,
        quantityBase: 800,
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
    ]
  },
  {
    objectId: "passport-gold-3days",
    name: "Passaporte Gold 3 Dias",
    productDescription: "Acesso ao parque por 3 dias consecutivos. Inclui estacionamento para todos os dias e acesso prioritário. Perfeito para férias curtas ou finais de semana prolongados.",
    externalUrl: "https://www2.betocarrero.com.br/passaportes/ouro-3dias",
    externalProduct: false,
    variants: [
      {
        objectId: "passport-gold-3days-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Gold+3+Dias",
        erpId: "SKU-BC-PG3-2024",
        name: "Passaporte Gold 3 Dias",
        visible: true,
        priceBase: 489.00,
        quantityBase: 1200,
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
    ]
  },
  {
    objectId: "passport-silver-3days",
    name: "Passaporte Silver 3 Dias",
    productDescription: "Acesso ao parque por 3 dias consecutivos. Inclui estacionamento e acesso básico. Ótima opção para visitantes ocasionais que desejam aproveitar vários dias.",
    externalUrl: "https://www2.betocarrero.com.br/passaportes/prata-3dias",
    externalProduct: false,
    variants: [
      {
        objectId: "passport-silver-3days-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Silver+3+Dias",
        erpId: "SKU-BC-PS3-2024",
        name: "Passaporte Silver 3 Dias",
        visible: true,
        priceBase: 289.00,
        quantityBase: 1500,
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
    ]
  },
  {
    objectId: "passport-1day",
    name: "Passaporte 1 Dia",
    productDescription: "Acesso ao parque por 1 dia inteiro. Inclui entrada e acesso a todas as atrações. Ideal para visitas rápidas ou para conhecer o parque antes de optar por passaporte anual.",
    externalUrl: "https://www2.betocarrero.com.br/passaportes/1dia",
    externalProduct: false,
    variants: [
      {
        objectId: "passport-1day-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+1+Dia",
        erpId: "SKU-BC-P1D-2024",
        name: "Passaporte 1 Dia",
        visible: true,
        priceBase: 179.00,
        quantityBase: 2000,
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
    ]
  },
  {
    objectId: "passport-weekend-gold",
    name: "Passaporte Weekend Gold",
    productDescription: "Acesso ao parque nos finais de semana (sábado e domingo). Inclui estacionamento e acesso prioritário. Perfeito para quem quer aproveitar os finais de semana do ano todo.",
    externalUrl: "https://www2.betocarrero.com.br/passaportes/weekend-gold",
    externalProduct: false,
    variants: [
      {
        objectId: "passport-weekend-gold-1",
        externalImageURL: "https://via.placeholder.com/400x300?text=Passaporte+Weekend+Gold",
        erpId: "SKU-BC-PWG-2024",
        name: "Passaporte Weekend Gold",
        visible: true,
        priceBase: 599.00,
        quantityBase: 600,
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
    ]
  },
  {
    objectId: "fast-pass",
    name: "Fast Pass - Pula Fila",
    productDescription: "Acesso prioritário a atrações principais do parque. Pule filas e aproveite mais o seu dia. Disponível em diferentes opções (Silver 5 atrações ou Gold 10 atrações).",
    externalUrl: "https://www2.betocarrero.com.br/opcionais/fast-pass",
    externalProduct: false,
    variants: [
      {
        objectId: "fast-pass-silver",
        externalImageURL: "https://via.placeholder.com/400x300?text=Fast+Pass+Silver",
        erpId: "SKU-BC-FPS-2024",
        name: "Fast Pass Silver (5 Atrações)",
        visible: true,
        priceBase: 199.99,
        quantityBase: 400,
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
        priceBase: 349.99,
        quantityBase: 250,
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
    ]
  },
  {
    objectId: "foto-profissional",
    name: "Sessão de Fotos Profissional",
    productDescription: "Sessão de fotos profissional com fotógrafo dedicado em locais estratégicos do parque. Escolha entre diferentes pacotes de duração e número de fotos.",
    externalUrl: "https://www2.betocarrero.com.br/opcionais/fotos-profissionais",
    externalProduct: false,
    variants: [
      {
        objectId: "foto-prof-30min",
        externalImageURL: "https://via.placeholder.com/400x300?text=Fotos+30min",
        erpId: "SKU-BC-FP30-2024",
        name: "Sessão 30 Minutos (30 fotos)",
        visible: true,
        priceBase: 249.99,
        quantityBase: 150,
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
        priceBase: 429.99,
        quantityBase: 100,
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
    ]
  },
  {
    objectId: "tour-guiado",
    name: "Tour Guiado Premium",
    productDescription: "Tour guiado com especialista do parque. Conheça a história e curiosidades do Beto Carrero com um guia experiente. Disponível em 2 ou 4 horas.",
    externalUrl: "https://www2.betocarrero.com.br/opcionais/tour-guiado",
    externalProduct: false,
    variants: [
      {
        objectId: "tour-2horas",
        externalImageURL: "https://via.placeholder.com/400x300?text=Tour+2h",
        erpId: "SKU-BC-TG2-2024",
        name: "Tour Guiado 2 Horas",
        visible: true,
        priceBase: 199.99,
        quantityBase: 80,
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
        priceBase: 299.99,
        quantityBase: 50,
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
    ]
  }
];

// ==================== FUNÇÃO PARA GERAR PRODUTOS COM PREÇO DINÂMICO ====================

const gerarProdutosComPreco = (visitDate) => {
  return produtosBase.map(produto => {
    // Mapeia cada variante com dinâmica de preço e quantidade
    const variantsComPreco = produto.variants.map(variant => {
      const precos = calcularPrecosDinamicos(variant.priceBase, visitDate);
      const quantidade = calcularQuantidadeDisponivel(variant.quantityBase, visitDate);

      return {
        objectId: variant.objectId,
        externalImageURL: variant.externalImageURL,
        erpId: variant.erpId,
        name: variant.name,
        visible: variant.visible,
        price: precos.price,
        salePrice: precos.salePrice,
        quantity: quantidade,
        sellerId: variant.sellerId,
        sellerName: variant.sellerName,
        width: variant.width,
        height: variant.height,
        variantLength: variant.variantLength,
        weight: variant.weight,
        variations: variant.variations
      };
    });

    return {
      blocked: false,
      objectId: produto.objectId,
      name: produto.name,
      productDescription: produto.productDescription,
      externalUrl: produto.externalUrl,
      externalProduct: produto.externalProduct,
      mainVariant: variantsComPreco[0], // mainVariant é idêntico à primeira variante
      variants: variantsComPreco, // Array com todas as variantes com preços dinâmicos
      sellOutOfStock: false,
      trackInventory: true
    };
  });
};

// ==================== FUNÇÕES DE BUSCA ====================

const searchByText = (query, produtos) => {
  if (!query) return produtos;
  const q = query.toLowerCase();
  return produtos.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.productDescription.toLowerCase().includes(q) ||
    p.objectId.toLowerCase().includes(q)
  );
};

const searchById = (query, produtos) => {
  return produtos.filter(p => p.objectId === query);
};

// ==================== ENDPOINTS ====================

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '4.0-corrigido',
    timestamp: new Date().toISOString(),
    message: 'API Mock Beto Carrero - OmniChat SearchProduct API com Preço Dinâmico',
    features: [
      'Resposta em array direto (sem wrappers)',
      'Preço dinâmico baseado em visitDate',
      'Aumento de 15% em fins de semana',
      'Aumento de 20% em feriados',
      'Variantes com preços e erpIds independentes',
      'Quantidade dinâmica conforme demanda'
    ]
  });
});

app.get('/', (req, res) => {
  res.json({
    name: 'API Mock Beto Carrero World',
    version: '4.0-corrigido',
    specification: 'OmniChat SearchProduct API com Dinâmica de Preço',
    documentation: 'https://developers.omni.chat/docs/how-to-implement-the-searchproduct-api',
    features: {
      visitDate: 'Parâmetro YYYY-MM-DD para calcular preços dinâmicos',
      arrayDireto: 'Resposta é um array direto de produtos',
      dinamicPrice: 'Preço aumenta em fins de semana e feriados',
      dinamicQuantity: 'Quantidade diminui em períodos de alta demanda',
      variants: 'Cada variante tem seus próprios preço, erpId, imagem e quantidade'
    },
    endpoints: {
      health: 'GET /health',
      search: 'GET /search?visitDate=YYYY-MM-DD&query=...'
    }
  });
});

// ========== SEARCH PRODUCT ENDPOINT (Conforme OmniChat API) ==========
app.get('/search', authenticateToken, (req, res) => {
  const visitDate = req.query.visitDate;

  if (!visitDate || !/^\d{4}-\d{2}-\d{2}$/.test(visitDate)) {
    return res.status(400).json({
      error: 'Parâmetro visitDate obrigatório no formato YYYY-MM-DD',
      example: '/search?visitDate=2026-08-27'
    });
  }

  const query = req.query.query || '';
  const from = parseInt(req.query.from) || 0;
  const size = parseInt(req.query.size) || 10;
  const searchType = (req.query.searchType || 'TEXT').toUpperCase();

  // Gera produtos com preços dinâmicos baseado na data de visita
  const produtosComPreco = gerarProdutosComPreco(visitDate);

  let resultado = [];

  switch (searchType) {
    case 'TEXT':
      resultado = searchByText(query, produtosComPreco);
      break;
    case 'ID':
      resultado = searchById(query, produtosComPreco);
      break;
    default:
      resultado = searchByText(query, produtosComPreco);
  }

  // Sem filtro, retorna todos
  if (!query) {
    resultado = produtosComPreco;
  }

  const paginados = resultado.slice(from, from + size);

  // Retorna array direto (sem "products" wrapper, sem "pagination")
  res.json(paginados);
});

// ========== ENDPOINT ALTERNATIVO (compatibilidade) ==========
app.get('/products/search', authenticateToken, (req, res) => {
  const visitDate = req.query.visitDate;

  if (!visitDate || !/^\d{4}-\d{2}-\d{2}$/.test(visitDate)) {
    return res.status(400).json({
      error: 'Parâmetro visitDate obrigatório no formato YYYY-MM-DD',
      example: '/products/search?visitDate=2026-08-27'
    });
  }

  const query = req.query.query || '';
  const from = parseInt(req.query.from) || 0;
  const size = parseInt(req.query.size) || 10;

  const produtosComPreco = gerarProdutosComPreco(visitDate);

  let resultado = [];

  if (!query) {
    resultado = produtosComPreco;
  } else {
    resultado = searchByText(query, produtosComPreco);
  }

  const paginados = resultado.slice(from, from + size);

  res.json(paginados);
});

// Buscar produto por ID
app.get('/products/:productId', authenticateToken, (req, res) => {
  const visitDate = req.query.visitDate || new Date().toISOString().split('T')[0];

  const produtosComPreco = gerarProdutosComPreco(visitDate);
  const produto = produtosComPreco.find(p => p.objectId === req.params.productId);

  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.json(produto);
});

// ==================== PORTA ====================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Mock Beto Carrero (v4.0-corrigido - Preço Dinâmico com Variantes)`);
  console.log(`📡 Porta: ${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/health`);
  console.log(`🔍 Busca com visitDate: http://localhost:${PORT}/search?visitDate=2026-08-27`);
  console.log(`📅 Preço aumenta 15% em fins de semana e 20% em feriados`);
  console.log(`💾 Cada variante tem seus próprios preço, erpId, imagem e quantidade`);
});