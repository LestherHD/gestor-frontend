import{b as J}from"./chunk-WASN5T2M.js";import{$ as l,Cc as O,Da as f,Fa as v,Ga as w,Gb as G,H as b,N as u,O as h,Ob as M,P as d,Pa as _,Q as p,Qa as e,Va as C,Wa as L,Xa as T,Za as V,_a as s,ac as D,fc as B,gc as F,hc as z,hd as P,ic as H,id as q,jc as W,ka as E,na as o,ta as A,xa as t,ya as i,yc as I,za as n,zc as R}from"./chunk-52LX7MYE.js";import"./chunk-LTV2K23E.js";var x=()=>[];function j(r,m){if(r&1){let g=f();t(0,"c-alert",52),T("visibleChange",function(a){u(g);let c=w();return L(c.visible[0],a)||(c.visible[0]=a),h(a)}),t(1,"strong"),e(2,"Go right ahead"),i(),e(3," and click that dismiss over there on the right. "),i()}if(r&2){let g=w();C("visible",g.visible[0])}}function K(r,m){if(r&1){let g=f();t(0,"button",53),v("click",function(){u(g);let a=w(2);return h(a.visible[1]=!1)}),i()}}function N(r,m){r&1&&E(0,K,1,0,"ng-template",49)}var ie=(()=>{let m=class m{constructor(){this.visible=[!0,!0],this.dismissible=!0}ngOnInit(){}onAlertVisibleChange(S=this.visible){this.visible[1]=S}onResetDismiss(){this.visible=[!0,!0]}onToggleDismiss(){this.dismissible=!this.dismissible}};m.\u0275fac=function(a){return new(a||m)},m.\u0275cmp=b({type:m,selectors:[["app-alerts"]],standalone:!0,features:[V],decls:226,vars:20,consts:[["alertWithButtonCloseTemplate","cAlert"],["xs","12"],[1,"mb-4"],[1,"text-body-secondary","small"],["href","https://coreui.io/angular/docs/4.0/components/alert#dismissing"],["href","components/alert"],["color","primary"],["color","secondary"],["color","success"],["color","danger"],["color","warning"],["color","info"],["color","light"],["color","dark"],["color","primary","variant","solid"],["color","secondary","variant","solid"],["color","success","variant","solid"],["color","danger","variant","solid"],["color","warning","variant","solid"],["color","info","variant","solid"],["color","light","variant","solid"],["color","dark","variant","solid"],["href","components/alert#link-color"],["cAlertLink","",3,"routerLink"],["href","components/alert#additional-content"],["cAlertHeading",""],[1,"mb-0"],["color","dark",1,"d-flex","align-items-center"],["cIcon","","name","cilCheck","size","xl",1,"flex-shrink-0","me-2"],["color","secondary",1,"d-flex","align-items-center"],["xmlns","http://www.w3.org/2000/svg","width","24","height","24","fill","currentColor","viewBox","0 0 16 16","role","img","aria-label","Warning:",1,"bi","bi-exclamation-triangle-fill","flex-shrink-0","me-2"],["d","M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"],["xmlns","http://www.w3.org/2000/svg",1,"d-none"],["id","check-circle-fill","fill","currentColor","viewBox","0 0 16 16"],["d","M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"],["id","info-fill","fill","currentColor","viewBox","0 0 16 16"],["d","M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"],["id","exclamation-triangle-fill","fill","currentColor","viewBox","0 0 16 16"],["color","primary",1,"d-flex","align-items-center"],["width","24","height","24","role","img","aria-label","Info:",1,"bi","flex-shrink-0","me-2"],[0,"xlink","href","#info-fill"],["color","success",1,"d-flex","align-items-center"],[0,"xlink","href","#check-circle-fill"],["color","warning",1,"d-flex","align-items-center"],[0,"xlink","href","#exclamation-triangle-fill"],["color","danger",1,"d-flex","align-items-center"],["href","components/alert#dismissing"],["dismissible","","color","warning","fade","",3,"visible"],["color","dark","fade","","variant","solid",3,"visibleChange","dismissible","visible"],["cTemplateId","alertButtonCloseTemplate"],["cButton","","color","primary",1,"'me-1'",3,"click"],["cButton","","color","secondary",3,"click"],["dismissible","","color","warning","fade","",3,"visibleChange","visible"],["cButtonClose","","white","",3,"click"]],template:function(a,c){if(a&1){let k=f();t(0,"c-row")(1,"c-col",1)(2,"c-card",2)(3,"c-card-header")(4,"strong"),e(5,"Angular Alert"),i()(),t(6,"c-card-body")(7,"p",3),e(8," Angular Alert is prepared for any length of text, as well as an optional close button. For a styling, use one of the "),t(9,"strong"),e(10,"required"),i(),e(11," contextual "),t(12,"code"),e(13,"color"),i(),e(14," props (e.g., "),t(15,"code"),e(16,"primary"),i(),e(17,"). For inline dismissal, use the "),t(18,"a",4),e(19," dismissing prop "),i(),e(20," . "),i(),t(21,"app-docs-example",5)(22,"c-alert",6),e(23,"A simple primary alert\u2014check it out!"),i()(),t(24,"app-docs-example",5)(25,"c-alert",6),e(26,"A simple primary alert\u2014check it out!"),i(),t(27,"c-alert",7),e(28,"A simple secondary alert\u2014check it out!"),i(),t(29,"c-alert",8),e(30,"A simple success alert\u2014check it out!"),i(),t(31,"c-alert",9),e(32,"A simple danger alert\u2014check it out!"),i(),t(33,"c-alert",10),e(34,"A simple warning alert\u2014check it out!"),i(),t(35,"c-alert",11),e(36,"A simple info alert\u2014check it out!"),i(),t(37,"c-alert",12),e(38,"A simple light alert\u2014check it out!"),i(),t(39,"c-alert",13),e(40,"A simple dark alert\u2014check it out!"),i()()()()(),t(41,"c-col",1)(42,"c-card",2)(43,"c-card-header"),e(44,`
        `),t(45,"strong"),e(46,"Angular Alert"),i(),e(47," "),t(48,"small"),e(49,"solid variant"),i(),e(50,`
      `),i(),t(51,"c-card-body")(52,"app-docs-example",5)(53,"c-alert",14),e(54,"A solid primary alert\u2014check it out!"),i(),t(55,"c-alert",15),e(56,"A solid secondary alert\u2014check it out!"),i(),t(57,"c-alert",16),e(58,"A solid success alert\u2014check it out!"),i(),t(59,"c-alert",17),e(60,"A solid danger alert\u2014check it out!"),i(),t(61,"c-alert",18),e(62,"A solid warning alert\u2014check it out!"),i(),t(63,"c-alert",19),e(64,"A solid info alert\u2014check it out!"),i(),t(65,"c-alert",20),e(66,"A solid light alert\u2014check it out!"),i(),t(67,"c-alert",21),e(68,"A solid dark alert\u2014check it out!"),i()()()()(),t(69,"c-col",1)(70,"c-card",2)(71,"c-card-header"),e(72,`
        `),t(73,"strong"),e(74,"Angular Alert"),i(),e(75," "),t(76,"small"),e(77,"Link color"),i(),e(78,`
      `),i(),t(79,"c-card-body")(80,"p",3),e(81," Use the "),t(82,"code"),e(83,"cAlertLink"),i(),e(84," directive to immediately give matching colored links inside any alert. "),i(),t(85,"app-docs-example",22)(86,"c-alert",6),e(87," A simple primary alert with "),t(88,"a",23),e(89,"an example link"),i(),e(90,". Give it a click if you like. "),i(),t(91,"c-alert",7),e(92," A simple secondary alert with "),t(93,"a",23),e(94,"an example link"),i(),e(95,". Give it a click if you like. "),i(),t(96,"c-alert",8),e(97," A simple success alert with "),t(98,"a",23),e(99,"an example link"),i(),e(100,". Give it a click if you like. "),i(),t(101,"c-alert",9),e(102," A simple danger alert with "),t(103,"a",23),e(104,"an example link"),i(),e(105,". Give it a click if you like. "),i(),t(106,"c-alert",10),e(107," A simple warning alert with "),t(108,"a",23),e(109,"an example link"),i(),e(110,". Give it a click if you like. "),i(),t(111,"c-alert",11),e(112," A simple info alert with "),t(113,"a",23),e(114,"an example link"),i(),e(115,". Give it a click if you like. "),i(),t(116,"c-alert",12),e(117," A simple light alert with "),t(118,"a",23),e(119,"an example link"),i(),e(120,". Give it a click if you like. "),i(),t(121,"c-alert",13),e(122," A simple dark alert with "),t(123,"a",23),e(124,"an example link"),i(),e(125,". Give it a click if you like. "),i()()()()(),t(126,"c-col",1)(127,"c-card",2)(128,"c-card-header"),e(129,`
        `),t(130,"strong"),e(131,"Angular Alert"),i(),e(132," "),t(133,"small"),e(134,"Additional content"),i(),e(135,`
      `),i(),t(136,"c-card-body")(137,"p",3),e(138," Alert can also incorporate supplementary components & elements like heading, paragraph, and divider. "),i(),t(139,"app-docs-example",24)(140,"c-alert",8)(141,"h4",25),e(142,"Well done!"),i(),t(143,"p"),e(144," Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content. "),i(),n(145,"hr"),t(146,"p",26),e(147," Whenever you need to, be sure to use margin utilities to keep things nice and tidy. "),i()()()()()(),t(148,"c-col",1)(149,"c-card",2)(150,"c-card-header"),e(151,`
        `),t(152,"strong"),e(153,"Angular Alert"),i(),e(154," "),t(155,"small"),e(156,"Icons"),i(),e(157,`
      `),i(),t(158,"c-card-body")(159,"app-docs-example",5)(160,"c-alert",27),d(),n(161,"svg",28),p(),t(162,"div"),e(163,"An example alert with an icon"),i()(),t(164,"c-alert",29),d(),t(165,"svg",30),n(166,"path",31),i(),p(),t(167,"div"),e(168,"An example alert with an icon"),i()(),n(169,"hr"),d(),t(170,"svg",32)(171,"symbol",33),n(172,"path",34),i(),t(173,"symbol",35),n(174,"path",36),i(),t(175,"symbol",37),n(176,"path",31),i()(),p(),t(177,"c-alert",38),d(),t(178,"svg",39),n(179,"use",40),i(),p(),t(180,"div"),e(181,"An example primary alert with an icon"),i()(),t(182,"c-alert",41),d(),t(183,"svg",39),n(184,"use",42),i(),p(),t(185,"div"),e(186,"An example success alert with an icon"),i()(),t(187,"c-alert",43),d(),t(188,"svg",39),n(189,"use",44),i(),p(),t(190,"div"),e(191,"An example warning alert with an icon"),i()(),t(192,"c-alert",45),d(),t(193,"svg",39),n(194,"use",44),i(),p(),t(195,"div"),e(196,"An example danger alert with an icon"),i()()()()()(),t(197,"c-col",1)(198,"c-card",2)(199,"c-card-header"),e(200,`
        `),t(201,"strong"),e(202,"Angular Alert"),i(),e(203," "),t(204,"small"),e(205,"Dismissing"),i(),e(206,`
      `),i(),t(207,"c-card-body")(208,"p",3),e(209," Alerts can also be easily dismissed. Just add the "),t(210,"code"),e(211,"dismissible"),i(),e(212," prop. "),i(),t(213,"app-docs-example",46),E(214,j,4,1,"c-alert",47),t(215,"c-alert",48,0),v("visibleChange",function(U){return u(k),h(c.onAlertVisibleChange(U))}),E(217,N,1,0,null,49),t(218,"strong"),e(219,"Go right ahead"),i(),e(220," and click that dismiss over there on the right. "),i(),n(221,"hr"),t(222,"button",50),v("click",function(){return u(k),h(c.onToggleDismiss())}),e(223,"Toggle"),i(),t(224,"button",51),v("click",function(){return u(k),h(c.onResetDismiss())}),e(225,"Reset"),i()()()()()()}if(a&2){let k=_(216);l(88),o("routerLink",s(12,x)),l(5),o("routerLink",s(13,x)),l(5),o("routerLink",s(14,x)),l(5),o("routerLink",s(15,x)),l(5),o("routerLink",s(16,x)),l(5),o("routerLink",s(17,x)),l(5),o("routerLink",s(18,x)),l(5),o("routerLink",s(19,x)),l(91),A(214,c.visible[0]?214:-1),l(),o("dismissible",c.dismissible)("visible",c.visible[1]),l(2),A(217,k.dismissible?217:-1)}},dependencies:[q,P,I,O,R,J,W,F,G,B,M,D,H,z],styles:[`.dark-theme[_nghost-%COMP%]     .btn-close, .dark-theme   [_nghost-%COMP%]     .btn-close{--cui-btn-close-bg: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='rgba(44, 56, 74, 0.95)'><path d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/></svg>") !important}`]});let r=m;return r})();export{ie as AlertsComponent};