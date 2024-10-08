const infoDivs = document.querySelectorAll('.infos > div'); // Seleciona as divs dentro de .infos
const overlay = document.querySelector('.overlay');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove a classe highlight de todas as divs antes de adicionar à atual
      infoDivs.forEach(div => div.classList.remove('highlight'));
      entry.target.classList.add('highlight'); // Adiciona a classe de destaque à div atual
    } else {
      entry.target.classList.remove('highlight'); // Remove a classe se sair do centro
    }
  });

  // Verifica se alguma div está destacada
  const isAnyHighlighted = Array.from(infoDivs).some(div => div.classList.contains('highlight'));

  // Mostra ou oculta o overlay baseado na presença de destaque
  overlay.style.opacity = isAnyHighlighted ? '1' : '0';
  overlay.style.pointerEvents = isAnyHighlighted ? 'auto' : 'none'; // Permite clicar no overlay se visível

}, {
    root: null,
    rootMargin: '-50% 0px', // Ativa o efeito quando a div está a 200px do topo da tela
    threshold: 0
  });

infoDivs.forEach(div => {
    observer.observe(div);
});