export default class ContaBancariaService {
    constructor(resource) {
        this._resource = resource;
    }

    get(id) {
        return this._resource
            .get(`contaBancaria/${id}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    getContasBancariasPessoa(pessoaId) {
        return this._resource
            .get(`contaBancariaPessoa/${pessoaId}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    save(contaBancaria) {
        return this._resource
            .post('contaBancaria', contaBancaria)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    update(id, contaBancaria) {
        return this._resource
            .put(`contaBancaria/${id}`, contaBancaria)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    delete(id) {
        return this._resource
            .delete(`contaBancaria/${id}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível remover o registro');
            })
    }
}
