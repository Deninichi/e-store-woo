(function ($) {
    'use strict';

    /**
     * All of the code for your admin-facing JavaScript source
     * should reside in this file.
     *
     * Note: It has been assumed you will write jQuery code here, so the
     * $ function reference has been prepared for usage within the scope
     * of this function.
     *
     * This enables you to define handlers, for when the DOM is ready:
     *
     * $(function() {
	 *
	 * });
     *
     * When the window is loaded:
     *
     * $( window ).load(function() {
	 *
	 * });
     *
     * ...and/or other possibilities.
     *
     * Ideally, it is not considered best practise to attach more than a
     * single DOM-ready or window-load handler for a particular page.
     * Although scripts in the WordPress core, Plugins and Themes may be
     * practising this, we should strive to set a better example in our own work.
     */


    !function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,o){return void 0===o&&(o="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(o),o}:e(jQuery)}(function(e){function t(t,o,n){"string"==typeof n&&(n={className:n}),this.options=S(w,e.isPlainObject(n)?n:{}),this.loadHTML(),this.wrapper=e(u.html),this.options.clickToHide&&this.wrapper.addClass(i+"-hidable"),this.wrapper.data(i,this),this.arrow=this.wrapper.find("."+i+"-arrow"),this.container=this.wrapper.find("."+i+"-container"),this.container.append(this.userContainer),t&&t.length&&(this.elementType=t.attr("type"),this.originalElement=t,this.elem=N(t),this.elem.data(i,this),this.elem.before(this.wrapper)),this.container.hide(),this.run(o)}var o=[].indexOf||function(e){for(var t=0,o=this.length;o>t;t++)if(t in this&&this[t]===e)return t;return-1},n="notify",i=n+"js",s=n+"!blank",r={t:"top",m:"middle",b:"bottom",l:"left",c:"center",r:"right"},d=["l","c","r"],a=["t","m","b"],h=["t","b","l","r"],l={t:"b",m:null,b:"t",l:"r",c:null,r:"l"},c=function(t){var o;return o=[],e.each(t.split(/\W+/),function(e,t){var n;return n=t.toLowerCase().charAt(0),r[n]?o.push(n):void 0}),o},p={},u={name:"core",html:'<div class="'+i+'-wrapper">\n	<div class="'+i+'-arrow"></div>\n	<div class="'+i+'-container"></div>\n</div>',css:"."+i+"-corner {\n	position: fixed;\n	margin: 5px;\n	z-index: 1050;\n}\n\n."+i+"-corner ."+i+"-wrapper,\n."+i+"-corner ."+i+"-container {\n	position: relative;\n	display: block;\n	height: inherit;\n	width: inherit;\n	margin: 3px;\n}\n\n."+i+"-wrapper {\n	z-index: 1;\n	position: absolute;\n	display: inline-block;\n	height: 0;\n	width: 0;\n}\n\n."+i+"-container {\n	display: none;\n	z-index: 1;\n	position: absolute;\n}\n\n."+i+"-hidable {\n	cursor: pointer;\n}\n\n[data-notify-text],[data-notify-html] {\n	position: relative;\n}\n\n."+i+"-arrow {\n	position: absolute;\n	z-index: 2;\n	width: 0;\n	height: 0;\n}"},f={"border-radius":["-webkit-","-moz-"]},g=function(e){return p[e]},y=function(e){if(!e)throw"Missing Style name";p[e]&&delete p[e]},A=function(t,o){if(!t)throw"Missing Style name";if(!o)throw"Missing Style definition";if(!o.html)throw"Missing Style HTML";var s=p[t];s&&s.cssElem&&(window.console&&console.warn(n+": overwriting style '"+t+"'"),p[t].cssElem.remove()),o.name=t,p[t]=o;var r="";o.classes&&e.each(o.classes,function(t,n){return r+="."+i+"-"+o.name+"-"+t+" {\n",e.each(n,function(t,o){return f[t]&&e.each(f[t],function(e,n){return r+="	"+n+t+": "+o+";\n"}),r+="	"+t+": "+o+";\n"}),r+="}\n"}),o.css&&(r+="/* styles for "+o.name+" */\n"+o.css),r&&(o.cssElem=x(r),o.cssElem.attr("id","notify-"+o.name));var d={},a=e(o.html);m("html",a,d),m("text",a,d),o.fields=d},x=function(t){var o;o=C("style"),o.attr("type","text/css"),e("head").append(o);try{o.html(t)}catch(n){o[0].styleSheet.cssText=t}return o},m=function(t,o,n){var i;return"html"!==t&&(t="text"),i="data-notify-"+t,b(o,"["+i+"]").each(function(){var o;o=e(this).attr(i),o||(o=s),n[o]=t})},b=function(e,t){return e.is(t)?e:e.find(t)},w={clickToHide:!0,autoHide:!0,autoHideDelay:5e3,arrowShow:!0,arrowSize:5,breakNewLines:!0,elementPosition:"bottom",globalPosition:"top right",style:"bootstrap",className:"error",showAnimation:"slideDown",showDuration:400,hideAnimation:"slideUp",hideDuration:200,gap:5},S=function(t,o){var n;return n=function(){},n.prototype=t,e.extend(!0,new n,o)},v=function(t){return e.extend(w,t)},C=function(t){return e("<"+t+"></"+t+">")},k={},N=function(t){var o;return t.is("[type=radio]")&&(o=t.parents("form:first").find("[type=radio]").filter(function(o,n){return e(n).attr("name")===t.attr("name")}),t=o.first()),t},E=function(e,t,o){var n,i;if("string"==typeof o)o=parseInt(o,10);else if("number"!=typeof o)return;if(!isNaN(o))return n=r[l[t.charAt(0)]],i=t,void 0!==e[n]&&(t=r[n.charAt(0)],o=-o),void 0===e[t]?e[t]=o:e[t]+=o,null},I=function(e,t,o){if("l"===e||"t"===e)return 0;if("c"===e||"m"===e)return o/2-t/2;if("r"===e||"b"===e)return o-t;throw"Invalid alignment"},D=function(e){return D.e=D.e||C("div"),D.e.text(e).html()};t.prototype.loadHTML=function(){var t;t=this.getStyle(),this.userContainer=e(t.html),this.userFields=t.fields},t.prototype.show=function(e,t){var o,n,i,s,r;if(n=function(o){return function(){return!e&&!o.elem&&o.destroy(),t?t():void 0}}(this),r=this.container.parent().parents(":hidden").length>0,i=this.container.add(this.arrow),o=[],r&&e)s="show";else if(r&&!e)s="hide";else if(!r&&e)s=this.options.showAnimation,o.push(this.options.showDuration);else{if(r||e)return n();s=this.options.hideAnimation,o.push(this.options.hideDuration)}return o.push(n),i[s].apply(i,o)},t.prototype.setGlobalPosition=function(){var t=this.getPosition(),o=t[0],n=t[1],s=r[o],d=r[n],a=o+"|"+n,h=k[a];if(!h||!document.body.contains(h[0])){h=k[a]=C("div");var l={};l[s]=0,"middle"===d?l.top="45%":"center"===d?l.left="45%":l[d]=0,h.css(l).addClass(i+"-corner"),e("body").append(h)}return h.prepend(this.wrapper)},t.prototype.setElementPosition=function(){var t,n,i,s,c,p,u,f,g,y,A,x,m,b,w,S,v,C,k,N,D,F,R,U,B,M,O,H,Q;for(O=this.getPosition(),U=O[0],F=O[1],R=O[2],A=this.elem.position(),f=this.elem.outerHeight(),x=this.elem.outerWidth(),g=this.elem.innerHeight(),y=this.elem.innerWidth(),Q=this.wrapper.position(),c=this.container.height(),p=this.container.width(),C=r[U],N=l[U],D=r[N],u={},u[D]="b"===U?f:"r"===U?x:0,E(u,"top",A.top-Q.top),E(u,"left",A.left-Q.left),H=["top","left"],b=0,S=H.length;S>b;b++)B=H[b],k=parseInt(this.elem.css("margin-"+B),10),k&&E(u,B,k);if(m=Math.max(0,this.options.gap-(this.options.arrowShow?i:0)),E(u,D,m),this.options.arrowShow){for(i=this.options.arrowSize,n=e.extend({},u),t=this.userContainer.css("border-color")||this.userContainer.css("border-top-color")||this.userContainer.css("background-color")||"white",w=0,v=h.length;v>w;w++)B=h[w],M=r[B],B!==N&&(s=M===C?t:"transparent",n["border-"+M]=i+"px solid "+s);E(u,r[N],i),o.call(h,F)>=0&&E(n,r[F],2*i)}else this.arrow.hide();return o.call(a,U)>=0?(E(u,"left",I(F,p,x)),n&&E(n,"left",I(F,i,y))):o.call(d,U)>=0&&(E(u,"top",I(F,c,f)),n&&E(n,"top",I(F,i,g))),this.container.is(":visible")&&(u.display="block"),this.container.removeAttr("style").css(u),n?this.arrow.removeAttr("style").css(n):void 0},t.prototype.getPosition=function(){var e,t,n,i,s,r,l,p;if(p=this.options.position||(this.elem?this.options.elementPosition:this.options.globalPosition),e=c(p),0===e.length&&(e[0]="b"),t=e[0],o.call(h,t)<0)throw"Must be one of ["+h+"]";return(1===e.length||(n=e[0],o.call(a,n)>=0&&(i=e[1],o.call(d,i)<0))||(s=e[0],o.call(d,s)>=0&&(r=e[1],o.call(a,r)<0)))&&(e[1]=(l=e[0],o.call(d,l)>=0?"m":"l")),2===e.length&&(e[2]=e[1]),e},t.prototype.getStyle=function(e){var t;if(e||(e=this.options.style),e||(e="default"),t=p[e],!t)throw"Missing style: "+e;return t},t.prototype.updateClasses=function(){var t,o;return t=["base"],e.isArray(this.options.className)?t=t.concat(this.options.className):this.options.className&&t.push(this.options.className),o=this.getStyle(),t=e.map(t,function(e){return i+"-"+o.name+"-"+e}).join(" "),this.userContainer.attr("class",t)},t.prototype.run=function(t,o){var n,i,r,d,a;if(e.isPlainObject(o)?e.extend(this.options,o):"string"===e.type(o)&&(this.options.className=o),this.container&&!t)return void this.show(!1);if(this.container||t){i={},e.isPlainObject(t)?i=t:i[s]=t;for(r in i)n=i[r],d=this.userFields[r],d&&("text"===d&&(n=D(n),this.options.breakNewLines&&(n=n.replace(/\n/g,"<br/>"))),a=r===s?"":"="+r,b(this.userContainer,"[data-notify-"+d+a+"]").html(n));this.updateClasses(),this.elem?this.setElementPosition():this.setGlobalPosition(),this.show(!0),this.options.autoHide&&(clearTimeout(this.autohideTimer),this.autohideTimer=setTimeout(this.show.bind(this,!1),this.options.autoHideDelay))}},t.prototype.destroy=function(){this.wrapper.data(i,null),this.wrapper.remove()},e[n]=function(o,i,s){return o&&o.nodeName||o.jquery?e(o)[n](i,s):(s=i,i=o,new t(null,i,s)),o},e.fn[n]=function(o,n){return e(this).each(function(){var s=N(e(this)).data(i);s&&s.destroy();new t(e(this),o,n)}),this},e.extend(e[n],{defaults:v,addStyle:A,removeStyle:y,pluginOptions:w,getStyle:g,insertCSS:x}),A("bootstrap",{html:"<div>\n<span data-notify-text></span>\n</div>",classes:{base:{"font-weight":"bold",padding:"8px 15px 8px 14px","text-shadow":"0 1px 0 rgba(255, 255, 255, 0.5)","background-color":"#fcf8e3",border:"1px solid #fbeed5","border-radius":"4px","white-space":"nowrap","padding-left":"25px","background-repeat":"no-repeat","background-position":"3px 7px"},error:{color:"#B94A48","background-color":"#F2DEDE","border-color":"#EED3D7","background-image":"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtRJREFUeNqkVc1u00AQHq+dOD+0poIQfkIjalW0SEGqRMuRnHos3DjwAH0ArlyQeANOOSMeAA5VjyBxKBQhgSpVUKKQNGloFdw4cWw2jtfMOna6JOUArDTazXi/b3dm55socPqQhFka++aHBsI8GsopRJERNFlY88FCEk9Yiwf8RhgRyaHFQpPHCDmZG5oX2ui2yilkcTT1AcDsbYC1NMAyOi7zTX2Agx7A9luAl88BauiiQ/cJaZQfIpAlngDcvZZMrl8vFPK5+XktrWlx3/ehZ5r9+t6e+WVnp1pxnNIjgBe4/6dAysQc8dsmHwPcW9C0h3fW1hans1ltwJhy0GxK7XZbUlMp5Ww2eyan6+ft/f2FAqXGK4CvQk5HueFz7D6GOZtIrK+srupdx1GRBBqNBtzc2AiMr7nPplRdKhb1q6q6zjFhrklEFOUutoQ50xcX86ZlqaZpQrfbBdu2R6/G19zX6XSgh6RX5ubyHCM8nqSID6ICrGiZjGYYxojEsiw4PDwMSL5VKsC8Yf4VRYFzMzMaxwjlJSlCyAQ9l0CW44PBADzXhe7xMdi9HtTrdYjFYkDQL0cn4Xdq2/EAE+InCnvADTf2eah4Sx9vExQjkqXT6aAERICMewd/UAp/IeYANM2joxt+q5VI+ieq2i0Wg3l6DNzHwTERPgo1ko7XBXj3vdlsT2F+UuhIhYkp7u7CarkcrFOCtR3H5JiwbAIeImjT/YQKKBtGjRFCU5IUgFRe7fF4cCNVIPMYo3VKqxwjyNAXNepuopyqnld602qVsfRpEkkz+GFL1wPj6ySXBpJtWVa5xlhpcyhBNwpZHmtX8AGgfIExo0ZpzkWVTBGiXCSEaHh62/PoR0p/vHaczxXGnj4bSo+G78lELU80h1uogBwWLf5YlsPmgDEd4M236xjm+8nm4IuE/9u+/PH2JXZfbwz4zw1WbO+SQPpXfwG/BBgAhCNZiSb/pOQAAAAASUVORK5CYII=)"},success:{color:"#468847","background-color":"#DFF0D8","border-color":"#D6E9C6","background-image":"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAutJREFUeNq0lctPE0Ecx38zu/RFS1EryqtgJFA08YCiMZIAQQ4eRG8eDGdPJiYeTIwHTfwPiAcvXIwXLwoXPaDxkWgQ6islKlJLSQWLUraPLTv7Gme32zoF9KSTfLO7v53vZ3d/M7/fIth+IO6INt2jjoA7bjHCJoAlzCRw59YwHYjBnfMPqAKWQYKjGkfCJqAF0xwZjipQtA3MxeSG87VhOOYegVrUCy7UZM9S6TLIdAamySTclZdYhFhRHloGYg7mgZv1Zzztvgud7V1tbQ2twYA34LJmF4p5dXF1KTufnE+SxeJtuCZNsLDCQU0+RyKTF27Unw101l8e6hns3u0PBalORVVVkcaEKBJDgV3+cGM4tKKmI+ohlIGnygKX00rSBfszz/n2uXv81wd6+rt1orsZCHRdr1Imk2F2Kob3hutSxW8thsd8AXNaln9D7CTfA6O+0UgkMuwVvEFFUbbAcrkcTA8+AtOk8E6KiQiDmMFSDqZItAzEVQviRkdDdaFgPp8HSZKAEAL5Qh7Sq2lIJBJwv2scUqkUnKoZgNhcDKhKg5aH+1IkcouCAdFGAQsuWZYhOjwFHQ96oagWgRoUov1T9kRBEODAwxM2QtEUl+Wp+Ln9VRo6BcMw4ErHRYjH4/B26AlQoQQTRdHWwcd9AH57+UAXddvDD37DmrBBV34WfqiXPl61g+vr6xA9zsGeM9gOdsNXkgpEtTwVvwOklXLKm6+/p5ezwk4B+j6droBs2CsGa/gNs6RIxazl4Tc25mpTgw/apPR1LYlNRFAzgsOxkyXYLIM1V8NMwyAkJSctD1eGVKiq5wWjSPdjmeTkiKvVW4f2YPHWl3GAVq6ymcyCTgovM3FzyRiDe2TaKcEKsLpJvNHjZgPNqEtyi6mZIm4SRFyLMUsONSSdkPeFtY1n0mczoY3BHTLhwPRy9/lzcziCw9ACI+yql0VLzcGAZbYSM5CCSZg1/9oc/nn7+i8N9p/8An4JMADxhH+xHfuiKwAAAABJRU5ErkJggg==)"},info:{color:"#3A87AD","background-color":"#D9EDF7","border-color":"#BCE8F1","background-image":"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QYFAhkSsdes/QAAA8dJREFUOMvVlGtMW2UYx//POaWHXg6lLaW0ypAtw1UCgbniNOLcVOLmAjHZolOYlxmTGXVZdAnRfXQm+7SoU4mXaOaiZsEpC9FkiQs6Z6bdCnNYruM6KNBw6YWewzl9z+sHImEWv+vz7XmT95f/+3/+7wP814v+efDOV3/SoX3lHAA+6ODeUFfMfjOWMADgdk+eEKz0pF7aQdMAcOKLLjrcVMVX3xdWN29/GhYP7SvnP0cWfS8caSkfHZsPE9Fgnt02JNutQ0QYHB2dDz9/pKX8QjjuO9xUxd/66HdxTeCHZ3rojQObGQBcuNjfplkD3b19Y/6MrimSaKgSMmpGU5WevmE/swa6Oy73tQHA0Rdr2Mmv/6A1n9w9suQ7097Z9lM4FlTgTDrzZTu4StXVfpiI48rVcUDM5cmEksrFnHxfpTtU/3BFQzCQF/2bYVoNbH7zmItbSoMj40JSzmMyX5qDvriA7QdrIIpA+3cdsMpu0nXI8cV0MtKXCPZev+gCEM1S2NHPvWfP/hL+7FSr3+0p5RBEyhEN5JCKYr8XnASMT0xBNyzQGQeI8fjsGD39RMPk7se2bd5ZtTyoFYXftF6y37gx7NeUtJJOTFlAHDZLDuILU3j3+H5oOrD3yWbIztugaAzgnBKJuBLpGfQrS8wO4FZgV+c1IxaLgWVU0tMLEETCos4xMzEIv9cJXQcyagIwigDGwJgOAtHAwAhisQUjy0ORGERiELgG4iakkzo4MYAxcM5hAMi1WWG1yYCJIcMUaBkVRLdGeSU2995TLWzcUAzONJ7J6FBVBYIggMzmFbvdBV44Corg8vjhzC+EJEl8U1kJtgYrhCzgc/vvTwXKSib1paRFVRVORDAJAsw5FuTaJEhWM2SHB3mOAlhkNxwuLzeJsGwqWzf5TFNdKgtY5qHp6ZFf67Y/sAVadCaVY5YACDDb3Oi4NIjLnWMw2QthCBIsVhsUTU9tvXsjeq9+X1d75/KEs4LNOfcdf/+HthMnvwxOD0wmHaXr7ZItn2wuH2SnBzbZAbPJwpPx+VQuzcm7dgRCB57a1uBzUDRL4bfnI0RE0eaXd9W89mpjqHZnUI5Hh2l2dkZZUhOqpi2qSmpOmZ64Tuu9qlz/SEXo6MEHa3wOip46F1n7633eekV8ds8Wxjn37Wl63VVa+ej5oeEZ/82ZBETJjpJ1Rbij2D3Z/1trXUvLsblCK0XfOx0SX2kMsn9dX+d+7Kf6h8o4AIykuffjT8L20LU+w4AZd5VvEPY+XpWqLV327HR7DzXuDnD8r+ovkBehJ8i+y8YAAAAASUVORK5CYII=)"},warn:{color:"#C09853","background-color":"#FCF8E3","border-color":"#FBEED5","background-image":"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABJlBMVEXr6eb/2oD/wi7/xjr/0mP/ykf/tQD/vBj/3o7/uQ//vyL/twebhgD/4pzX1K3z8e349vK6tHCilCWbiQymn0jGworr6dXQza3HxcKkn1vWvV/5uRfk4dXZ1bD18+/52YebiAmyr5S9mhCzrWq5t6ufjRH54aLs0oS+qD751XqPhAybhwXsujG3sm+Zk0PTwG6Shg+PhhObhwOPgQL4zV2nlyrf27uLfgCPhRHu7OmLgAafkyiWkD3l49ibiAfTs0C+lgCniwD4sgDJxqOilzDWowWFfAH08uebig6qpFHBvH/aw26FfQTQzsvy8OyEfz20r3jAvaKbhgG9q0nc2LbZxXanoUu/u5WSggCtp1anpJKdmFz/zlX/1nGJiYmuq5Dx7+sAAADoPUZSAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfdBgUBGhh4aah5AAAAlklEQVQY02NgoBIIE8EUcwn1FkIXM1Tj5dDUQhPU502Mi7XXQxGz5uVIjGOJUUUW81HnYEyMi2HVcUOICQZzMMYmxrEyMylJwgUt5BljWRLjmJm4pI1hYp5SQLGYxDgmLnZOVxuooClIDKgXKMbN5ggV1ACLJcaBxNgcoiGCBiZwdWxOETBDrTyEFey0jYJ4eHjMGWgEAIpRFRCUt08qAAAAAElFTkSuQmCC)"}}}),e(function(){x(u.css).attr("id","core-notify"),e(document).on("click","."+i+"-hidable",function(t){e(this).trigger("notify-hide")}),e(document).on("notify-hide","."+i+"-wrapper",function(t){var o=e(this).data(i);o&&o.show(!1)})})}),!function(e,t,o,n){"use strict";var i="treeview",s={};s.settings={injectStyle:!0,levels:2,expandIcon:"glyphicon glyphicon-plus",collapseIcon:"glyphicon glyphicon-minus",emptyIcon:"glyphicon",nodeIcon:"",selectedIcon:"",checkedIcon:"glyphicon glyphicon-check",uncheckedIcon:"glyphicon glyphicon-unchecked",color:n,backColor:n,borderColor:n,onhoverColor:"#F5F5F5",selectedColor:"#FFFFFF",selectedBackColor:"#428bca",searchResultColor:"#D9534F",searchResultBackColor:n,enableLinks:!1,highlightSelected:!0,highlightSearchResults:!0,showBorder:!0,showIcon:!0,showCheckbox:!1,showTags:!1,multiSelect:!1,onNodeChecked:n,onNodeCollapsed:n,onNodeDisabled:n,onNodeEnabled:n,onNodeExpanded:n,onNodeSelected:n,onNodeUnchecked:n,onNodeUnselected:n,onSearchComplete:n,onSearchCleared:n},s.options={silent:!1,ignoreChildren:!1},s.searchOptions={ignoreCase:!0,exactMatch:!1,revealResults:!0};var r=function(t,o){return this.$element=e(t),this.elementId=t.id,this.styleId=this.elementId+"-style",this.init(o),{options:this.options,init:e.proxy(this.init,this),remove:e.proxy(this.remove,this),getNode:e.proxy(this.getNode,this),getParent:e.proxy(this.getParent,this),getSiblings:e.proxy(this.getSiblings,this),getSelected:e.proxy(this.getSelected,this),getUnselected:e.proxy(this.getUnselected,this),getExpanded:e.proxy(this.getExpanded,this),getCollapsed:e.proxy(this.getCollapsed,this),getChecked:e.proxy(this.getChecked,this),getUnchecked:e.proxy(this.getUnchecked,this),getDisabled:e.proxy(this.getDisabled,this),getEnabled:e.proxy(this.getEnabled,this),selectNode:e.proxy(this.selectNode,this),unselectNode:e.proxy(this.unselectNode,this),toggleNodeSelected:e.proxy(this.toggleNodeSelected,this),collapseAll:e.proxy(this.collapseAll,this),collapseNode:e.proxy(this.collapseNode,this),expandAll:e.proxy(this.expandAll,this),expandNode:e.proxy(this.expandNode,this),toggleNodeExpanded:e.proxy(this.toggleNodeExpanded,this),revealNode:e.proxy(this.revealNode,this),checkAll:e.proxy(this.checkAll,this),checkNode:e.proxy(this.checkNode,this),uncheckAll:e.proxy(this.uncheckAll,this),uncheckNode:e.proxy(this.uncheckNode,this),toggleNodeChecked:e.proxy(this.toggleNodeChecked,this),disableAll:e.proxy(this.disableAll,this),disableNode:e.proxy(this.disableNode,this),enableAll:e.proxy(this.enableAll,this),enableNode:e.proxy(this.enableNode,this),toggleNodeDisabled:e.proxy(this.toggleNodeDisabled,this),search:e.proxy(this.search,this),clearSearch:e.proxy(this.clearSearch,this)}};r.prototype.init=function(t){this.tree=[],this.nodes=[],t.data&&("string"==typeof t.data&&(t.data=e.parseJSON(t.data)),this.tree=e.extend(!0,[],t.data),delete t.data),this.options=e.extend({},s.settings,t),this.destroy(),this.subscribeEvents(),this.setInitialStates({nodes:this.tree},0),this.render()},r.prototype.remove=function(){this.destroy(),e.removeData(this,i),e("#"+this.styleId).remove()},r.prototype.destroy=function(){this.initialized&&(this.$wrapper.remove(),this.$wrapper=null,this.unsubscribeEvents(),this.initialized=!1)},r.prototype.unsubscribeEvents=function(){this.$element.off("click"),this.$element.off("nodeChecked"),this.$element.off("nodeCollapsed"),this.$element.off("nodeDisabled"),this.$element.off("nodeEnabled"),this.$element.off("nodeExpanded"),this.$element.off("nodeSelected"),this.$element.off("nodeUnchecked"),this.$element.off("nodeUnselected"),this.$element.off("searchComplete"),this.$element.off("searchCleared")},r.prototype.subscribeEvents=function(){this.unsubscribeEvents(),this.$element.on("click",e.proxy(this.clickHandler,this)),"function"==typeof this.options.onNodeChecked&&this.$element.on("nodeChecked",this.options.onNodeChecked),"function"==typeof this.options.onNodeCollapsed&&this.$element.on("nodeCollapsed",this.options.onNodeCollapsed),"function"==typeof this.options.onNodeDisabled&&this.$element.on("nodeDisabled",this.options.onNodeDisabled),"function"==typeof this.options.onNodeEnabled&&this.$element.on("nodeEnabled",this.options.onNodeEnabled),"function"==typeof this.options.onNodeExpanded&&this.$element.on("nodeExpanded",this.options.onNodeExpanded),"function"==typeof this.options.onNodeSelected&&this.$element.on("nodeSelected",this.options.onNodeSelected),"function"==typeof this.options.onNodeUnchecked&&this.$element.on("nodeUnchecked",this.options.onNodeUnchecked),"function"==typeof this.options.onNodeUnselected&&this.$element.on("nodeUnselected",this.options.onNodeUnselected),"function"==typeof this.options.onSearchComplete&&this.$element.on("searchComplete",this.options.onSearchComplete),"function"==typeof this.options.onSearchCleared&&this.$element.on("searchCleared",this.options.onSearchCleared)},r.prototype.setInitialStates=function(t,o){if(t.nodes){o+=1;var n=t,i=this;e.each(t.nodes,function(e,t){t.nodeId=i.nodes.length,t.parentId=n.nodeId,t.hasOwnProperty("selectable")||(t.selectable=!0),t.state=t.state||{},t.state.hasOwnProperty("checked")||(t.state.checked=!1),t.state.hasOwnProperty("disabled")||(t.state.disabled=!1),t.state.hasOwnProperty("expanded")||(!t.state.disabled&&o<i.options.levels&&t.nodes&&t.nodes.length>0?t.state.expanded=!0:t.state.expanded=!1),t.state.hasOwnProperty("selected")||(t.state.selected=!1),i.nodes.push(t),t.nodes&&i.setInitialStates(t,o)})}},r.prototype.clickHandler=function(t){this.options.enableLinks||t.preventDefault();var o=e(t.target),n=this.findNode(o);if(n&&!n.state.disabled){var i=o.attr("class")?o.attr("class").split(" "):[];-1!==i.indexOf("expand-icon")?(this.toggleExpandedState(n,s.options),this.render()):-1!==i.indexOf("check-icon")?(this.toggleCheckedState(n,s.options),this.render()):(n.selectable?this.toggleSelectedState(n,s.options):this.toggleExpandedState(n,s.options),this.render())}},r.prototype.findNode=function(e){var t=e.closest("li.list-group-item").attr("data-nodeid"),o=this.nodes[t];return o||console.log("Error: node does not exist"),o},r.prototype.toggleExpandedState=function(e,t){e&&this.setExpandedState(e,!e.state.expanded,t)},r.prototype.setExpandedState=function(t,o,n){o!==t.state.expanded&&(o&&t.nodes?(t.state.expanded=!0,n.silent||this.$element.trigger("nodeExpanded",e.extend(!0,{},t))):o||(t.state.expanded=!1,n.silent||this.$element.trigger("nodeCollapsed",e.extend(!0,{},t)),t.nodes&&!n.ignoreChildren&&e.each(t.nodes,e.proxy(function(e,t){this.setExpandedState(t,!1,n)},this))))},r.prototype.toggleSelectedState=function(e,t){e&&this.setSelectedState(e,!e.state.selected,t)},r.prototype.setSelectedState=function(t,o,n){o!==t.state.selected&&(o?(this.options.multiSelect||e.each(this.findNodes("true","g","state.selected"),e.proxy(function(e,t){this.setSelectedState(t,!1,n)},this)),t.state.selected=!0,n.silent||this.$element.trigger("nodeSelected",e.extend(!0,{},t))):(t.state.selected=!1,n.silent||this.$element.trigger("nodeUnselected",e.extend(!0,{},t))))},r.prototype.toggleCheckedState=function(e,t){e&&this.setCheckedState(e,!e.state.checked,t)},r.prototype.setCheckedState=function(t,o,n){o!==t.state.checked&&(o?(t.state.checked=!0,n.silent||this.$element.trigger("nodeChecked",e.extend(!0,{},t))):(t.state.checked=!1,n.silent||this.$element.trigger("nodeUnchecked",e.extend(!0,{},t))))},r.prototype.setDisabledState=function(t,o,n){o!==t.state.disabled&&(o?(t.state.disabled=!0,this.setExpandedState(t,!1,n),this.setSelectedState(t,!1,n),this.setCheckedState(t,!1,n),n.silent||this.$element.trigger("nodeDisabled",e.extend(!0,{},t))):(t.state.disabled=!1,n.silent||this.$element.trigger("nodeEnabled",e.extend(!0,{},t))))},r.prototype.render=function(){this.initialized||(this.$element.addClass(i),this.$wrapper=e(this.template.list),this.injectStyle(),this.initialized=!0),this.$element.empty().append(this.$wrapper.empty()),this.buildTree(this.tree,0)},r.prototype.buildTree=function(t,o){if(t){o+=1;var n=this;e.each(t,function(t,i){for(var s=e(n.template.item).addClass("node-"+n.elementId).addClass(i.state.checked?"node-checked":"").addClass(i.state.disabled?"node-disabled":"").addClass(i.state.selected?"node-selected":"").addClass(i.searchResult?"search-result":"").attr("data-nodeid",i.nodeId).attr("style",n.buildStyleOverride(i)),r=0;o-1>r;r++)s.append(n.template.indent);var d=[];if(i.nodes?(d.push("expand-icon"),d.push(i.state.expanded?n.options.collapseIcon:n.options.expandIcon)):d.push(n.options.emptyIcon),s.append(e(n.template.icon).addClass(d.join(" "))),n.options.showIcon){var d=["node-icon"];d.push(i.icon||n.options.nodeIcon),i.state.selected&&(d.pop(),d.push(i.selectedIcon||n.options.selectedIcon||i.icon||n.options.nodeIcon)),s.append(e(n.template.icon).addClass(d.join(" ")))}if(n.options.showCheckbox){var d=["check-icon"];d.push(i.state.checked?n.options.checkedIcon:n.options.uncheckedIcon),s.append(e(n.template.icon).addClass(d.join(" ")))}return s.append(n.options.enableLinks?e(n.template.link).attr("href",i.href).append(i.text):i.text),n.options.showTags&&i.tags&&e.each(i.tags,function(t,o){s.append(e(n.template.badge).append(o))}),n.$wrapper.append(s),i.nodes&&i.state.expanded&&!i.state.disabled?n.buildTree(i.nodes,o):void 0})}},r.prototype.buildStyleOverride=function(e){if(e.state.disabled)return"";var t=e.color,o=e.backColor;return this.options.highlightSelected&&e.state.selected&&(this.options.selectedColor&&(t=this.options.selectedColor),this.options.selectedBackColor&&(o=this.options.selectedBackColor)),this.options.highlightSearchResults&&e.searchResult&&!e.state.disabled&&(this.options.searchResultColor&&(t=this.options.searchResultColor),this.options.searchResultBackColor&&(o=this.options.searchResultBackColor)),"color:"+t+";background-color:"+o+";"},r.prototype.injectStyle=function(){this.options.injectStyle&&!o.getElementById(this.styleId)&&e('<style type="text/css" id="'+this.styleId+'"> '+this.buildStyle()+" </style>").appendTo("head")},r.prototype.buildStyle=function(){var e=".node-"+this.elementId+"{";return this.options.color&&(e+="color:"+this.options.color+";"),this.options.backColor&&(e+="background-color:"+this.options.backColor+";"),this.options.showBorder?this.options.borderColor&&(e+="border:1px solid "+this.options.borderColor+";"):e+="border:none;",e+="}",this.options.onhoverColor&&(e+=".node-"+this.elementId+":not(.node-disabled):hover{background-color:"+this.options.onhoverColor+";}"),this.css+e},r.prototype.template={list:'<ul class="list-group"></ul>',item:'<li class="list-group-item"></li>',indent:'<span class="indent"></span>',icon:'<span class="icon"></span>',link:'<a href="#" style="color:inherit;"></a>',badge:'<span class="badge"></span>'},r.prototype.css=".treeview .list-group-item{cursor:pointer}.treeview span.indent{margin-left:10px;margin-right:10px}.treeview span.icon{width:12px;margin-right:5px}.treeview .node-disabled{color:silver;cursor:not-allowed}",r.prototype.getNode=function(e){return this.nodes[e]},r.prototype.getParent=function(e){var t=this.identifyNode(e);return this.nodes[t.parentId]},r.prototype.getSiblings=function(e){var t=this.identifyNode(e),o=this.getParent(t),n=o?o.nodes:this.tree;return n.filter(function(e){return e.nodeId!==t.nodeId})},r.prototype.getSelected=function(){return this.findNodes("true","g","state.selected")},r.prototype.getUnselected=function(){return this.findNodes("false","g","state.selected")},r.prototype.getExpanded=function(){return this.findNodes("true","g","state.expanded")},r.prototype.getCollapsed=function(){return this.findNodes("false","g","state.expanded")},r.prototype.getChecked=function(){return this.findNodes("true","g","state.checked")},r.prototype.getUnchecked=function(){return this.findNodes("false","g","state.checked")},r.prototype.getDisabled=function(){return this.findNodes("true","g","state.disabled")},r.prototype.getEnabled=function(){return this.findNodes("false","g","state.disabled")},r.prototype.selectNode=function(t,o){this.forEachIdentifier(t,o,e.proxy(function(e,t){this.setSelectedState(e,!0,t)},this)),this.render()},r.prototype.unselectNode=function(t,o){this.forEachIdentifier(t,o,e.proxy(function(e,t){this.setSelectedState(e,!1,t)},this)),this.render()},r.prototype.toggleNodeSelected=function(t,o){this.forEachIdentifier(t,o,e.proxy(function(e,t){this.toggleSelectedState(e,t)},this)),this.render()},r.prototype.collapseAll=function(t){var o=this.findNodes("true","g","state.expanded");this.forEachIdentifier(o,t,e.proxy(function(e,t){this.setExpandedState(e,!1,t)},this)),this.render()},r.prototype.collapseNode=function(t,o){this.forEachIdentifier(t,o,e.proxy(function(e,t){this.setExpandedState(e,!1,t)},this)),this.render()},r.prototype.expandAll=function(t){if(t=e.extend({},s.options,t),t&&t.levels)this.expandLevels(this.tree,t.levels,t);else{var o=this.findNodes("false","g","state.expanded");this.forEachIdentifier(o,t,e.proxy(function(e,t){this.setExpandedState(e,!0,t)},this))}this.render()},r.prototype.expandNode=function(t,o){this.forEachIdentifier(t,o,e.proxy(function(e,t){this.setExpandedState(e,!0,t),e.nodes&&t&&t.levels&&this.expandLevels(e.nodes,t.levels-1,t)},this)),this.render()},r.prototype.expandLevels=function(t,o,n){n=e.extend({},s.options,n),e.each(t,e.proxy(function(e,t){this.setExpandedState(t,o>0?!0:!1,n),t.nodes&&this.expandLevels(t.nodes,o-1,n)},this))},r.prototype.revealNode=function(t,o){this.forEachIdentifier(t,o,e.proxy(function(e,t){for(var o=this.getParent(e);o;)this.setExpandedState(o,!0,t),o=this.getParent(o)},this)),this.render()},r.prototype.toggleNodeExpanded=function(t,o){this.forEachIdentifier(t,o,e.proxy(function(e,t){this.toggleExpandedState(e,t)},this)),this.render()},r.prototype.checkAll=function(t){var o=this.findNodes("false","g","state.checked");this.forEachIdentifier(o,t,e.proxy(function(e,t){this.setCheckedState(e,!0,t)},this)),this.render()},r.prototype.checkNode=function(t,o){this.forEachIdentifier(t,o,e.proxy(function(e,t){this.setCheckedState(e,!0,t)},this)),this.render()},r.prototype.uncheckAll=function(t){var o=this.findNodes("true","g","state.checked");this.forEachIdentifier(o,t,e.proxy(function(e,t){this.setCheckedState(e,!1,t)},this)),this.render()},r.prototype.uncheckNode=function(t,o){this.forEachIdentifier(t,o,e.proxy(function(e,t){this.setCheckedState(e,!1,t)},this)),this.render()},r.prototype.toggleNodeChecked=function(t,o){this.forEachIdentifier(t,o,e.proxy(function(e,t){this.toggleCheckedState(e,t)},this)),this.render()},r.prototype.disableAll=function(t){var o=this.findNodes("false","g","state.disabled");this.forEachIdentifier(o,t,e.proxy(function(e,t){this.setDisabledState(e,!0,t)},this)),this.render()},r.prototype.disableNode=function(t,o){this.forEachIdentifier(t,o,e.proxy(function(e,t){this.setDisabledState(e,!0,t)},this)),this.render()},r.prototype.enableAll=function(t){var o=this.findNodes("true","g","state.disabled");this.forEachIdentifier(o,t,e.proxy(function(e,t){this.setDisabledState(e,!1,t)},this)),this.render()},r.prototype.enableNode=function(t,o){this.forEachIdentifier(t,o,e.proxy(function(e,t){this.setDisabledState(e,!1,t)},this)),this.render()},r.prototype.toggleNodeDisabled=function(t,o){this.forEachIdentifier(t,o,e.proxy(function(e,t){this.setDisabledState(e,!e.state.disabled,t)},this)),this.render()},r.prototype.forEachIdentifier=function(t,o,n){o=e.extend({},s.options,o),t instanceof Array||(t=[t]),e.each(t,e.proxy(function(e,t){n(this.identifyNode(t),o)},this))},r.prototype.identifyNode=function(e){return"number"==typeof e?this.nodes[e]:e},r.prototype.search=function(t,o){o=e.extend({},s.searchOptions,o),this.clearSearch({render:!1});var n=[];if(t&&t.length>0){o.exactMatch&&(t="^"+t+"$");var i="g";o.ignoreCase&&(i+="i"),n=this.findNodes(t,i),e.each(n,function(e,t){t.searchResult=!0})}return o.revealResults?this.revealNode(n):this.render(),this.$element.trigger("searchComplete",e.extend(!0,{},n)),n},r.prototype.clearSearch=function(t){t=e.extend({},{render:!0},t);var o=e.each(this.findNodes("true","g","searchResult"),function(e,t){t.searchResult=!1});t.render&&this.render(),this.$element.trigger("searchCleared",e.extend(!0,{},o))},r.prototype.findNodes=function(t,o,n){o=o||"g",n=n||"text";var i=this;return e.grep(this.nodes,function(e){var s=i.getNodeValue(e,n);return"string"==typeof s?s.match(new RegExp(t,o)):void 0})},r.prototype.getNodeValue=function(e,t){var o=t.indexOf(".");if(o>0){var i=e[t.substring(0,o)],s=t.substring(o+1,t.length);return this.getNodeValue(i,s)}return e.hasOwnProperty(t)?e[t].toString():n};var d=function(e){t.console&&t.console.error(e)};e.fn[i]=function(t,o){var n;return this.each(function(){var s=e.data(this,i);"string"==typeof t?s?e.isFunction(s[t])&&"_"!==t.charAt(0)?(o instanceof Array||(o=[o]),n=s[t].apply(s,o)):d("No such method : "+t):d("Not initialized, can not call method : "+t):"boolean"==typeof t?n=s:e.data(this,i,new r(this,e.extend(!0,{},t)))}),n||this}}(jQuery,window,document);

    /*!
* clipboard.js v1.7.1
* https://zenorocha.github.io/clipboard.js
*
* Licensed MIT © Zeno Rocha
*/
    !function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t,e,n;return function t(e,n,o){function i(a,c){if(!n[a]){if(!e[a]){var l="function"==typeof require&&require;if(!c&&l)return l(a,!0);if(r)return r(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){var n=e[a][1][t];return i(n||t)},u,u.exports,t,e,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(t,e,n){function o(t,e){for(;t&&t.nodeType!==i;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}var i=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var r=Element.prototype;r.matches=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector}e.exports=o},{}],2:[function(t,e,n){function o(t,e,n,o,r){var a=i.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}function i(t,e,n,o){return function(n){n.delegateTarget=r(n.target,e),n.delegateTarget&&o.call(t,n)}}var r=t("./closest");e.exports=o},{"./closest":1}],3:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},{}],4:[function(t,e,n){function o(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.fn(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return i(t,e,n);if(c.nodeList(t))return r(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function i(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function r(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return l(document.body,t,e,n)}var c=t("./is"),l=t("delegate");e.exports=o},{"./is":3,delegate:2}],5:[function(t,e,n){function o(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var o=window.getSelection(),i=document.createRange();i.selectNodeContents(t),o.removeAllRanges(),o.addRange(i),e=o.toString()}return e}e.exports=o},{}],6:[function(t,e,n){function o(){}o.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function o(){i.off(t,o),e.apply(n,arguments)}var i=this;return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,i=n.length;for(o;o<i;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],i=[];if(o&&e)for(var r=0,a=o.length;r<a;r++)o[r].fn!==e&&o[r].fn._!==e&&i.push(o[r]);return i.length?n[t]=i:delete n[t],this}},e.exports=o},{}],7:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","select"],r);else if(void 0!==o)r(n,e("select"));else{var a={exports:{}};r(a,i.select),i.clipboardAction=a.exports}}(this,function(t,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(e),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),c=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return a(t,[{key:"resolveOptions",value:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function t(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function t(){var e=this,n="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[n?"right":"left"]="-9999px";var o=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=o+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function t(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function t(){this.selectedText=(0,i.default)(this.target),this.copyText()}},{key:"copyText",value:function t(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function t(e){this.emitter.emit(e?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function t(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function t(){this.removeFake()}},{key:"action",set:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function t(){return this._action}},{key:"target",set:function t(e){if(void 0!==e){if(!e||"object"!==(void 0===e?"undefined":r(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function t(){return this._target}}]),t}();t.exports=c})},{select:5}],8:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","./clipboard-action","tiny-emitter","good-listener"],r);else if(void 0!==o)r(n,e("./clipboard-action"),e("tiny-emitter"),e("good-listener"));else{var a={exports:{}};r(a,i.clipboardAction,i.tinyEmitter,i.goodListener),i.clipboard=a.exports}}(this,function(t,e,n,o){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function l(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var s=i(e),u=i(n),f=i(o),d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),p=function(t){function e(t,n){r(this,e);var o=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return o.resolveOptions(n),o.listenClick(t),o}return c(e,t),h(e,[{key:"resolveOptions",value:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText,this.container="object"===d(e.container)?e.container:document.body}},{key:"listenClick",value:function t(e){var n=this;this.listener=(0,f.default)(e,"click",function(t){return n.onClick(t)})}},{key:"onClick",value:function t(e){var n=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s.default({action:this.action(n),target:this.target(n),text:this.text(n),container:this.container,trigger:n,emitter:this})}},{key:"defaultAction",value:function t(e){return l("action",e)}},{key:"defaultTarget",value:function t(e){var n=l("target",e);if(n)return document.querySelector(n)}},{key:"defaultText",value:function t(e){return l("text",e)}},{key:"destroy",value:function t(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],n="string"==typeof e?[e]:e,o=!!document.queryCommandSupported;return n.forEach(function(t){o=o&&!!document.queryCommandSupported(t)}),o}}]),e}(u.default);t.exports=p})},{"./clipboard-action":7,"good-listener":4,"tiny-emitter":6}]},{},[8])(8)});



    $.fn.setCursorPosition = function(pos) {
        this.each(function(index, elem) {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        });
        return this;
    };

    (function($){
        jQuery.fn.ipmask = function(opt){
            var param = $.extend({
                    ver: 'v4'
                }, opt),
                input,curVal = {}, key, selStart, selEnd,

                v4maskRegFull = new RegExp("^(25[0-5]|2[0-4][0-9]|[1][0-9]{2}|[1-9][0-9]|[0-9])(\\.(25[0-5]|2[0-4][0-9]|[1][0-9]{2}|[1-9][0-9]|[0-9])){3}$"),
                v4maskRegPart = new RegExp("^(25[0-5]|2[0-4][0-9]|[1][0-9]{2}|[1-9][0-9]|[0-9])((\\.)|(\\.(25[0-5]|2[0-4][0-9]|[1][0-9]{2}|[1-9][0-9]|[0-9])){0,1}){0,3}$"),
                v4maskDoubleDot = new RegExp("\\.\\."),

                placeholder = '  .  .  .  ',

                checkKey = function(val){

                    // test inputed char
                    if((v4maskRegPart.test(curVal.start+val+curVal.end) || v4maskRegPart.test(curVal.start+val+'.'+curVal.end)) && (!v4maskDoubleDot.test(curVal.start+val+curVal.end) || !v4maskDoubleDot.test(curVal.start+'.'+val+curVal.end))) return true;
                    else return false;
                },

                // test to add next dot
                addDot = function(key){

                    if(key != '.' && (!v4maskRegPart.test((curVal.start+key)+1+curVal.end) && v4maskRegPart.test(curVal.start+key+'.'+curVal.end))) {
                        return true;
                    }
                    return false;
                },

                setInput = function(str,selStart,key){
                    // get array: explode by dot and remove empty elements from array
                   var parts = $.grep(str.length?str.split('.'):[str],function(item){
                        return item != '';
                    });

                    if(parts.length<4) {

                        for(var i=(4-parts.length);i>0;i--){
                            parts.push('  ');
                        }
                    }
                    input.val(parts.join('.')).setCursorPosition(selStart+(addDot(key)?2:1));
                },

                onFocus = function(e){
                    // set placeholder
                    if(!$(this).val().length) $(this).val(placeholder).setCursorPosition(0);
                },

                onKeypress = function(e){
                    var k = e.which?e.which:e.keyCode;

                    // del firefox
                    if(k==46 && e.which==0) k=0;

                    // replace . and space for dot
                    if(k == 44 || k == 32) {
                        k = 46;
                    }

                    if((k!=0 && k!=8) && (e.ctrlKey || e.altKey || e.metaKey || k<=39)) return true;
                    else if(k!=0 && k!=8 && (k<48 && k>57)) return e.preventDefault();

                    input = $(this);
                    selStart = input[0].selectionStart;
                    selEnd = input[0].selectionEnd;
                    curVal.val = input.val();

                    // del all spaces and last dot
                    curVal.val = curVal.val.replace(/([ ]){1,2}(([ ]{0,2}\.{0,1}[ ]{0,2}){1,3})/,'');

                    curVal.start = curVal.val.substring(0,selStart); // before cursor
                    curVal.end = curVal.val.substring(selEnd); // after cursor
                    curVal.end = curVal.end == '.' ? '' : curVal.end; // remove if dot

                    var key = String.fromCharCode(k)?String.fromCharCode(k):'';

                    if(k==0){ //delete
                        curVal.end = curVal.end.substring(1);
                        selStart--;
                    }else if(k==8){ // backspace

                        // if need remove last dot
                        if(curVal.start.substring(curVal.start.length-2).search('\\.') >= 0) {
                            curVal.start = curVal.start.substring(0,curVal.start.length-1);
                            selStart-=2;
                        }

                        curVal.start = curVal.start.substring(0,curVal.start.length-1);
                        selStart--;
                    }

                    if(key){

                        if(checkKey(key)){
                            var str = curVal.start+key+curVal.end;

                        } else str = curVal.start+curVal.end;

                        setInput(str,selStart,key);

                    }

                    return e.preventDefault();
                },
                onBlur = function(){ if(!v4maskRegFull.test($(this).val())) $(this).val(''); }

            return this.on('keypress',onKeypress).on('blur',onBlur).on('focus',onFocus);
        };
    })(jQuery);


    function log($var) {
        return console.log($var);
    }


    //Resize inputs width depending theirs value
    function resizeInput() {
        $(this).attr('size', $(this).val().length);
    }

    $('input[type="text"]')
    // event handler
        .keyup(resizeInput)
        // resize on page load
        .each(resizeInput);


    //Tree structure

    function getTree() {
        // Some logic to retrieve, or generate tree structure
        return tree;
    }


    $('#tree').treeview({data: getTree(), levels: 5,enableLinks:true});


    var clipboard = new Clipboard('.list-group-item', {
        text: function(trigger) {
            return trigger.lastChild.getAttribute('href');
        }
    });


    clipboard.on('success', function(e) {
        $('.node-selected').notify("Link Copied!", {position: "bottom center", className: 'success'});
        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        $('.node-selected').notify("Error, use a standard copy!", {position: "bottom center", className: 'error'});
        e.clearSelection();
    });


    $('#copy-button').tooltip();

    // When the copy button is clicked, select the value of the text box, attempt
    // to execute the copy command, and trigger event to update tooltip message
    // to indicate whether the text was successfully copied.
    $('#copy-button').bind('click', function() {
        var input = document.querySelector('#randomMain');
        input.setSelectionRange(0, input.value.length + 1);
        try {
            var success = document.execCommand('copy');
            if (success) {
                $('#copy-button').trigger('copied', ['Copied!']);
            } else {
                $('#copy-button').trigger('copied', ['Copy with Ctrl-c']);
            }
        } catch (err) {
            $('#copy-button').trigger('copied', ['Copy with Ctrl-c']);
        }
    });

    // Handler for updating the tooltip message.
    $('#copy-button').bind('copied', function(event, message) {
        $(this).attr('title', message)
            .tooltip('fixTitle')
            .tooltip('show')
            .attr('title', "Copy to Clipboard")
            .tooltip('fixTitle');
    });



    function copyToClipboard(text, el) {
        var copyTest = document.queryCommandSupported('copy');
        var elOriginalText = el.attr('data-original-title');

        if (copyTest === true) {
            var copyTextArea = document.createElement("textarea");
            copyTextArea.value = text;
            document.body.appendChild(copyTextArea);
            copyTextArea.select();
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'Copied!' : 'Whoops, not copied!';
                el.attr('data-original-title', msg).tooltip('show');
            } catch (err) {
                console.log('Oops, unable to copy');
            }
            document.body.removeChild(copyTextArea);
            el.attr('data-original-title', elOriginalText);
        } else {
            // Fallback if browser doesn't support .execCommand('copy')
            window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
        }
    }

        // Initialize
        // ---------------------------------------------------------------------

        // Tooltips
        // Requires Bootstrap 3 for functionality
        $('.js-tooltip').tooltip();

        // Copy to clipboard
        // Grab any text in the attribute 'data-copy' and pass it to the
        // copy function
        $('.js-copy').click(function() {
            var text = $(this).attr('data-copy');
            var el = $(this);
            copyToClipboard(text, el);
        });


    // Javascript to enable link to tab
    var hash = document.location.hash;
    var prefix = "tab_";
    if (hash) {
        $('.nav-tabs a[href="'+hash.replace(prefix,"")+'"]').tab('show');
    }

// Change hash for page-reload
    $('.nav-tabs a').on('shown', function (e) {
        window.location.hash = e.target.hash.replace("#", "#" + prefix);
    });




    $(function () {

        var activitiesReloadInterval = 30000
        var activitiesReloadTimer = setInterval(function(){
            console.log('default')
            $('.reload-activity').trigger('click')
        }, activitiesReloadInterval )


        $('.submit-options').click(function (e) {
            e.preventDefault();
            var formData = $('.esw-options').serializeArray();
            // console.log(formData);
            $.ajax({
                type: "POST",
                url: 'e-store-options',
                data: formData,
                dataType: "json"
            }).done(function (data) {
                $('.submit-options').notify("Saved", {position: "bottom", className: 'success'});
                location.reload();
            });
        });

        $('.remove-activity').click(function (e) {
            e.preventDefault();
            // console.log(formData);

            $.ajax({
                type: "POST",
                url: ajaxurl,
                data: {
                    action: 'e_store_remove_activity'
                },
            }).done(function (data) {
                $('.reload-activity').click()
            });

            // $.ajax({
            //     type: "POST",
            //     url: 'e-store-remove-activity',
            //     data: '1',
            //     dataType: "json"
            // }).done(function (data) {
            //     $('.remove-activity').notify("Saved", {position: "bottom", className: 'success'});
            //     location.reload();
            // });
        });

        //New features

        $('.reload-activity').click(function (e) {
            e.preventDefault();

            $.ajax({
                type: "POST",
                url: ajaxurl,
                data: {
                    action: 'e_store_reload_activity'
                },
            }).done(function (data) {
                $('#activity-table').html(data)
            });
        });

        $('.activity-orderby').change(function(event) {

            $.ajax({
                type: "POST",
                url: ajaxurl,
                data: {
                    action: 'e-store-sort-activity',
                    orderby: $(this).val()
                },
            }).done(function (data) {

                $('#activity-table').html(data)
            });
        });

        $('.autoreload-time').change(function(event) {

            clearInterval( activitiesReloadTimer )

            if ( 'disable' == $( this).val() ) {
                return false
            };

            activitiesReloadInterval = $(this).val() * 1000

            activitiesReloadTimer = setInterval(function(){
                console.log('changed')
                $('.reload-activity').trigger('click')
            }, activitiesReloadInterval )

        })

        //End new features


        $('#ip-ban').ipmask();

        $('.add-ip-ban').click(function (e) {
            e.preventDefault();
            var ipData = $('#ip-ban').val();
            $.ajax({
                type: "POST",
                url: 'e-store-add-ip',
                data: {'ip_ban':ipData},
            }).done(function (data) {
                $('.add-ip-ban').notify("Saved", {position: "bottom", className: 'success'});
                getIpBansTable();
            });
        });

        $('.remove-ban-ip').click(function (e) {
            e.preventDefault();
            var ipID = $(this).data('id');
            $.ajax({
                type: "POST",
                url: 'e-store-remove-ip',
                data: {'ip_id': ipID},
            }).done(function (data) {
                getIpBansTable();
            });
        });


        $('.add-ua-ban').click(function (e) {
            e.preventDefault();
            var uaData = $('#ua-ban').val();
            $.ajax({
                type: "POST",
                url: 'e-store-add-ua',
                data: {'ua_ban': uaData},
            }).done(function (data) {
                $('.add-ua-ban').notify("Saved", {position: "bottom", className: 'success'});
                getUABansTable();
            });
        });

        $('.remove-ban-ua').click(function (e) {
            e.preventDefault();
            var uaID = $(this).data('id');
            $.ajax({
                type: "POST",
                url: 'e-store-remove-ua',
                data: {'ua_id': uaID},
            }).done(function (data) {
                getUABansTable();
            });
        });

          $('.start-ua-import').click(function (e) {
            e.preventDefault();
              var file = document.getElementById('ua-bulk').files[0];
              var reader = new FileReader();
              reader.readAsText(file, 'UTF-8');
              reader.onload = shipOffUA;
        });

        $('.start-ip-import').click(function (e) {
            e.preventDefault();
              var file = document.getElementById('ip-bulk').files[0];
              var reader = new FileReader();
              reader.readAsText(file, 'UTF-8');
              reader.onload = shipOffIP;
        });




    });

    function shipOffUA(event) {
        var result = event.target.result;
        var fileName = document.getElementById('ua-bulk').files[0].name;
        var res= result.split('\n').map(function(s) { return s.replace(/^\s*|\s*$/g, ""); }).filter(function(x) { return x; });
        $.post('/e-store-ua-bulk/', { data: res, name: fileName }).done(function (data) {
            console.log(data);
            getUABansTable();
        });
    }

    function shipOffIP(event) {
        var result = event.target.result;
        var fileName = document.getElementById('ip-bulk').files[0].name;
        var res= result.split('\n').map(function(s) { return s.replace(/^\s*|\s*$/g, ""); }).filter(function(x) { return x; });
        $.post('/e-store-ip-bulk/', { data: res, name: fileName }).done(function (data) {
            console.log(data);
            getIpBansTable();
        });
    }

    function getIpBansTable() {
        $.ajax({
            type: "POST",
            url: 'e-store-ajax-ip',
            data: {'get_ip_data': '1'},
        }).done(function (html) {
            $('.ip-bans').html(html);
        });
    }

    function getUABansTable() {
        $.ajax({
            type: "POST",
            url: 'e-store-ajax-ua',
            data: {'get_ua_data': '1'},
        }).done(function (html) {
            $('.ua-bans').html(html);
        });
    }






})(jQuery);
