import{a as xe}from"./chunk-GVBFG5PB.js";import"./chunk-RTEMKQTQ.js";import{a as fe,b as ve,c as be}from"./chunk-QKXWXE77.js";import{a as ie}from"./chunk-72RWJUWI.js";import{a as ee,b as te,c as he}from"./chunk-42YGSIDZ.js";import{b as ne,c as x,d as oe,e as re,f as C,i as c,l as ae,o as se,q as le,r as me,s as de,t as ce,w as ue,x as pe}from"./chunk-4NMRZLOK.js";import"./chunk-WASN5T2M.js";import{$ as s,Cc as R,Da as A,Fa as p,Ga as h,Gd as X,H as P,Ja as I,N as E,O as w,Ob as G,P as S,Q as F,Qa as e,Ra as v,Sa as g,Ta as O,Xc as $,Y as B,Yc as L,Yd as Y,Za as N,Zc as Q,aa as M,cd as Z,fd as J,hc as U,hd as K,id as W,jc as z,ka as b,na as d,nb as V,ob as k,tb as D,xa as t,ya as i,yc as q,za as f,zc as H}from"./chunk-52LX7MYE.js";import{k as T}from"./chunk-LTV2K23E.js";var y=class{constructor(m,a,o){this.id=m,this.producto=a,this.orden=o}};function ge(l,m){if(l&1){let a=A();t(0,"tr"),e(1,`
                `),t(2,"td"),e(3),i(),e(4,`
                `),t(5,"td"),e(6),i(),e(7,`
                `),t(8,"td"),e(9),i(),e(10,`
                `),t(11,"td"),e(12),i(),e(13,`
                `),t(14,"td"),e(15),i(),e(16,`
                `),t(17,"td"),e(18),i(),e(19,`
                `),t(20,"td"),e(21,`
                  `),t(22,"button",5),p("click",function(){let r=E(a).$implicit,n=h();return w(n.modal(3,r))}),e(23,`
                    `),S(),f(24,"svg",29),e(25,`
                  `),i(),e(26,`
                  `),F(),t(27,"button",30),p("click",function(){let r=E(a).$implicit,n=h();return w(n.modal(2,r))}),e(28,`
                    `),S(),f(29,"svg",31),e(30,`
                  `),i(),e(31,`
                  `),F(),t(32,"button",32),p("click",function(){let r=E(a).$implicit,n=h();return w(n.modalEliminar(r))}),e(33,`
                    `),S(),f(34,"svg",33),e(35,`
                  `),i(),e(36,`

                `),i(),e(37,`
              `),i()}if(l&2){let a=m.$implicit,o=h();s(3),v(a.id),s(3),v(a.producto.nombre),s(3),g("Q",o.functionsUtils.formatPrice(a.producto.precio),""),s(3),v(a.producto.tipoProducto.nombre),s(3),v(a.producto.estado=="A"?"Activo":"Inactivo"),s(3),v(a.orden)}}function _e(l,m){if(l&1&&(t(0,"c-alert",34),e(1),i()),l&2){let a=h();I("color",a.type),s(),v(a.mensaje)}}function Se(l,m){l&1&&(t(0,"c-input-group",17)(1,"div",18)(2,"label",35),e(3,"Id"),i(),f(4,"input",36),i()())}function Ce(l,m){if(l&1&&(t(0,"option",37),e(1),i()),l&2){let a=m.$implicit;d("value",a.id),s(),g(" ",a.nombre," ")}}function Ee(l,m){if(l&1&&(t(0,"div",38),f(1,"img",39),i()),l&2){let a=h();s(),d("src",a.imagePreview,B)}}function we(l,m){if(l&1&&(t(0,"c-alert",34),e(1),i()),l&2){let a=h();I("color",a.type),s(),v(a.mensaje)}}function Fe(l,m){if(l&1&&(t(0,"form",40)(1,"span",41),e(2),i()()),l&2){let a=h();d("formGroup",a.formEliminar),s(2),O("Confirmar eliminar el registro: ",a.formEliminar.controls.id.value," - ",a.formEliminar.controls.nombre.value,"")}}function j(l){let m=l.value;if(!/^\d+$/.test(m))return{onlyNumbers:!0};let a=Number(m);return a<1||a>5?{outOfRange:!0}:null}var Ze=(()=>{let m=class m{constructor(o,r,n){this.service=o,this.dataUtils=r,this.functionsUtils=n,this.deshabilitarBotones=!1,this.mostrarMensaje=!1,this.imagePreview=null,this.listResponse=[],this.type="",this.mensaje="",this.nombreAccion="",this.modo=0,this.deshabilitarBotones=!1,this.mostrarMensaje=!1,this.mostrarModalCrud=!1,this.mostrarModalEliminar=!1,this.pagination=new fe,this.pagination.page=0,this.pagination.pageSize=5,this.pagination.maxSize=1,this.imagePreview=null}ngOnInit(){this.resetForm(),this.getAll(),this.getAllProducts()}resetForm(){this.form=new C({id:new c({value:"",disabled:!0}),productoId:new c("",x.required),orden:new c("",[j,x.required])})}llenarForm(o){this.form=new C({id:new c({value:o.id,disabled:!0}),productoId:new c(o.producto.id,x.required),orden:new c(o.orden,[j,x.required])})}llenarFormDisabled(o){this.form=new C({id:new c({value:o.id,disabled:!0}),productoId:new c({value:o.producto.id,disabled:!0},x.required),orden:new c({value:o.orden,disabled:!0},[j,x.required])})}llenarObjeto(o){let r=this.listProducts.find(u=>u.id===Number(o.controls.productoId.value)),n=new y(o.controls.id.value,r,o.controls.orden.value);return this.cargarImagen(null,r.id),n}modal(o,r){this.imagePreview=null,this.mostrarModalCrud=!0,this.modo=o,this.deshabilitarBotones=!1;let n=document.getElementById("inputCodigo");n&&n.focus(),this.modo===1?(this.nombreAccion="Agregar",this.resetForm()):this.modo===2?(this.nombreAccion="Editar",this.llenarForm(r)):this.modo===3&&(this.nombreAccion="Ver",this.llenarFormDisabled(r))}modalEliminar(o){this.nombreAccion="Eliminar",this.mostrarModalEliminar=!0,this.deshabilitarBotones=!1,this.formEliminar=new C({id:new c({value:o.id,disabled:!0}),nombre:new c({value:o.nombre,disabled:!0})})}guardar(){if(this.service.mostrarSpinner=!0,this.deshabilitarBotones=!0,this.modo===1){if(this.form&&this.form.valid){let o=this.llenarObjeto(this.form);this.service.saveEntity("productosFavoritos",o).subscribe(r=>{this.type=r.error?"danger":"success",this.mensaje=r.mensaje,this.deshabilitarBotones=!0,this.mostrarMensaje=!0,this.service.mostrarSpinner=!1,setTimeout(()=>{this.mostrarMensaje=!1,this.mostrarModalCrud=!!r.error,this.deshabilitarBotones=!r.error,r.error||this.getAll()},2e3)},r=>{this.service.mostrarSpinner=!1,this.deshabilitarBotones=!1,this.type="danger",this.mensaje="Ha ocurrido un error al insertar los datos",this.mostrarMensaje=!0,setTimeout(()=>{this.mostrarMensaje=!1},1500),console.error("Error al consumir Post")})}}else if(this.modo===2&&this.form&&this.form.valid){let o=this.llenarObjeto(this.form);this.service.editEntity("productosFavoritos",o).subscribe(r=>{this.type=r.error?"danger":"success",this.mensaje=r.mensaje,this.deshabilitarBotones=!0,this.mostrarMensaje=!0,this.service.mostrarSpinner=!1,setTimeout(()=>{this.mostrarMensaje=!1,this.mostrarModalCrud=!!r.error,this.deshabilitarBotones=!r.error,r.error||this.getAll()},2e3)},r=>{this.service.mostrarSpinner=!1,this.deshabilitarBotones=!1,this.type="danger",this.mensaje="Ha ocurrido un error al actualizar los datos",this.mostrarMensaje=!0,setTimeout(()=>{this.mostrarMensaje=!1},1500),console.error("Error al consumir Post")})}}eliminar(){return T(this,null,function*(){this.service.mostrarSpinner=!0,this.deshabilitarBotones=!0,this.service.deleteEntity("productosFavoritos",this.formEliminar.controls.id.value).subscribe(o=>{this.type=o.error?"danger":"success",this.mensaje=o.mensaje,this.deshabilitarBotones=!0,this.mostrarMensaje=!0,setTimeout(()=>{this.mostrarModalEliminar=!!o.error,this.service.mostrarSpinner=!1,this.deshabilitarBotones=!1,this.mostrarMensaje=!1},2e3),this.getAll()},o=>{this.service.mostrarSpinner=!1,this.type="danger",this.deshabilitarBotones=!1,this.mensaje="Ha ocurrido un error al eliminar el registro",this.mostrarMensaje=!0,setTimeout(()=>{this.mostrarMensaje=!1},2e3),console.error("Error al consumir delete")})})}closeModal(){this.resetForm(),this.mostrarModalCrud=!1}closeModalDelete(){this.resetForm(),this.mostrarModalEliminar=!1}getAll(){this.service.getAllItemsFromEntity("productosFavoritos").subscribe(o=>{this.listResponse=o})}getAllProducts(){this.service.getAllItemsFromEntity("productos").subscribe(o=>{this.listProducts=o})}cargarImagen(o,r){let n=null;o!=null?n=this.listProducts.find(_=>_.id===Number(o.value)):n=this.listProducts.find(_=>_.id===r);let u=this.functionsUtils.base64ToBlob(n.imagen);this.imagePreview=this.functionsUtils.blobToUrl(u)}};m.\u0275fac=function(r){return new(r||m)(M(te),M(ie),M(ee))},m.\u0275cmp=P({type:m,selectors:[["app-favoritos"]],standalone:!0,features:[N],decls:104,vars:26,consts:[["xs","12"],[1,"mb-4"],[1,"card-header"],[2,"display","flex","justify-content","space-between"],[1,"col-auto"],["cButton","","color","success","variant","outline","size","sm",3,"click"],["cIcon","","name","cilPlus"],[1,"text-center","scroll"],["cTable","",3,"striped"],["scope","col"],[4,"ngFor","ngForOf"],[3,"close","submit","showModal","tittle","disabledSubmit","disabledOthersButtons","showSubmit"],[1,"d-flex","justify-content-center"],[1,"col-10"],["cForm","",3,"formGroup"],[3,"color",4,"ngIf"],["class","mb-2",4,"ngIf"],[1,"mb-2"],[1,"col-12"],["for","producto",1,"fw-bold"],["id","producto","cSelect","","formControlName","productoId",3,"change"],[3,"value",4,"ngFor","ngForOf"],[3,"valid"],[1,"col-12","mt-3"],["class","justify-content-center d-flex",4,"ngIf"],["for","orden",1,"fw-bold"],["id","orden","autoComplete","orden","formControlName","orden","cFormControl","",3,"blur","maxLength","valid"],[1,"justify-content-center","col-11"],[3,"formGroup",4,"ngIf"],["cIcon","","name","cilZoom"],["cButton","","color","info","variant","outline","size","sm",3,"click"],["cIcon","","name","cilPencil"],["cButton","","color","danger","variant","outline","size","sm",3,"click"],["cIcon","","name","cilTrash"],[3,"color"],["for","id",1,"fw-bold"],["id","id","autoComplete","id","formControlName","id","cFormControl",""],[3,"value"],[1,"justify-content-center","d-flex"],["alt","Vista Previa",2,"max-width","350px","max-height","270px",3,"src"],[3,"formGroup"],[2,"word-wrap","break-word"]],template:function(r,n){r&1&&(t(0,"c-row"),e(1,`
  `),t(2,"c-col",0),e(3,`
    `),t(4,"c-card",1),e(5,`
      `),t(6,"c-card-header",2),e(7,`

        `),t(8,"div",3),e(9,`
          `),t(10,"strong"),e(11,"Sucursales"),i(),e(12,`
          `),t(13,"div",4),e(14,`
            `),t(15,"span"),e(16),i(),e(17,`
          `),i(),e(18,`
          `),t(19,"div"),e(20,`
            `),t(21,"button",5),p("click",function(){return n.modal(1,null)}),e(22,`
              `),S(),f(23,"svg",6),e(24,`
            `),i(),e(25,`
          `),i(),e(26,`
        `),i(),e(27,`
      `),i(),e(28,`
      `),F(),t(29,"c-card-body"),e(30,`
        `),t(31,"c-container"),e(32,`
          `),t(33,"div",7),e(34,`
            `),t(35,"table",8),e(36,`
              `),t(37,"thead"),e(38,`
              `),t(39,"tr"),e(40,`
                `),t(41,"th",9),e(42,"Id"),i(),e(43,`
                `),t(44,"th",9),e(45,"Nombre"),i(),e(46,`
                `),t(47,"th",9),e(48,"Precio"),i(),e(49,`
                `),t(50,"th",9),e(51,"Tipo de producto"),i(),e(52,`
                `),t(53,"th",9),e(54,"Estado"),i(),e(55,`
                `),t(56,"th",9),e(57,"Posici\xF3n"),i(),e(58,`
                `),t(59,"th",9),e(60,"Acciones"),i(),e(61,`
              `),i(),e(62,`
              `),i(),e(63,`
              `),t(64,"tbody"),e(65,`
              `),b(66,ge,38,6,"tr",10),e(67,`
              `),i(),e(68,`
            `),i(),e(69,`
          `),i(),e(70,`
        `),i(),e(71,`
      `),i(),e(72,`
    `),i(),e(73,`
  `),i(),e(74,`
`),i(),f(75,"app-custom-spinner"),t(76,"app-modal-crud",11),p("close",function(){return n.closeModal()})("submit",function(){return n.guardar()}),t(77,"div",12)(78,"div",13)(79,"form",14),b(80,_e,2,2,"c-alert",15),t(81,"div",4),b(82,Se,5,0,"c-input-group",16),t(83,"c-input-group",17)(84,"div",18)(85,"label",19),e(86),i(),t(87,"select",20),p("change",function(_){return n.cargarImagen(_.target,null)}),b(88,Ce,2,2,"option",21),i(),t(89,"c-form-feedback",22),e(90,"Campo requerido."),i()(),t(91,"div",23),b(92,Ee,2,1,"div",24),i()(),t(93,"c-input-group",17)(94,"div",18)(95,"label",25),e(96),i(),t(97,"input",26),p("blur",function(){return n.functionsUtils.removeSpaces("orden",n.form)}),i(),t(98,"c-form-feedback",22),e(99,"Valor inv\xE1lido, ingrese un valor del 1 al 5."),i()()()()()()()(),t(100,"app-modal-delete",11),p("close",function(){return n.closeModalDelete()})("submit",function(){return n.eliminar()}),t(101,"div",27),b(102,we,2,2,"c-alert",15)(103,Fe,3,3,"form",28),i()()),r&2&&(s(16),g("Total: ",n.pagination.collectionSize,""),s(19),d("striped",!0),s(31),d("ngForOf",n.listResponse),s(10),d("showModal",n.mostrarModalCrud)("tittle",n.nombreAccion)("disabledSubmit",n.form.invalid||n.deshabilitarBotones)("disabledOthersButtons",n.deshabilitarBotones)("showSubmit",n.modo!==3),s(3),d("formGroup",n.form),s(),d("ngIf",n.mostrarMensaje),s(2),d("ngIf",n.modo!==1),s(4),g("Producto ",n.modo===1?"*":"",""),s(2),d("ngForOf",n.listProducts),s(),d("valid",!1),s(3),d("ngIf",n.imagePreview),s(4),g("Orden ",n.modo===1?"*":"",""),s(),d("maxLength",1)("valid",n.functionsUtils.numeroValido(n.form,"orden",1,5,1)),s(),d("valid",!1),s(2),d("showModal",n.mostrarModalEliminar)("tittle",n.nombreAccion)("disabledSubmit",n.deshabilitarBotones)("disabledOthersButtons",n.deshabilitarBotones)("showSubmit",!0),s(2),d("ngIf",n.mostrarMensaje),s(),d("ngIf",n.formEliminar))},dependencies:[R,H,J,q,W,K,Y,X,D,V,k,U,G,ue,ae,de,ce,ne,me,oe,re,Q,ve,he,be,$,L,z,Z,pe,se,le,xe],styles:['@charset "UTF-8";ngb-pagination[_ngcontent-%COMP%]     ul>li:not(.active)>a{color:#00b3bae6!important}ngb-pagination[_ngcontent-%COMP%]     ul>li.active>a{background-color:#00b3bae6!important;border-color:#00b3ba80!important}.scroll[_ngcontent-%COMP%]{max-height:55vh;overflow:scroll}@media only screen and (max-width: 767px){td[_ngcontent-%COMP%]{word-wrap:break-word;max-width:50vw}}@media only screen and (min-width: 768px) and (max-width: 1023px){td[_ngcontent-%COMP%]{word-wrap:break-word;max-width:40vw}}@media only screen and (min-width: 1024px){td[_ngcontent-%COMP%]{word-wrap:break-word;max-width:10vw}}li[_ngcontent-%COMP%]{cursor:pointer}']});let l=m;return l})();export{Ze as FavoritosComponent};