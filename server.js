const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/adicionar-lobinho', (req, res) => {
    const novoLobinho = req.body;
    
    const filePath = path.join(__dirname, 'lobinhos.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao ler arquivo');
        }

        let lobinhos = JSON.parse(data);
        lobinhos.push(novoLobinho);

        fs.writeFile(filePath, JSON.stringify(lobinhos, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao salvar arquivo');
            }

            res.status(200).send('Lobinho salvo com sucesso');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});