# Portfólio 3D - João Alves

Um portfólio moderno e elegante com design em azul, animações fluidas e integração com suas redes sociais.

## 🎨 Características

- ✨ Design limpo e profissional com paleta de cores azul
- 🎯 Animações fluidas e responsivas
- 📱 Totalmente responsivo (mobile, tablet, desktop)
- ⚡ Performance otimizada
- 🔗 Integração com GitHub, Instagram e WhatsApp
- 🎬 Scroll animations elegantes

## 📁 Estrutura do Projeto

```
portfoilio/
├── index.html          # Página principal
├── styles.css          # Estilos e animações
├── script.js           # Funcionalidades e interatividade
├── images/             # Pasta para suas fotos
│   ├── photo1.jpg      # Foto para hero section
│   ├── photo2.jpg      # Foto para about section
│   ├── photo3.jpg      # Foto para portfolio (1)
│   └── photo4.jpg      # Foto para portfolio (2)
└── README.md           # Este arquivo
```

## 🖼️ Como Adicionar Suas Fotos

### Via GitHub Web Interface:

1. Abra seu repositório: https://github.com/Alvesdd7/Portf-lio
2. Clique em "Add file" → "Upload files"
3. Crie uma nova pasta digitando `images/` no nome do arquivo
4. Selecione suas 4 fotos:
   - **photo1.jpg** → Foto para seção hero (recomendado: 500x500px)
   - **photo2.jpg** → Foto para seção about (recomendado: 600x400px)
   - **photo3.jpg** → Foto para portfólio 1 (recomendado: 400x400px)
   - **photo4.jpg** → Foto para portfólio 2 (recomendado: 400x400px)
5. Commit as mudanças na branch `add-images`
6. Faça um pull request para `main`

### Via Git (Local):

```bash
# Clone o repositório
git clone https://github.com/Alvesdd7/Portf-lio.git
cd Portf-lio

# Crie a pasta images
mkdir images

# Adicione suas fotos na pasta images/
# (photo1.jpg, photo2.jpg, photo3.jpg, photo4.jpg)

# Commit e push
git add images/
git commit -m "feat: adicionar fotos do portfólio"
git push origin add-images
```

## 🚀 Deploy no GitHub Pages

1. Vá para Settings → Pages
2. Selecione "Deploy from a branch"
3. Escolha a branch `main` e pasta `/ (root)`
4. Clique em Save
5. Seu portfólio estará em: `https://Alvesdd7.github.io`

## 🎨 Customização

### Cores
Edite as variáveis CSS em `styles.css`:
```css
:root {
    --primary-blue: #0f3a7d;
    --secondary-blue: #1e5a96;
    --light-blue: #2a7ec4;
    --accent-blue: #3b9edb;
}
```

### Contatos
Atualize em `index.html`:
- WhatsApp: Troque o número `5517991656885`
- Instagram: Troque `joaoalvesp.dev`
- GitHub: Troque `Alvesdd7`

## 📱 Responsividade

O site é totalmente responsivo e funciona perfeitamente em:
- 📱 Celulares (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## ⚡ Performance

- Animações otimizadas com requestAnimationFrame
- Lazy loading de imagens
- Intersection Observer para scroll animations
- Minificado e pronto para produção

## 🔧 Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Gradients)
- Vanilla JavaScript (ES6+)
- Intersection Observer API

## 📝 Seções

1. **Hero** - Apresentação com sua foto
2. **Disclaimer** - Informação sobre estar em desenvolvimento
3. **About** - Sobre você e suas especialidades
4. **AI Tools** - Ferramentas que utiliza
5. **Skills** - Habilidades e tecnologias
6. **Portfolio** - Galeria de projetos
7. **Contact** - Links para redes sociais

## 🎯 Próximos Passos

- [ ] Adicionar suas fotos na pasta `images/`
- [ ] Customizar cores conforme preferência
- [ ] Atualizar conteúdo das seções
- [ ] Adicionar mais projetos ao portfólio
- [ ] Fazer deploy no GitHub Pages

## 📞 Contatos

- GitHub: https://github.com/Alvesdd7
- Instagram: https://instagram.com/joaoalvesp.dev
- WhatsApp: https://wa.me/5517991656885

---

**Desenvolvido com 💙 e IA como ferramenta auxiliar**
