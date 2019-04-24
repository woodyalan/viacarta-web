export default class PropriedadeService {
  constructor(resource) {
    this._resource = resource;
  }

  getAcompanhamentoPropriedades(params) {
    return this._resource.post(`propriedade/acompanhamentoPropriedades`, params).then(
      res => res.json(),
      err => {
        throw new Error(`Falha ao buscar propriedades. ${err.message}`);
      }
    );
  }

  get(id = null) {
    const url = id ? `propriedade/${id}` : `propriedade`;

    return this._resource.get(url).then(
      res => res.json(),
      err => {
        throw new Error(`Falha ao buscar propriedades. ${err.message}`);
      }
    );
  }

  exportarExcel(id) {
    return this._resource.get(`propriedade/exportar/${id}`).then(
      res => res.json(),
      err => {
        throw new Error(`Falha exportar propriedade. ${err.message}`);
      }
    );
  }

  save(propriedade) {
    return this._resource.post(`propriedade`, propriedade).then(
      res => res.json(),
      err => {
        throw new Error(`Falha ao salvar propriedade. ${err.message}`);
      }
    );
  }

  update(id, propriedade) {
    return this._resource.put(`propriedade/${id}`, propriedade).then(
      res => res.json(),
      err => {
        throw new Error(`Falha ao atualizar propriedade. ${err.message}`);
      }
    );
  }

  delete(id) {
    return this._resource.delete(`propriedade/${id}`).then(
      res => res.json(),
      err => {
        throw new Error(`Falha ao remover propriedade. ${err.message}`);
      }
    );
  }

  getFotosImovel(fichaId) {
    return this._resource.get(`propriedade/fotoImovel/${fichaId}`).then(
      res => res.json(),
      err => {
        throw new Error(`Falha ao buscar fotos do imovel. ${err.message}`);
      }
    );
  }

  getFotosDocumentos(fichaId) {
    return this._resource.get(`propriedade/fotoDocumento/${fichaId}`).then(
      res => res.json(),
      err => {
        throw new Error(`Falha ao buscar fotos da documentação. ${err.message}`);
      }
    );
  }

  deleteFotoImovel(id) {
    return this._resource.delete(`propriedade/fotoImovel/${id}`).then(
      res => res.json(),
      err => {
        throw new Error(`Falha ao remover foto do imóvel. ${err.message}`);
      }
    );
  }

  deleteFotoDocumento(id) {
    return this._resource.delete(`propriedade/fotoDocumento/${id}`).then(
      res => res.json(),
      err => {
        throw new Error(`Falha ao remover foto da documentação. ${err.message}`);
      }
    );
  }
}
