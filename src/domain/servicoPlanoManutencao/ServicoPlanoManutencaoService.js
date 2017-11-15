export default class ServicoPlanoManutencaoService {
    constructor(resource) {
        this._resource = resource;
    }

    get(planoManutencao, servico) {
        return this._resource
            .get(`servicoPlanoManutencao/${planoManutencao}/${servico}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    getTelas(planoManutencao) {
        return this._resource
            .get(`servicoPlanoManutencao/${planoManutencao}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    save(servicoPlanoManutencao) {
        return this._resource
            .post('servicoPlanoManutencao', servicoPlanoManutencao)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    update(planoManutencao, servico, servicoPlanoManutencao) {
        return this._resource
            .put(`servicoPlanoManutencao/${planoManutencao}/${servico}`, servicoPlanoManutencao)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    delete(planoManutencao, servico) {
        return this._resource
            .delete(`servicoPlanoManutencao/${planoManutencao}/${servico}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível remover o registro');
            })
    }
}
