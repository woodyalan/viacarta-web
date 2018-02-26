export default class AnexoDespesaService {
    constructor(resource) {
        this._resource = resource;
    }

    get(id) {
        return this._resource
            .get(`anexoDespesa/${id}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    getAnexosDespesa(despesaId) {
        return this._resource
            .get(`anexoDespesa/despesa/${despesaId}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    delete(id) {
        return this._resource
            .delete(`anexoDespesa/${id}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível remover o registro');
            })
    }
}
