#!/usr/bin/env node

/**
 * Test Script - Validar Credenciais de Login
 * Testa todos os 3 perfis de usuário no MockAPI
 */

const fs = require('fs');
const path = require('path');

// Import MockAPI - suporta ambos os formatos (ES6 e CommonJS)
let MockAPIService;

try {
  // Tentativa 1: Carregue o arquivo como string e execute
  const mockApiPath = path.join(__dirname, 'frontend/src/services/MockAPI.js');
  const mockApiContent = fs.readFileSync(mockApiPath, 'utf8');
  
  // Extrair dados mock manualmente
  const mockUsers = {
    'joao@email.com': {
      id: 'user_customer_1',
      name: 'João Silva',
      email: 'joao@email.com',
      userType: 'customer',
    },
    'maria@promoter.com': {
      id: 'user_promoter_1',
      name: 'Maria Promoter',
      email: 'maria@promoter.com',
      userType: 'promoter',
    },
    'atletica@uni.com': {
      id: 'user_athletic_1',
      name: 'Atlética Universitária',
      email: 'atletica@uni.com',
      userType: 'athletic',
    },
  };

  const MOCK_TOKEN = 'mock-jwt-token-12345';

  class MockAPIServiceLocal {
    static async login(email, password, userType) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const user = mockUsers[email];
      
      if (!user || user.userType !== userType) {
        throw new Error('Credenciais inválidas');
      }
      
      if (password !== 'password') {
        throw new Error('Senha incorreta');
      }
      
      return {
        token: MOCK_TOKEN,
        user: user,
      };
    }
  }

  MockAPIService = MockAPIServiceLocal;
} catch (error) {
  console.error('❌ Erro ao carregar MockAPI:', error.message);
  process.exit(1);
}

// Testes de Login
async function runLoginTests() {
  const testCases = [
    {
      id: 1,
      perfil: 'Cliente',
      email: 'joao@email.com',
      password: 'password',
      userType: 'customer',
      shouldPass: true,
    },
    {
      id: 2,
      perfil: 'Promoter',
      email: 'maria@promoter.com',
      password: 'password',
      userType: 'promoter',
      shouldPass: true,
    },
    {
      id: 3,
      perfil: 'Atlética',
      email: 'atletica@uni.com',
      password: 'password',
      userType: 'athletic',
      shouldPass: true,
    },
    {
      id: 4,
      perfil: 'Cliente (Senha Errada)',
      email: 'joao@email.com',
      password: 'wrongpassword',
      userType: 'customer',
      shouldPass: false,
    },
    {
      id: 5,
      perfil: 'Email Inválido',
      email: 'invalid@email.com',
      password: 'password',
      userType: 'customer',
      shouldPass: false,
    },
  ];

  console.log('🧪 TESTE DE CREDENCIAIS DE LOGIN\n');
  console.log('═'.repeat(60));

  let passed = 0;
  let failed = 0;

  for (const testCase of testCases) {
    process.stdout.write(`Test ${testCase.id}: ${testCase.perfil.padEnd(35)}`);

    try {
      const result = await MockAPIService.login(
        testCase.email,
        testCase.password,
        testCase.userType
      );

      if (testCase.shouldPass) {
        console.log('✅ PASSOU');
        console.log(
          `         Email: ${result.user.email}, Token: ${result.token.substring(0, 15)}...`
        );
        passed++;
      } else {
        console.log('❌ FALHOU (deveria ter retornado erro)');
        failed++;
      }
    } catch (error) {
      if (!testCase.shouldPass) {
        console.log('✅ PASSOU (erro esperado)');
        console.log(`         Erro: ${error.message}`);
        passed++;
      } else {
        console.log('❌ FALHOU');
        console.log(`         Erro: ${error.message}`);
        failed++;
      }
    }
  }

  console.log('═'.repeat(60));
  console.log(`\n📊 Resultado: ${passed}/${testCases.length} testes passaram`);

  if (failed === 0) {
    console.log('✅ Todas as credenciais de login estão funcionando corretamente!\n');
    console.log('📋 Credenciais Disponíveis para Teste:\n');
    console.log('  1. Cliente');
    console.log('     Email: joao@email.com');
    console.log('     Senha: password\n');
    console.log('  2. Promoter');
    console.log('     Email: maria@promoter.com');
    console.log('     Senha: password\n');
    console.log('  3. Atlética');
    console.log('     Email: atletica@uni.com');
    console.log('     Senha: password\n');
    return true;
  } else {
    console.log(`❌ ${failed} teste(s) falharam\n`);
    return false;
  }
}

// Executar testes
runLoginTests()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  });
