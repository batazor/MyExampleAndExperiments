(function(a){var k=[],f=[];a.fn.doAutosize=function(e){var c=a(this).data("minwidth"),b=a(this).data("maxwidth"),d="",g=a(this),h=a("#"+a(this).data("tester_id"));d!==(d=g.val())&&(d=d.replace(/&/g,"&amp;").replace(/\s/g," ").replace(/</g,"&lt;").replace(/>/g,"&gt;"),h.html(d),h=h.width(),e=h+e.comfortZone>=c?h+e.comfortZone:c,h=g.width(),(e<h&&e>=c||e>c&&e<b)&&g.width(e))};a.fn.resetAutosize=function(e){var c=a(this).data("minwidth")||e.minInputWidth||a(this).width();e=a(this).data("maxwidth")||
e.maxInputWidth||a(this).closest(".tagsinput").width()-e.inputPadding;var b=a(this),d=a("<tester/>").css({position:"absolute",top:-9999,left:-9999,width:"auto",fontSize:b.css("fontSize"),fontFamily:b.css("fontFamily"),fontWeight:b.css("fontWeight"),letterSpacing:b.css("letterSpacing"),whiteSpace:"nowrap"}),g=a(this).attr("id")+"_autosize_tester";0<!a("#"+g).length&&(d.attr("id",g),d.appendTo("body"));b.data("minwidth",c);b.data("maxwidth",e);b.data("tester_id",g);b.css("width",c)};a.fn.addTag=function(e,
c){c=jQuery.extend({focus:!1,callback:!0},c);this.each(function(){var b=a(this).attr("id"),d=a(this).val().split(k[b]);""==d[0]&&(d=[]);e=jQuery.trim(e);if(c.unique){var g=a(this).tagExist(e);!0==g&&a("#"+b+"_tag").addClass("not_valid")}else g=!1;if(""!=e&&!0!=g&&(a("<span>").addClass("tag").append(a("<span>").text(e).append("&nbsp;&nbsp;"),a("<a>",{href:"#",title:"Removing tag",text:"x"}).click(function(){return a("#"+b).removeTag(escape(e))})).insertBefore("#"+b+"_addTag"),d.push(e),a("#"+b+"_tag").val(""),
c.focus?a("#"+b+"_tag").focus():a("#"+b+"_tag").blur(),a.fn.tagsInput.updateTagsField(this,d),c.callback&&f[b]&&f[b].onAddTag&&(g=f[b].onAddTag,g.call(this,e)),f[b]&&f[b].onChange)){var h=d.length,g=f[b].onChange;g.call(this,a(this),d[h-1])}});return!1};a.fn.removeTag=function(e){e=unescape(e);this.each(function(){var c=a(this).attr("id"),b=a(this).val().split(k[c]);a("#"+c+"_tagsinput .tag").remove();str="";for(i=0;i<b.length;i++)b[i]!=e&&(str=str+k[c]+b[i]);a.fn.tagsInput.importTags(this,str);f[c]&&
f[c].onRemoveTag&&f[c].onRemoveTag.call(this,e)});return!1};a.fn.tagExist=function(e){var c=a(this).attr("id"),c=a(this).val().split(k[c]);return 0<=jQuery.inArray(e,c)};a.fn.importTags=function(e){id=a(this).attr("id");a("#"+id+"_tagsinput .tag").remove();a.fn.tagsInput.importTags(this,e)};a.fn.tagsInput=function(e){var c=jQuery.extend({interactive:!0,defaultText:"add a tag",minChars:0,width:"300px",height:"100px",autocomplete:{selectFirst:!1},hide:!0,delimiter:",",unique:!0,removeWithBackspace:!0,
placeholderColor:"#666666",autosize:!0,comfortZone:20,inputPadding:12},e);this.each(function(){c.hide&&a(this).hide();var b=a(this).attr("id");if(!b||k[a(this).attr("id")])b=a(this).attr("id","tags"+(new Date).getTime()).attr("id");var d=jQuery.extend({pid:b,real_input:"#"+b,holder:"#"+b+"_tagsinput",input_wrapper:"#"+b+"_addTag",fake_input:"#"+b+"_tag"},c);k[b]=d.delimiter;if(c.onAddTag||c.onRemoveTag||c.onChange)f[b]=[],f[b].onAddTag=c.onAddTag,f[b].onRemoveTag=c.onRemoveTag,f[b].onChange=c.onChange;
var e='<div id="'+b+'_tagsinput" class="tagsinput"><div id="'+b+'_addTag">';c.interactive&&(e=e+'<input id="'+b+'_tag" value="" data-default="'+c.defaultText+'" />');a(e+'</div><div class="tags_clear"></div></div>').insertAfter(this);a(d.holder).css("width",c.width);a(d.holder).css("min-height",c.height);a(d.holder).css("height",c.height);""!=a(d.real_input).val()&&a.fn.tagsInput.importTags(a(d.real_input),a(d.real_input).val());if(c.interactive){a(d.fake_input).val(a(d.fake_input).attr("data-default"));
a(d.fake_input).css("color",c.placeholderColor);a(d.fake_input).resetAutosize(c);a(d.holder).bind("click",d,function(c){a(c.data.fake_input).focus()});a(d.fake_input).bind("focus",d,function(c){a(c.data.fake_input).val()==a(c.data.fake_input).attr("data-default")&&a(c.data.fake_input).val("");a(c.data.fake_input).css("color","#000000")});if(void 0!=c.autocomplete_url){autocomplete_options={source:c.autocomplete_url};for(attrname in c.autocomplete)autocomplete_options[attrname]=c.autocomplete[attrname];
void 0!==jQuery.Autocompleter?(a(d.fake_input).autocomplete(c.autocomplete_url,c.autocomplete),a(d.fake_input).bind("result",d,function(d,e,f){e&&a("#"+b).addTag(e[0]+"",{focus:!0,unique:c.unique})})):void 0!==jQuery.ui.autocomplete&&(a(d.fake_input).autocomplete(autocomplete_options),a(d.fake_input).bind("autocompleteselect",d,function(b,d){a(b.data.real_input).addTag(d.item.value,{focus:!0,unique:c.unique});return!1}))}else a(d.fake_input).bind("blur",d,function(b){var d=a(this).attr("data-default");
""!=a(b.data.fake_input).val()&&a(b.data.fake_input).val()!=d?b.data.minChars<=a(b.data.fake_input).val().length&&(!b.data.maxChars||b.data.maxChars>=a(b.data.fake_input).val().length)&&a(b.data.real_input).addTag(a(b.data.fake_input).val(),{focus:!0,unique:c.unique}):(a(b.data.fake_input).val(a(b.data.fake_input).attr("data-default")),a(b.data.fake_input).css("color",c.placeholderColor));return!1});a(d.fake_input).bind("keypress",d,function(b){if(b.which==b.data.delimiter.charCodeAt(0)||13==b.which)return b.preventDefault(),
b.data.minChars<=a(b.data.fake_input).val().length&&(!b.data.maxChars||b.data.maxChars>=a(b.data.fake_input).val().length)&&a(b.data.real_input).addTag(a(b.data.fake_input).val(),{focus:!0,unique:c.unique}),a(b.data.fake_input).resetAutosize(c),!1;b.data.autosize&&a(b.data.fake_input).doAutosize(c)});d.removeWithBackspace&&a(d.fake_input).bind("keydown",function(b){if(8==b.keyCode&&""==a(this).val()){b.preventDefault();b=a(this).closest(".tagsinput").find(".tag:last").text();var c=a(this).attr("id").replace(/_tag$/,
"");b=b.replace(/[\s]+x$/,"");a("#"+c).removeTag(escape(b));a(this).trigger("focus")}});a(d.fake_input).blur();d.unique&&a(d.fake_input).keydown(function(b){(8==b.keyCode||String.fromCharCode(b.which).match(/\w+|[\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1,/]+/))&&a(this).removeClass("not_valid")})}});return this};a.fn.tagsInput.updateTagsField=function(e,c){var b=a(e).attr("id");a(e).val(c.join(k[b]))};a.fn.tagsInput.importTags=function(e,c){a(e).val("");var b=a(e).attr("id"),
d=c.split(k[b]);for(i=0;i<d.length;i++)a(e).addTag(d[i],{focus:!1,callback:!1});f[b]&&f[b].onChange&&f[b].onChange.call(e,e,d[i])}})(jQuery);