export default class PropriedadeService {
  constructor(resource) {
    this._resource = resource;
  }

  getAcompanhamentoPropriedades(params) {
    return this._resource.post(`propriedade/acompanhamentoPropriedades`, params).then(
      res => res.json(),
      err => {
        throw new Error(err.body.error.name);
      }
    );
  }

  get(id) {
    return this._resource.get(`propriedade/${id}`).then(
      res => res.json(),
      err => {
        throw new Error(err.body.error.name);
      }
    );
  }
}
