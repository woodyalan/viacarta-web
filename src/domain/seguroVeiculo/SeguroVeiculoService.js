export default class SeguroVeiculoService {
    constructor(resource) {
        this._resource = resource('seguroVeiculo{/id}');
    }

    get(id) {
        return this._resource
            .get({ id })
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    save(seguroVeiculo) {
        return this._resource
            .save(seguroVeiculo)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    update(id, seguroVeiculo) {
        return this._resource
            .update({ id }, seguroVeiculo)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    delete(id) {
        return this._resource
            .delete({ id })
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível remover o registro');
            })
    }
}
