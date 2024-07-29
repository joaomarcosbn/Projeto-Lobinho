document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');

    fetch('lobinhos.json')
        .then(response => response.json())
        .then(data => {
            searchInput.addEventListener('input', function () {
                const query = searchInput.value.toLowerCase();
                const filteredData = data.filter(item => 
                    item.nome.toLowerCase().includes(query) || 
                    item.descricao.toLowerCase().includes(query)
                );

                displayResults(filteredData);
            });
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));

    function displayResults(results) {
        resultsDiv.innerHTML = '';
        if (results.length === 0) {
            resultsDiv.innerHTML = '<p>Nenhum resultado encontrado</p>';
            return;
        }
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <div>
                    <img src="${item.imagem}" alt="${item.nome}">
                    <h2>${item.nome}</h2>
                    <p>${item.descricao}</p>
                    <p><strong>Idade:</strong> ${item.idade}</p>
                    ${item.adotado ? `<p><strong>Nome do Dono:</strong> ${item.nomeDono}</p><p><strong>Idade do Dono:</strong> ${item.idadeDono}</p><p><strong>Email do Dono:</strong> ${item.emailDono}</p>` : '<p>Não adotado</p>'}
                </div>
            `;
            resultsDiv.appendChild(resultItem);
        });
    }
});
