// Importando com (ESM)
const express = require('express');
const dotenv = require ('dotenv');

dotenv.config();

const port = process.env.PORTA;
const app = express();
// Aplicaçao use express como json (javascript object notation)
app.use(express.json());

const bancoDados = [];

app.get('/Veiculo', (requisicao, resposta) => {
 //tratamento de exceçaes
  try {
    if(bancoDados.length === 0){
      return resposta.status(200).json(
        {mensagem:"Banco de dados vazio!"

        })
    }
    resposta.status(200).json(bancoDados);
  } catch (error) {
    resposta.status(500).json(
      {
        mensagem:"erro ao buscar veiculo",
        erro: error.message
      })
  }
});

app.post('/Veiculo', (requisicao, resposta) => {
    try {
      const { id, veiculo, descricao, dataServico, custoTotal, status } = requisicao.body;
      if(!id || !veiculo || !descricao || !dataServico || !custoTotal || !status){
        return resposta.status(200).json({
          mensagem:"todos os dados devem ser preenchidos"
        }
  
        )
      }
    const novoVeiculo = { id, veiculo, descricao, dataServico, custoTotal, status };
    bancoDados.push(novoVeiculo);
    resposta.status(201).json({ mensagem: "veiculo cadastrado com sucesso" });
    } catch (error) {
      resposta.status(500).json
      ({error:"erro ao cadastrar veiculo"})
    }
  });

  app.put("/Veiculo/:id", (requisicao,resposta) =>{
    try {
      const id = requisicao.params.id;
      const {novoVeiculo,novoCusto} = requisicao.body;
      const veiculos = bancoDados.find(elemento => elemento.id === id)
      if(!id){
        return resposta.status(404).json({mensagem:"Informe um parametro"})
      }
      if(!veiculos){
          return resposta.status(404).json({mensagem: "veiculo nao encontrado"})
      }
      veiculos.veiculo = novoVeiculo || veiculos.veiculo
      veiculos.custoTotal = novoCusto || veiculos.custoTotal
      resposta.status(200).json({mensagem:"veiculo atualizado com sucesso"})
    } catch (error) {
      return resposta.status(404).json({mensagem:"veiculo nao encontrado"})
    }
  })

  app.delete("/Veiculo/:id", (requisicao, resposta) =>{
    const id = requisicao.params.id
    const veiculos = bancoDados.findIndex(elemento => elemento.id === id)
    if (veiculos === -1){
      return resposta.status(404).json({mensagem:"veiculo nao encontrado"})
    }
    bancoDados.splice(veiculos, 1)
    resposta.status(200).json({
      mensagem:"veiculo deletado com sucesso"
    })
  
  })
  
  
  app.get("/Veiculo/:id",(requisicao,resposta) =>{
    try {
    const id = requisicao.params.id;
    const veiculos = bancoDados.find(elemento => elemento.id === id);
    if(!veiculos){
      return resposta.status(404).json({mensagem:"veiculo nao encontrado"})
    }
    resposta.status(200).json(veiculos)
    } catch (error) {
      resposta.status(500).json({
        menubar: "erro ao buscar veiculo",
        erro:error.message
      })
    }
  })
  
  
  app.delete("/Veiculo",(requisicao, resposta) =>{
    try {
      bancoDados.length = 0;
      resposta.status(200).json({mensagem: "todos os veiculos foram excluidos"})
    } catch (error) {
      resposta.status(500).json({
        menubar: "erro ao deletar veiculo",
        erro: error.message
    }
  )}
  })
  
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
  