export default class HorarioDiaTrabalhoService {
    constructor(resource) {
        this._resource = resource;
    }

    delete(id) {
        return this._resource
            .delete(`horarioDiaTrabalho/${id}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível remover o registro');
            })
    }
}
