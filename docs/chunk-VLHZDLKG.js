import{Za as T,l as F,s as D}from"./chunk-XY32TZRY.js";import{c as L}from"./chunk-MLKNRXY2.js";import{Ca as x,Da as I,Ea as r,Fa as a,Ga as d,M as h,Na as S,Ob as w,Oc as j,Pc as k,Sc as A,V as C,W as v,Xa as f,Ya as g,Yb as s,Za as b,Zb as _,db as y,eb as $,fa as o,ga as l,ua as p,wd as E,xd as H}from"./chunk-5KS4DSO7.js";import{a as c}from"./chunk-LTV2K23E.js";var M=(n,i)=>i[0];function V(n,i){if(n&1&&(r(0,"c-col",2),C(),d(1,"svg",3),v(),r(2,"div"),f(3),a()()),n&2){let m=i.$implicit,t=S();p("md",3)("sm",4)("xl",2)("xs",6),o(),p("name",m[0])("title",m[0]),o(2),g(t.toKebabCase(m[0]))}}var Z=(()=>{let i=class i{constructor(t,e){this.route=t,this.iconSet=e,this.title="CoreUI Icons",e.icons=c(c(c({},T),F),D)}ngOnInit(){let t=this.route?.routeConfig?.path,e="cil";t==="coreui-icons"?(this.title=`${this.title} - Free`,e="cil"):t==="brands"?(this.title=`${this.title} - Brands`,e="cib"):t==="flags"&&(this.title=`${this.title} - Flags`,e="cif"),this.icons=this.getIconsView(e)}toKebabCase(t){return t.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase()}getIconsView(t){return Object.entries(this.iconSet.icons).filter(e=>e[0].startsWith(t))}};i.\u0275fac=function(e){return new(e||i)(l(w),l(s))},i.\u0275cmp=h({type:i,selectors:[["ng-component"]],standalone:!0,features:[y([s]),$],decls:8,vars:1,consts:[["href","https://github.com/coreui/coreui-icons","text","GitHub"],[1,"text-center"],[1,"mb-5",3,"md","sm","xl","xs"],["cIcon","","size","3xl",3,"name","title"]],template:function(e,u){e&1&&(r(0,"c-card")(1,"c-card-header"),f(2),d(3,"app-docs-link",0),a(),r(4,"c-card-body")(5,"c-row",1),x(6,V,4,7,"c-col",2,M),a()()()),e&2&&(o(2),b(" ",u.title," "),o(4),I(u.icons))},dependencies:[j,A,k,E,L,_,H],encapsulation:2});let n=i;return n})();export{Z as CoreUIIconsComponent};