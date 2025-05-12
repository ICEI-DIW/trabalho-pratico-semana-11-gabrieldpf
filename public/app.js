const filmes = [
    {
        id: 1,
        titulo: "Terremoto: A Falha de San Andreas",
        ano: 2015,
        sinopse: "Depois de um terremoto de grande intensidade destruir a Califórnia, um piloto de helicóptero especializado em resgate inicia uma difícil jornada para encontrar sua filha e sua ex-esposa.",
        elenco: ["Dwayne Johnson (Ray)", "Alexandra Daddario (Blake)", "Carla Gugino (Emma)"],
        trailer: "https://www.youtube.com/embed/nuHbHfdfuBc",
        imagem: "../../img/image.png",
        genero: "Ação",
        destaque: true,
        imagens_complementares: [
            { id: 1, src: "../../img/image.png", descricao: "Cena do terremoto" },
            { id: 2, src: "../../img/image.png", descricao: "Resgate de helicóptero" }
        ]
    },
    {
        id: 2,
        titulo: "Sem Rastros",
        ano: 2018,
        sinopse: "Um pai e sua filha adolescente vivem isolados na floresta, mas são forçados a enfrentar o mundo exterior quando são descobertos.",
        elenco: ["Ben Foster (Will)", "Thomasin McKenzie (Tom)"],
        trailer: "https://www.youtube.com/embed/8N0jPb_3iKk",
        imagem: "./img/image2.jpeg",
        genero: "Drama",
        destaque: false,
        imagens_complementares: [
            { id: 1, src: "./img/image2.jpeg", descricao: "Vida na floresta" },
            { id: 2, src: "./img/image2.jpeg", descricao: "Confronto com autoridades" }
        ]
    },
    {
        id: 3,
        titulo: "Onde Está Segunda?",
        ano: 2017,
        sinopse: "Em um futuro onde famílias só podem ter um filho, sete irmãs gêmeas lutam para sobreviver e desvendar um mistério.",
        elenco: ["Noomi Rapace (Sete Irmãs)", "Glenn Close (Nicolette)", "Willem Dafoe (Terrence)"],
        trailer: "https://www.youtube.com/embed/Ea7uS2iVv0Y",
        imagem: "./img/image3.jpg",
        genero: "Ficção Científica",
        destaque: true,
        imagens_complementares: [
            { id: 1, src: "./img/image3.jpg", descricao: "As sete irmãs" },
            { id: 2, src: "./img/image3.jpg", descricao: "Cena de ação" }
        ]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Main Page: Populate Carousel and Cards
    if (document.getElementById('carouselContent')) {
        const carouselContent = document.getElementById('carouselContent');
        const movieCards = document.getElementById('movieCards');
        const searchInput = document.querySelector('input[type="text"]');
        const featuredMovies = filmes.filter(filme => filme.destaque);

        // Carousel
        featuredMovies.forEach((filme, index) => {
            const isActive = index === 0 ? 'active' : '';
            carouselContent.innerHTML += `
                <div class="carousel-item ${isActive}">
                    <img src="${filme.imagem}" class="d-block w-100" alt="${filme.titulo}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${filme.titulo}</h5>
                        <p>${filme.sinopse.substring(0, 100)}...</p>
                    </div>
                </div>
            `;
        });

        // Initialize Cards
        function renderCards(movies) {
            movieCards.innerHTML = '';
            movies.forEach(filme => {
                movieCards.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100" onclick="window.location.href='detalhes.html?id=${filme.id}'">
                            <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
                            <div class="card-body">
                                <h5 class="card-title">${filme.titulo}</h5>
                                <p class="card-text">Ano: ${filme.ano}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // Initial render of all movies
        renderCards(filmes);

        // Search Functionality
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredMovies = filmes.filter(filme => 
                filme.titulo.toLowerCase().includes(searchTerm) || 
                filme.genero.toLowerCase().includes(searchTerm)
            );
            renderCards(filteredMovies);
        });
    }

    // Details Page: Populate Movie Details and Photos
    if (document.getElementById('detalhes-filme')) {
        const urlParams = new URLSearchParams(window.location.search);
        const filmeId = parseInt(urlParams.get('id'));
        const filme = filmes.find(f => f.id === filmeId);
        const detalhes = document.getElementById('detalhes-filme');
        const complementaryPhotos = document.getElementById('complementary-photos');

        if (filme) {
            detalhes.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <img src="${filme.imagem}" class="img-fluid mb-3" alt="${filme.titulo}">
                    </div>
                    <div class="col-md-6">
                        <h2>${filme.titulo}</h2>
                        <p><strong>Sinopse:</strong> ${filme.sinopse}</p>
                        <p><strong>Gênero:</strong> ${filme.genero}</p>
                        <p><strong>Elenco:</strong> ${filme.elenco.join(', ')}</p>
                        <p><strong>Ano:</strong> ${filme.ano}</p>
                        <iframe src="${filme.trailer}" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            `;

            filme.imagens_complementares.forEach(foto => {
                complementaryPhotos.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="${foto.src}" class="card-img-top" alt="${foto.descricao}">
                            <div class="card-body">
                                <p class="card-text">${foto.descricao}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            detalhes.innerHTML = '<p class="text-center">Filme não encontrado.</p>';
        }
    }

    // Category Page: Populate Movies by Category
    if (document.getElementById('categoryMovies')) {
        const urlParams = new URLSearchParams(window.location.search);
        const genero = urlParams.get('genero');
        const categoryTitle = document.getElementById('categoryTitle');
        const categoryMovies = document.getElementById('categoryMovies');

        if (genero) {
            const filteredMovies = filmes.filter(filme => filme.genero.toLowerCase() === genero.toLowerCase());
            categoryTitle.innerHTML = `Filmes na Categoria: ${genero}`;

            if (filteredMovies.length > 0) {
                filteredMovies.forEach(filme => {
                    categoryMovies.innerHTML += `
                        <div class="col-md-4 mb-4">
                            <div class="card h-100" onclick="window.location.href='detalhes.html?id=${filme.id}'">
                                <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
                                <div class="card-body">
                                    <h5 class="card-title">${filme.titulo}</h5>
                                    <p class="card-text">Ano: ${filme.ano}</p>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                categoryMovies.innerHTML = '<p class="text-center">Nenhum filme encontrado nesta categoria.</p>';
            }
        } else {
            categoryMovies.innerHTML = '<p class="text-center">Categoria não especificada.</p>';
        }
    }
});