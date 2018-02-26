export default class DespesaService {
    constructor(resource) {
        this._resource = resource('despesa{/id}');
    }

    get(id) {
        return this._resource
            .get({ id })
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    save(despesa) {
        return this._resource
            .save(despesa)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    update(id, custeio) {
        return this._resource
            .update({ id }, custeio)
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
