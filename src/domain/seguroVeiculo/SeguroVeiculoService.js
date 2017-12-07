export default class SeguroVeiculoService {
    constructor(resource) {
        this._resource = resource;
    }

    get(id) {
        return this._resource
            .get(`seguroVeiculo/${id}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    getSegurosVeiculo(veiculoId) {
        return this._resource
            .get(`segurosVeiculo/${veiculoId}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    save(seguroVeiculo) {
        return this._resource
            .post('seguroVeiculo', seguroVeiculo)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    update(id, seguroVeiculo) {
        return this._resource
            .put(`seguroVeiculo/${id}`, seguroVeiculo)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    delete(id) {
        return this._resource
            .delete(`seguroVeiculo/${id}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível remover o registro');
            })
    }
}
