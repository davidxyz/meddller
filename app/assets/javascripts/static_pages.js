/*might make it easier for javascripters or add this as funcitonality to medplus accounts
$("#submit_post").on('click',function(){
	$this=$(this);//cacheing
	$this.attr('href','#');
	if($this.text()=="post"){
	$("#micropost_form").css('display','block');
	$this.text("cancel");
	}else{
		$("#micropost_form").css('display','none');
		$this.text("post");
	}
});*/
/*javascript relating to micropost data*/
var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};
function conv(host, url){
if(!/^(http:\/\/)/.test(url)){//its relative
var urlx= "http://"+host+url;

console.log("host: "+host+" "+"url: "+url+" rel and is now abs: "+urlx);
return urlx;
}
console.log("host: "+host+" "+"url: "+url+"is abs");
//else
return url;
}
var l = getLocation("http://example.com/path");
$("#link_post").on('click', function(){
		$this=$(this);//cacheing
		$this.attr('href','#');
		if($this.text()=="self post?"){
		$("label:first").hide();
		$("#micropost_urls").hide();
		$this.text("link post?");
		$("#micropost_form_title").text("Self post");
		}else{
			$("label:first").show();
			$("#micropost_urls").show();
			$this.text("self post?");
			$("#micropost_form_title").text("Link post");
		}
});
$("#link_post2").on('click', function(){
		$this=$(this);//cacheing
		$this.attr('href','#');
		if($this.text()=="image upload?"){
		$("label:first").hide();
		$("#micropost_urls").hide();
		$this.text("link post?");
		$("#micropost_form_title").text("Self post");
		}else{
			$("label:first").show();
			$("#micropost_urls").show();
			$this.text("image upload?");
			$("#micropost_form_title").text("Upload");
		}
});
$("textarea.comment_form_content").on('mouseup',function(){
	$this=$(this);
	$parent=$(".new_comment");
	$parent2=$(".comment_form_container");
	if(Math.abs($parent.height()-$this.height())<100 ||$this.height()>$parent.height()){
		$parent.height($parent.height()+60);
		$parent2.height($parent.height()+30);
	}else if(Math.abs($this.height()-$parent.height())>100){
		$parent.height($this.height()+130);
		$parent2.height($parent.height()+30);
	}
})

/*form validations for submit1 page*/
$('#preview_url').on('keydown',function(){
var url_message=$('.url_message p');
$this=$('#preview_url');
var img=$(".v_img");
if(!img.hasClass("hide")){img.attr("src","/assets/ajax-loader.gif");}
img.removeClass("hide");
setTimeout(function(){
	$.ajax({
		type: "PUT",
  		dataType: "json",
  		url: 'show_urls',
  		data: {urls:$this.val()},
	}).done(function(response){
		if(response.valid){
			img.attr("src","/assets/check.png");
			url_message.text("pick what you want your preview to be?");
			//response.urls array of img urls
			slider=$(".previewslider_wrapper");
			slider.empty();
			var host = getLocation($this.val());
			$.each(response.urls, function(index,value){
				response.urls[index]=conv(host.hostname,value);
				if(index<3){
				var image=$(document.createElement('img'));
				image.attr('src',conv(host.hostname,value));
				//console.log(convert(value,host));
				image.attr('id','img'+index.toString());
				image.appendTo(slider);
				}

			});
			if(response.urls.length==2){
				p=$(document.createElement("p"));
				p.text('>');
				p.addClass('nav_right');
				p.insertAfter($('#img0'));
			}else if(response.urls.length>2){
				p=$(document.createElement("p"));
				p2=$(document.createElement("p"));
				p.text('>');
				p2.text('<');
				p.addClass('nav_right');
				p2.addClass('nav_left');
				p.insertAfter($('#img2'));
				p2.insertBefore($('#img0'));
			}
			slider.data({'urls':response.urls,'index':1});
		}else{
			img.attr("src","/assets/cross.png");
			if ($this.val()==""){url_message.text("Got to link to something interesting?");}
			else{url_message.text("Uhh you sure thats a website?");}
		}
	});
	},1000);
});
$(document).on('click',".nav_left",function(event){
	var nav=$(".nav_left");
	var images=$(".previewslider_wrapper img");
	var slider=$(".previewslider_wrapper");
	var urls=slider.data('urls');
	var index=slider.data('index');
	var len=urls.length;
	//switcheroo
			if(len>2){
			$('#img1').attr('src',urls[(index-2)%len]);
			$('#img2').attr('src',urls[(index-1)%len]);
			$('#img3').attr('src',urls[(index)%len]);
			}else if(urls.length>1){
			$('#img1').attr('src',urls[(index-2)%len]);
			$('#img2').attr('src',urls[(index-1)%len]);
			}else if(urls.length==1){

			}
			slider.data('index',(index-1)%len);
});
$(document).on('click',".nav_right",function(event){
	var images=$(".previewslider_wrapper img");
	var slider=$(".previewslider_wrapper");
	var nav=$(".nav_right");
	var urls=slider.data('urls');
	var index=slider.data('index');
	var len=urls.length;
	//switcheroo

			if(len>2){
			$('#img1').attr('src',urls[(index)%len]);
			$('#img2').attr('src',urls[(index+1)%len]);
			$('#img3').attr('src',urls[(index+2)%len]);
			}else if(urls.length>1){
			$('#img1').attr('src',urls[(index)%len]);
			$('#img2').attr('src',urls[(index+1)%len]);
			}else if(urls.length==1){

			}
			slider.data('index',(index+1)%len);
});

$('.form_title').on('keydown',function(){
var title_message=$('.title_message p');
$this=$(this);
var img=$(".v_img1");
if(!img.hasClass("hide")){img.attr("src","/assets/ajax-loader.gif");}
img.removeClass("hide");
setTimeout( function(){
	if($this.val().length<4){
		img.attr("src","/assets/cross.png");
		title_message.text("C'mon your title is important");
	}else{
		img.attr("src","/assets/check.png");
		title_message.text("nice");
	}
},1000);
});
/*$("[title]").load(function(){
$(this).attr('data-title',$(this).attr('title'));
$(this).removeAttr('title');
})
$(document).on('mouseover',"[data-title]",function(event){
//stylish tooltips
var tooltip=$(document.createElement('div'));
	tooltip.addClass('tooltip');
	tooltip.insertBefore($(this));
});*/
//search dropdown
$("#search").on('click',function(){
if($('#search_bar').length<1){
var search=$(document.createElement('div'));
search.attr('id','search_bar');
search.insertAfter($(".navbar"));
}else{
$('#search_bar').remove();
}
});
$(document).on("ready",".logo.sloth",function(event){

});

/*$("#file").load(function(){
	$(this).hide();
	$("#dropbox").removeClass("hide");
	console.log("hi");
});
$("#file").trigger('load');*/
/*$(document).on('mousemove',function(e){
          if(Math.abs(e.pageY-$(this).height())){
		
		}
});*/
/*medplus acc added functionality*/