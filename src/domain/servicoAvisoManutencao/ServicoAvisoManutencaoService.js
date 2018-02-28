export default class ServicoAvisoManutencaoService {
    constructor(resource) {
        this._resource = resource;
    }

    delete(manutencao, servico) {
        return this._resource
            .delete(`servicoAvisoManutencao/${manutencao}/${servico}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível remover o registro');
            })
    }
}
