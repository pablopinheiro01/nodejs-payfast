const PagamentoDao = require('../persistencia/PagamentoDao');
const ConnectionFactory = require('../persistencia/ConnectionFactory');

module.exports = (app) =>  { 

    app.get('/pagamentos', function(req, res)  {
        console.log("Recebida a requisição para pagamentos ...");
        res.send("<html><head></head><body>ok</body></html>");
    });

    app.post('/pagamentos/pagamento',function(req,res){
        var pagamento = req.body;
        console.log('processando uma requisição de um novo pagamento');

        pagamento.status = 'CRIADO';
        pagamento.data = new Date();

        /*connection = app.persistencia.connectionFactory();
        pagamentoDao = new app.persistencia.PagamentoDao(connection);

        /*pagamentoDao.salva(pagamento,function(erro, result){
            if(erro){
                console.log(erro);
                return;
            }
            console.log('Pagamento Criado!!!');
            res.json(pagamento);
            
        });*/

        const conn = new ConnectionFactory();
        const pagamentoDao = new PagamentoDao();

        pagamentoDao.salva(pagamento)
        .then(console.log("Resposta obtida: "+res))
        .catch(erro => console.log(erro));
        

        res.send(pagamento); 
    });
}
