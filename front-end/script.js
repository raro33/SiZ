// Aguarda o carregamento completo do DOM para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Lógica para o Player de Vídeo Sobreposto (Overlay)
    const clickableMedia = document.querySelectorAll('.media-card, .play-button');
    const videoOverlay = document.getElementById('video-player-overlay');
    const playerContainer = document.getElementById('player-container');
    const closePlayer = document.getElementById('close-player');

    clickableMedia.forEach(item => {
        item.addEventListener('click', () => {
            const videoId = item.getAttribute('data-video-id');

            if (!videoId || videoId.startsWith('VIDEO_ID')) {
                alert('Conteúdo de exemplo. Substitua o "data-video-id" no HTML pelo ID de um vídeo real do YouTube para ver a reprodução.');
                return;
            }

            // Cria o iframe do YouTube com autoplay
            playerContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

            videoOverlay.classList.add('active');
        });
    });

    const closeVideoPlayer = () => {
        playerContainer.innerHTML = '';
        videoOverlay.classList.remove('active');
    };

    closePlayer.addEventListener('click', closeVideoPlayer);
    videoOverlay.addEventListener('click', (e) => {
        if (e.target === videoOverlay) {
            closeVideoPlayer();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoOverlay.classList.contains('active')) {
            closeVideoPlayer();
        }
    });


    // Lógica de interação do Front-end (Minha Lista)
    // Em um site real, esta função faria uma chamada assíncrona (fetch) para a API do Vercel
    const minhaListaButton = document.getElementById('minha-lista-btn');

    if (minhaListaButton) {
        minhaListaButton.addEventListener('click', (e) => {
            e.preventDefault(); 
            alert('Conteúdo adicionado à sua lista. (Esta função precisa de um usuário logado e de uma API)');
        });
    }

});