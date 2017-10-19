export default class TelaService {
    constructor(resource) {
        this._resource = resource('tela{/id}');
    }

    get(id) {
        return this._resource
            .get({ id })
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    save(tela) {
        return this._resource
            .save(tela)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    update(id, tela) {
        return this._resource
            .update({ id }, tela)
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
