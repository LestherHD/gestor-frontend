import{$ as a,Ca as w,Ga as k,Gb as U,H as m,Ha as _,Ia as C,Ja as b,Ob as H,P as x,Pa as T,Q as y,Qa as l,Ra as L,Ua as M,Y as u,Za as d,_a as E,aa as D,fb as F,hb as z,ka as v,na as g,pa as I,qb as B,qd as N,ra as S,rd as O,sd as R,ta as j,xa as i,xc as A,ya as s,za as h}from"./chunk-52LX7MYE.js";var f={name:"gestor-frontend",version:"0.0.0",copyright:"Copyright 2024 creativeLabs \u0141ukasz Holeczek",license:"MIT",author:"The CoreUI Team (https://github.com/orgs/coreui/people) and contributors",homepage:"https://coreui.io/angular",config:{theme:"default",coreui_library_short_version:"5.0",coreui_library_docs_url:"https://coreui.io/angular/docs/"},scripts:{ng:"ng",start:"ng serve",build:"ng build",watch:"ng build --watch --configuration development",test:"ng test"},private:!0,dependencies:{"@angular/animations":"^17.3.4","@angular/cdk":"^17.3.4","@angular/common":"^17.3.4","@angular/compiler":"^17.3.4","@angular/core":"^17.3.4","@angular/forms":"^17.3.4","@angular/language-service":"^17.3.4","@angular/platform-browser":"^17.3.4","@angular/platform-browser-dynamic":"^17.3.4","@angular/router":"^17.3.4","@coreui/angular":"~5.0.2","@coreui/angular-chartjs":"~5.0.2","@coreui/chartjs":"~4.0.0","@coreui/coreui":"~5.0.0","@coreui/icons":"^3.0.1","@coreui/icons-angular":"~5.0.2","@coreui/utils":"^2.0.2","@ng-bootstrap/ng-bootstrap":"^16.0.0","chart.js":"^4.4.2","crypto-js":"^4.2.0","date-fns":"^3.6.0","date-fns-tz":"^3.1.3","lodash-es":"^4.17.21","ngx-pagination":"^6.0.3","ngx-scrollbar":"^13.0.3",rxjs:"^7.8.1",tslib:"^2.6.2","zone.js":"~0.14.4"},devDependencies:{"@angular-devkit/build-angular":"^17.3.4","@angular/cli":"^17.3.4","@angular/compiler-cli":"^17.3.4","@angular/localize":"^17.3.4","@types/jasmine":"^5.1.4","@types/lodash-es":"^4.17.12","@types/node":"^20.12.7","jasmine-core":"^5.1.2",karma:"^6.4.3","karma-chrome-launcher":"^3.2.0","karma-coverage":"^2.2.1","karma-jasmine":"^5.1.0","karma-jasmine-html-reporter":"^2.1.0",typescript:"~5.3.3"},engines:{node:"^18.13.0 || ^20.9.0",npm:">= 9"}};var P=["*"],q=()=>[],G=(()=>{let e=class e{constructor(r){this.changeDetectorRef=r,this._href="https://coreui.io/angular/docs/"}get exampleClass(){return!0}get href(){return this._href}set href(r){let t=f?.config?.coreui_library_short_version,o=f?.config?.coreui_library_docs_url??"https://coreui.io/angular/";this._href=`${o}${r}`}ngAfterContentInit(){}ngAfterViewInit(){this.changeDetectorRef.markForCheck()}};e.\u0275fac=function(t){return new(t||e)(D(z))},e.\u0275cmp=m({type:e,selectors:[["app-docs-example"]],hostVars:2,hostBindings:function(t,o){t&2&&I("example",o.exampleClass)},inputs:{fragment:"fragment",href:"href"},standalone:!0,features:[d],ngContentSelectors:P,decls:12,vars:5,consts:[["variant","underline-border",1,"border-bottom","w-100"],["cNavLink","",3,"active","fragment","routerLink"],["cIcon","","name","cilMediaPlay",1,"me-2"],["cNavLink","","target","_blank",3,"href"],["cIcon","","name","cilCode",1,"me-2"],[1,"tab-content","rounded-bottom"],[1,"tab-pane","active","show","p-3","preview","fade"]],template:function(t,o){t&1&&(_(),i(0,"c-nav",0)(1,"c-nav-item")(2,"a",1),x(),h(3,"svg",2),l(4," Bot\xF3n cambiado "),s()(),y(),i(5,"c-nav-item")(6,"a",3),x(),h(7,"svg",4),l(8," Code "),s()()(),y(),i(9,"div",5)(10,"div",6),C(11),s()()),t&2&&(a(2),g("active",!0)("fragment",o.fragment)("routerLink",E(4,q)),a(4),g("href",o.href,u))},dependencies:[R,O,N,U,H],styles:["[_nghost-%COMP%]{display:block}"],changeDetection:0});let n=e;return n})();var J=(()=>{let e=class e{constructor(){this.href="https://coreui.io/angular/docs/"}get hostClasses(){return{"float-end":!0}}ngOnInit(){this.href=this.name?`https://coreui.io/angular/docs/components/${this.name}`:this.href}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=m({type:e,selectors:[["app-docs-link"]],hostVars:2,hostBindings:function(t,o){t&2&&S(o.hostClasses)},inputs:{href:"href",name:"name",text:"text"},standalone:!0,features:[d],decls:4,vars:2,consts:[[1,"float-end"],["rel","noreferrer noopener","target","_blank",1,"card-header-action",3,"href"],[1,"text-body-secondary"]],template:function(t,o){if(t&1&&(i(0,"div",0)(1,"a",1)(2,"small",2),l(3),s()()()),t&2){let p;a(),b("href",o.href,u),a(2),L((p=o.text)!==null&&p!==void 0?p:"docs")}}});let n=e;return n})();var K=["*"];function Q(n,e){n&1&&w(0)}function W(n,e){if(n&1&&(i(0,"p"),l(1),s()),n&2){let c=k(2);a(),M(" An Angular ",c.name," component",c.plural?"s":""," ",c.plural?"have":"has"," been created as a native Angular version of Bootstrap ",c.name,". ",c.name," ",c.plural?"are":"is"," delivered with some new features, variants, and unique design that matches CoreUI Design System requirements. ")}}function X(n,e){if(n&1&&(v(0,W,2,6,"p"),C(1),h(2,"br"),l(3," For more information please visit our official "),i(4,"a",3),l(5,"documentation of CoreUI Components Library for Angular."),s()),n&2){let c=k();j(0,c.name?0:-1),a(4),b("href",c.href,u)}}var Y=(()=>{let e=class e{constructor(){this.name="",this._href="https://coreui.io/angular/docs/"}get href(){return this._href}set href(r){let t=f?.config?.coreui_library_short_version,o=f?.config?.coreui_library_docs_url??"https://coreui.io/angular/",p=r;this._href=`${o}${p}`}get plural(){return this.name?.slice(-1)==="s"}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=m({type:e,selectors:[["app-docs-callout"]],inputs:{name:"name",href:"href"},standalone:!0,features:[d],ngContentSelectors:K,decls:4,vars:1,consts:[["default",""],["color","info",1,"bg-white:dark:bg-transparent"],[4,"ngTemplateOutlet"],["target","_blank",3,"href"]],template:function(t,o){if(t&1&&(_(),i(0,"c-callout",1),v(1,Q,1,0,"ng-container",2),s(),v(2,X,6,2,"ng-template",null,0,F)),t&2){let p=T(3);a(),g("ngTemplateOutlet",p)}},dependencies:[A,B]});let n=e;return n})();export{Y as a,G as b,J as c};