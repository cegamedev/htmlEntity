# htmlEntity，富文本编辑，JSON序列化，正则替换

## 项目遇到的问题及原因
问题：小程序富文本展示页面某些部分直接显示代码  
原因：  
uEditor富文本编辑时，会在domElement属性里插入‘\&quot;’，如下：
```
<span style="font-family: &quot;Malgun Gothic&quot;;">
  测试乱码
</span>
```  
后端获取到富文本字符串，<font color="orange">暴力的将所有双引号转化成单引号，</font>转化后如下：
```
<span style='font-family: &quot;Malgun Gothic&quot;;'>
  测试乱码
</span>
``` 
历史代码，转化原因不清楚。但是转换后破坏了html书写规范，html规范属性用双引号。  
小程序富文本展示用的是wxParse组件，该组件默认将‘\&quot;’转化成单引号。所以最后得到的字符串如下：
```
<span style='font-family: 'Malgun Gothic';'>
  测试乱码
</span>
``` 
导致页面无法渲染，直接展示源码。

## 解决办法  
- 所有的富文本编辑器保存时，不做双引号转单引号处理，保持html规范。  
- ‘\&quot;’或‘\&#34;’代表的是双引号，如果在domElement属性里，统一转换成‘\&#39;’单引号，属性以外保持原样不做转化。  
- htmlEntity转换代码如下:
```
// 将dom元素属性里的双引号实体转化为单引号实体，兼容h5和小程序

const reg1 = /<(.*?)>/g // 匹配<>里的内容
const reg2 = /&quot;|&#34;/g // 匹配双引号实例

// 查找并替换
let res = strr.replace(reg1,(p1,p2)=>{
  return p1.replace(reg2,'&#39;')
});
```

## 知识点
- 正则表达式的书写，replace函数回调的用法
- htmlEntity的了解
- html书写规范
- json序列化与反序列化，注意：‘\’转义，字符串变量书写形式与实际值的区别。  
JSON.parse()先提取入参字符串的实际值会有一次转义，解析对象时还会有一次转义。
```

// 例一：
const str = `<p style="color:&quot;red&quot;;">"hello"</p>`;
const obj = {str};
const jsonstr = JSON.stringify(obj);
console.log(jsonstr); 
// 输出 {"str":"<p style=\"color:&quot;red&quot;;\">\"hello\"</p>"}
const jsonobj = JSON.parse(jsonstr);
console.log(jsonobj);
// 输出 { str: '<p style="color:&quot;red&quot;;">"hello"</p>' }


// 例二：
const consolestr = '{"str":"<p style=\"color:&quot;red&quot;;\">\"hello\"</p>"}';
const consoleobj = JSON.parse(consolestr);
console.log(consoleobj);
// 报错 json解析失败

// 例三：
const consolestr = '{"str":"<p style=\\"color:&quot;red&quot;;\\">\\"hello\\"</p>"}';
const consoleobj = JSON.parse(consolestr);
console.log(consoleobj);
// 输出 { str: '<p style="color:&quot;red&quot;;">"hello"</p>' }

// 例子四：
const str = '\\\\'; // 字符串的书写形式
console.log(str);
// 输出 \\ 代表字符串的实际值是：\\

结论：字符串的书写形式和实际值是不一样的。同样的'\\'如果在mysql表中看到，那么就代表字符串实际的值是'\\'，因为后端一般会将数据表映射到对象上；如果在代码中看到就代表字符串的书写形式，而实际值是'\'。

```

## 常用htmlEntity对照表
Character |	Entity Name |	Entity Number(十进制)  
| ---- | ---- | ----  
[space] | \&nbsp;	| \&#32;  
\! |	\&excl; |	\&#33;
\" |	\&quot; | \&#34;
\#	| \&num; |	\&#35;
\$	| \&dollar; | \&#36;
\%	| \&percnt;	| \&#37;
\&	| \&amp; | \&#38;
\'	| \&apos;	| \&#39;
\(	| \&lpar;	| \&#40;
\)	| \&rpar;	| \&#41;
\*	| \&ast;	| \&#42;
\+	| \&plus;	| \&#43;
\,	| \&comma; | \&#44;
\-	| \&hyphen; | \&#45;
\.	| \&period;	| \&#46;
\/	| \&sol; | \&#47;
\:	| \&colon; | \&#58;
\;	| \&semi;	| \&#59;
\<	| \&lt;	| \&#60;
\=	| \&equals;	| \&#61;
\>	| \&gt;	| \&#62;
\?	| \&quest; | \&#63;
\@	| \&commat; | \&#64;
\[	| \&lsqb; | \&#91;
\\	| \&bsol; | \&#92;
\]	| \&rsqb;	| \&#93;
\^	| \&circ;	| \&#94;
\_	| \&lowbar;	| \&#95;
\`	| \&grave;	| \&#96;
\{	| \&lcub;	| \&#123;
\|	| \&verbar;	| \&#124;
\}	| \&rcub;	| \&#125;
\~	| \&tilde;	| \&#126;  

## 参考资料  
[正则表达式](https://www.runoob.com/regexp/regexp-syntax.html)  
[htmlEntity](https://www.cnblogs.com/polk6/p/html-entity.html)  


