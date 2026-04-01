#!/bin/bash

################################################################################
# 🔧 GitHub Pages - Script de Configuração Automática
################################################################################

cat << 'EOF'

╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║           🚀 GitHub Pages - Configuração Automática Disponível           ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝

STATUS ATUAL:
═════════════════════════════════════════════════════════════════════════════

✅ Branch gh-pages: CRIADA (com todos os arquivos)
✅ Build React: COMPLETO (49.37 KB)
✅ GitHub Pages: ESTRUTURA PRONTA

❌ Configuração: Apontando para "main" ao invés de "gh-pages"

═════════════════════════════════════════════════════════════════════════════

SOLUÇÃO (3 PASSOS):
═════════════════════════════════════════════════════════════════════════════

PASSO 1: Abra este link no navegador:
─────────────────────────────────────
https://github.com/Dvd2112/CheersFDS/settings/pages

PASSO 2: Mude a configuração:
───────────────────────────────
Label: "Source"
Valor ATUAL: "Deploy from a branch" (main branch)
Valor NOVO:  "Deploy from a branch" (gh-pages branch)

⚡ Ou use este caminho direto:
   Build and deployment
   └─ Source: "Deploy from a branch"
   └─ Branch: MUDE DE "main" PARA "gh-pages"
   └─ Folder: "/ (root)"

PASSO 3: Clique em "Save"
──────────────────────────

═════════════════════════════════════════════════════════════════════════════

⏱ TEMPO ESTIMADO:
─────────────────
• Configuração: 30 segundos
• Processamento GitHub: 1-2 minutos
• Site online: ~3 minutos total

═════════════════════════════════════════════════════════════════════════════

DEPOIS DE FAZER ISSO:
─────────────────────

✅ Seu site estará em:
   https://dvd2112.github.io/CheersFDS

✅ Com as credenciais de teste:
   👤 Cliente:   joao@email.com / password
   📢 Promoter:  maria@promoter.com / password
   🏛️ Atlética:  atletica@uni.com / password

═════════════════════════════════════════════════════════════════════════════

⚠️ NÃO FUNCIONOU?
──────────────────

1. Limpe o cache: Ctrl+Shift+R (ou Cmd+Shift+R no Mac)
2. Aguarde 2-3 minutos a mais
3. Verifique se selecionou "gh-pages" (não "main")
4. Confirme pasta é "/" (root)

═════════════════════════════════════════════════════════════════════════════

LINK RÁPIDO PARA CONFIGURAÇÃO:
──────────────────────────────
https://github.com/Dvd2112/CheersFDS/settings/pages

Clique → Source → Branch: gh-pages → Save

═════════════════════════════════════════════════════════════════════════════

EOF

# Abrir link automaticamente (se em macOS ou Linux com xdg-open)
if command -v xdg-open &> /dev/null; then
    echo ""
    echo "Abrindo página de configuração..."
    xdg-open "https://github.com/Dvd2112/CheersFDS/settings/pages"
elif command -v open &> /dev/null; then
    echo ""
    echo "Abrindo página de configuração..."
    open "https://github.com/Dvd2112/CheersFDS/settings/pages"
fi

echo ""
echo "✅ Feito? Seu site estará online em ~3 minutos!"
