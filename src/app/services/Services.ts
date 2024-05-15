import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UrlField} from '../bo/UrlField';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Services {

  // local
  URL = 'http://localhost:8082';

  // demo heroku
  // URL = 'https://panaderia-backend.herokuapp.com';

  constructor(private http: HttpClient) {

  }

  getAllItemsFromEntity(entity: string): Observable<any> {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.get(this.URL + '/' + entity + '/' + 'getAll',{headers});
  }

  getAllItemsFromEntityPromise(entity: string): Promise<any> {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.get(this.URL + '/' + entity + '/' + 'getAll',{ headers }).toPromise();
  }

  getById(entity: string, id: any): Promise<any> {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.get(this.URL + '/' + entity + '/' + 'getById?id=' + id,{ headers }).toPromise();
  }

  getByTelefono(entity: string, body: any): Promise<any> {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.post(this.URL + '/' + entity + '/' + 'getByTelefono', body, { headers }).toPromise();
  }

  getItemsFromEntityByFields(entity: string, method: string, fields: UrlField[]): Observable<any> {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    let urlFields = '';
    let cont = 0;
    for (const field of fields) {
      if (cont > 0) {
        urlFields += '&' + field.fieldName + '=' + field.value;
      } else if (cont === 0) {
        urlFields = field.fieldName + '=' + field.value;
      }

      cont++;
    }
    return this.http.get(this.URL + '/' + entity + '/' + method + '?' + urlFields,
      {headers});
  }

  getItemsFromEntityByFieldsPromise(entity: string, method: string, fields: UrlField[]): Promise<any> {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    let urlFields = '';
    let cont = 0;
    for (const field of fields) {
      if (cont > 0) {
        urlFields += '&' + field.fieldName + '=' + field.value;
      } else if (cont === 0) {
        urlFields = field.fieldName + '=' + field.value;
      }

      cont++;
    }
    return this.http.get(this.URL + '/' + entity + '/' + method + '?' + urlFields,
      {headers}).toPromise();
  }

  saveEntity(entity: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.post(this.URL + '/' + entity, body, {headers});
  }

  cambiarStockMateriaPrima(idMateriaPrima: any, cantidad: any, agregar: boolean, usuario: string): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.post(this.URL + '/stock/cambiarStockMateriaPrima?idMateriaPrima=' + idMateriaPrima + '&cantidad=' + cantidad + '&agregar=' + agregar + '&usuario=' + usuario , null, {headers});
  }

  cambiarStockProducto(idProducto: any, cantidad: any, agregar: boolean, usuario: string): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.post(this.URL + '/stock/cambiarStockProducto?idProducto=' + idProducto + '&cantidad=' + cantidad + '&agregar=' + agregar + '&usuario=' + usuario , null, {headers});
  }

  saveEntityPromise(entity: string, body: any): Promise<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.post(this.URL + '/' + entity, body, {headers}).toPromise();
  }

  editEntity(entity: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.put(this.URL + '/' + entity, body, {headers});
  }

  editEntityPartially(entity: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.patch(this.URL + '/' + entity + '/partiallyUpdate', body, {headers});
  }

  deleteEntity(entity: string, id: number): Observable<any>{
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.delete(this.URL + '/' + entity + '?id=' + id,  {headers});
  }

  deleteUsuario(request: any): Observable<any>{
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.post(this.URL + '/usuarios/delete',  request, {headers});
  }

  anticiposUsuario(request: any): Observable<any>{
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.post(this.URL + '/usuarios/anticipo',  request, {headers});
  }

  getFromEntityByPage(entity: string, obj: any): Observable<any> {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.post(this.URL + '/' + entity + '/' + 'getByPage', obj, {headers});
  }

  getFromEntityDetalleByPage(entity: string, obj: any): Observable<any> {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.post(this.URL + '/' + entity + '/' + 'getDetalleByPage', obj, {headers});
  }

  getAnticiposByPage(entity: string, obj: any): Observable<any> {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.post(this.URL + '/' + entity + '/' + 'getAnticiposByPage', obj, {headers});
  }

  getFromEntityAndMethod(entity: string, method: string, obj: any): Observable<any> {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.post(this.URL + '/' + entity + '/' + method, obj, {headers});
  }

  getFromEntityAndMethodString(entity: string, method: string, obj: any): Observable<any> {

    const headersObj = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.post(this.URL + '/' + entity + '/' + method, obj, { headers: headersObj, responseType: 'text'});
  }

  getFromEntityAndMethodPromise(entity: string, method: string, obj: any): Promise<any> {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.post(this.URL + '/' + entity + '/' + method, obj, {headers}).toPromise();
  }

  getFromEntityAndMethodStringPromise(entity: string, method: string, obj: any): Promise<any> {

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    return this.http.post(this.URL + '/' + entity + '/' + method, obj, {headers: headers, responseType: 'text'}).toPromise();
  }



}
