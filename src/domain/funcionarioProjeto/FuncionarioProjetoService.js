export default class FuncionarioProjetoService {
    constructor(resource) {
        this._resource = resource;
    }

    get(projeto, funcionario) {
        return this._resource
            .get(`funcionarioProjeto/${projeto}/${funcionario}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    getFuncionarios(projeto) {
        return this._resource
            .get(`funcionarioProjeto/${projeto}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    save(funcionarioProjeto) {
        return this._resource
            .post('funcionarioProjeto', funcionarioProjeto)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    update(projeto, funcionario, funcionarioProjeto) {
        return this._resource
            .put(`funcionarioProjeto/${projeto}/${funcionario}`, funcionarioProjeto)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    delete(projeto, funcionario) {
        return this._resource
            .delete(`funcionarioProjeto/${projeto}/${funcionario}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível remover o registro');
            })
    }
}
