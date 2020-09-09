/**
 * https://www.cnblogs.com/polk6/p/html-entity.html
 */
let str = `
<p style="font-family: &quot;&#34;Malgun Gothic&quot;&#34;;">
<span style="font-family: &quot;&#34;Malgun Gothic&quot;&#34;;">测&#34;试&quot;乱&#34;码</&quot;&#34;span>
<div>dadf</div>
</p>
`;

// let strr = `{"str":"<p style=\"color:&quot;red&quot;;\">\"hello\"</p>"}`;

const reg1 = /<(.*?)>/g
const reg2 = /&quot;|&#34;/g

// console.log(strr.match(reg1))

let res = str.replace(reg1,(p1,p2)=>{
  return p1.replace(reg2,'&#39;')
});

// // 将dom元素属性里的双引号实体转化为单引号实体，兼容h5和小程序
// let res = strr.replace(/<(.*?)>/g,(p1,p2)=>{
//   return p1.replace(/&quot;|&#34;/g,'&#39;')
// });

console.log(res);



// let str2 = `
// <p style='font-family: &quot;&#34;Malgun Gothic&quot;&#34;;'>
// <span style='font-family: &quot;&#34;Malgun Gothic&quot;&#34;;'>测&#34;试&quot;乱&#34;码</&quot;&#34;span>
// <div>dadf</div>
// </p>
// `;

// let res2 = str2.replace(/'/g,"\"");
// console.log(res2);

// let str3 = `
// <p style='font-family: &quot;&#34;Malgun Gothic&quot;&#34;;'>
// <span style='font-family: &quot;&#34;Malgun Gothic&quot;&#34;;'>测&#34;试&quot;乱&#34;码</&quot;&#34;span>
// <div>dadf</div>
// </p>
// `;

// console.log(str3.match(/<[^>]*&quot;[^>]*>/g));

// console.log(str3.match(/(font-family)/));