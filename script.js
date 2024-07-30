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
                    <table>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Idade</th>
                            <th>Imagem</th>
                        </tr>
                        <tr>
                            <td>${item.nome}</td>
                            <td>${item.descricao}</td>
                            <td>${item.idade}</td>
                            <td><img src="${item.imagem}" alt="${item.nome}"></td>
                        </tr>
                    </table>
                </div>
            `;
            resultsDiv.appendChild(resultItem);
        });
    }
 
});

let currentPage = 1;
const itemsPerPage = 4;
const itemsContainer = document.getElementById('items-container');
const items = itemsContainer.getElementsByClassName('item');
const totalItems = items.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);

function showPage(page) {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    
    for (let i = 0; i < totalItems; i++) {
        items[i].style.display = 'none';
    }

    for (let i = (page - 1) * itemsPerPage; i < page * itemsPerPage && i < totalItems; i++) {
        items[i].style.display = 'block';
    }

    currentPage = page;
}

function prevPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
}

// Inicializa a exibição da primeira página
showPage(currentPage);