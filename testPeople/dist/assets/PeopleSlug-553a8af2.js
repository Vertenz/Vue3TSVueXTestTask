import{_ as p,o,c as u,p as i,f as v,a as t,d as f,s as h,r as _,v as g,k as m,w as y,T as x,l as b,j as d}from"./index-6df54288.js";import{P as k}from"./PeopleTable-916ba11f.js";const w={},c=a=>(i("data-v-cedb9049"),a=a(),v(),a),S={class:"lds-facebook"},P=c(()=>t("div",null,null,-1)),T=c(()=>t("div",null,null,-1)),I=c(()=>t("div",null,null,-1)),B=[P,T,I];function L(a,n){return o(),u("div",S,B)}const $=p(w,[["render",L],["__scopeId","data-v-cedb9049"]]),C={class:"people--slug"},D=f({__name:"PeopleSlug",setup(a){const n=h(),l=_(!0),s=_(null),r=async()=>{try{const e=await b.get(`https://swapi.dev/api/people/${n.params.id}`);s.value=[e==null?void 0:e.data]}catch(e){console.warn("PeopleSlug/fetchData get error: ",e)}};return g(async()=>{await r(),setTimeout(()=>{s.value&&s.value.length&&(l.value=!1)},500)}),(e,N)=>(o(),u("section",C,[m(x,{name:"fade"},{default:y(()=>[l.value?(o(),d($,{key:0})):(o(),d(k,{key:1,people:s.value,"is-slug-page":""},null,8,["people"]))]),_:1})]))}});const E=p(D,[["__scopeId","data-v-bae2d57c"]]);export{E as default};