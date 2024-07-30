document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');

    //Constantes para a navegação de páginas
    const pagination = document.querySelector('.pagination');
    const pageItems = pagination.querySelectorAll('.page-item');
    const currentPage = 3; // Página inicial

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
    // Função para atualizar a visualização das páginas
    function updatePagination(newPage) {
    pageItems.forEach(item => {
      item.classList.remove('active');
    });
    pageItems[newPage].classList.add('active');
  }
  
  // Eventos de clique nos botões
  pagination.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const newPage = parseInt(event.target.textContent);
      // Lógica para carregar o conteúdo da nova página
      // ...
      updatePagination(newPage);
    }
})});
