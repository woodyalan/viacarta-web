export default class RecursosHumanosService {
    constructor(resource) {
        this._resource = resource
    }

    getAcompanhamentoPonto(params) {
        return this._resource
            .post(`recursosHumanos/acompanhamentoPonto`, params)
            .then(res => res.json(), err => {
                throw new Error(err.body.error.name);
            })
    }
}
