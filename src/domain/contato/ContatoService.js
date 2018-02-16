export default class ContatoService {
    constructor(resource) {
        this._resource = resource;
    }

    get(id) {
        return this._resource
            .get(`contato/${id}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    getContatosPessoa(pessoaId) {
        return this._resource
            .get(`contatoPessoa/${pessoaId}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    save(contato) {
        return this._resource
            .post('contato', contato)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    update(id, contato) {
        return this._resource
            .put(`contato/${id}`, contato)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    delete(id) {
        return this._resource
            .delete(`contato/${id}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível remover o registro');
            })
    }
}
