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

  get(id = null) {
    const url = id ? `propriedade/${id}` : `propriedade`;

    return this._resource.get(url).then(
      res => res.json(),
      err => {
        throw new Error(err.body.error.name);
      }
    );
  }

  save(propriedade) {
    return this._resource.post(`propriedade`, propriedade).then(
      res => res.json(),
      err => {
        throw new Error(err.body.error.name);
      }
    );
  }

  update(id, propriedade) {
    return this._resource.put(`propriedade/${id}`, propriedade).then(
      res => res.json(),
      err => {
        throw new Error(err.body.error.name);
      }
    );
  }

  delete(id) {
    return this._resource.delete(`propriedade/${id}`).then(
      res => res.json(),
      err => {
        throw new Error(err.body.error.name);
      }
    );
  }

  deleteFotoImovel(id) {
    return this._resource.delete(`propriedade/fotoImovel/${id}`).then(
      res => res.json(),
      err => {
        throw new Error(err.body.error.name);
      }
    );
  }

  deleteFotoDocumento(id) {
    return this._resource.delete(`propriedade/fotoDocumento/${id}`).then(
      res => res.json(),
      err => {
        throw new Error(err.body.error.name);
      }
    );
  }
}
