export default class DiaTrabalhoService {
    constructor(resource) {
        this._resource = resource;
    }

    get(id) {
        return this._resource
            .get(`diaTrabalho/${id}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    getDiasTrabalhoPlano(planoTrabalho) {
        return this._resource
            .get(`diaPlanoTrabalho/${planoTrabalho}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    save(diaTrabalho) {
        return this._resource
            .post(`diaTrabalho`, diaTrabalho)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    update(id, diaTrabalho) {
        return this._resource
            .put(`diaTrabalho/${id}`, diaTrabalho)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    delete(id) {
        return this._resource
            .delete(`diaTrabalho/${id}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível remover o registro');
            })
    }
}
