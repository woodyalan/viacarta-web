export default class FeriadoService {
    constructor(resource) {
        this._resource = resource;
    }

    get(id) {
        return this._resource
            .get(`feriado/${id}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    getFeriadosCalendario(calendarioId) {
        return this._resource
            .get(`feriadoCalendario/${calendarioId}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter o registro');
            })
    }

    save(feriado) {
        return this._resource
            .post('feriado', feriado)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    update(id, feriado) {
        return this._resource
            .put(`feriado/${id}`, feriado)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível salvar o registro');
            })
    }

    delete(id) {
        return this._resource
            .delete(`feriado/${id}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível remover o registro');
            })
    }
}
