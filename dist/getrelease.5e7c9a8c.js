!function(){function t(t,e,s,n){return new Promise((r,o)=>{const a=new XMLHttpRequest;if(a.open(t,e,!0),a.responseType="json",s&&Array.isArray(s))for(let t=0;t<s.length;t++)a.setRequestHeader(s[t].name,s[t].value);a.onload=()=>{a.status>=400?o({httpStatus:a.status,response:a.response}):r({httpStatus:a.status,response:a.response})},a.onerror=()=>{o({httpStatus:0,response:"Error"})},a.send(JSON.stringify(n))})}var e={sendHttpRequest:t,sendHttpRequestGet:function(e,s){return t("GET",e,s)},sendHttpRequestPost:function(e,s,n){return t("POST",e,s,n)}};const s=document.getElementById("stable-release"),n=document.getElementById("nightly-release");e.sendHttpRequestGet("https://api.github.com/repos/nim-lang/Nim/tags",null).then(({httpStatus:t,response:e})=>{s.textContent="Stable "+e[0].name}).catch(({httpStatus:t,response:e})=>{console.log("Error has occurred while trying to get the latest release!"),s.textContent="Stable v?.?.?"}),e.sendHttpRequestGet("https://api.github.com/repos/nim-lang/nightlies/releases/latest",null).then(({httpStatus:t,response:e})=>{const s=e.tag_name.split("-"),r=s[1],o=s[2];n.textContent=`Nightly ${r}-${o}`}).catch(({httpStatus:t,response:e})=>{console.log("Error has occurred while trying to get the latest release!"),n.textContent="Nightly ??-??"})}();
//# sourceMappingURL=getrelease.5e7c9a8c.js.map