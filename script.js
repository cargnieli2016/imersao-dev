let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("#campo-busca");

let dados = [];

async function iniciarBusca() {
    // Carrega os dados do JSON apenas na primeira vez
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            if (!resposta.ok) {
                throw new Error(`Erro ao carregar dados: ${resposta.statusText}`);
            }
            dados = await resposta.json();
        } catch (error) {
            console.error("Falha ao buscar o arquivo data.json:", error);
            cardContainer.innerHTML = "<p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>";
            return;
        }
    }

    let termoBusca = campoBusca.value.toLowerCase();

    let dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    // Limpa o container antes de renderizar novos cards
    cardContainer.innerHTML = "";

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.data_criacao}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(article);
    }
}

// Opcional: Carregar todos os cards ao iniciar a página
// window.onload = iniciarBusca;
