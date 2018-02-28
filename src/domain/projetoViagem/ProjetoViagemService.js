export default class ProjetoViagemService {
    constructor(resource) {
        this._resource = resource;
    }

    delete(viagem, projeto) {
        return this._resource
            .delete(`projetoViagem/${viagem}/${projeto}`)
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível remover o registro');
            })
    }
}
