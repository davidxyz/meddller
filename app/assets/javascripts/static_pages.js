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

function addMask(thing,classname){
	if(typeof thing ==='undefined'){
		//then its obviously a dialog
		thing=$(document.createElement('div'))
		thing.addClass(classname);
		thing.appendTo($(document));
	}
	 var maskHeight = $(document).height();
        var maskWidth = $(window).width();
     //make the mask
     var mask=$(document.createElement('div'));
     var close=$(document.createElement('div'));
     mask.attr('id','mask');close.addClass('close');
     close.appendTo(mask);
     thing.addClass('window');
     mask.appendTo($(document));

        //Set height and width to mask to fill up the whole screen
        $('#mask').css({'width':maskWidth,'height':maskHeight});
        //transition effect     
        $('#mask').fadeIn(1000);    
        $('#mask').fadeTo("slow",0.8);  
     
        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();
               
        //Set the popup window to center
        thing.css('top',  winH/2-thing.height()/2);
        thing.css('left', winW/2-thing.width()/2);
     
        //transition effect
        thing.fadeIn(2000); 
     
    //if close button is clicked
    $('.window .close').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();
        $('#mask, .window').hide();
        $($this).removeAttr("disabled");
    });     
     
    //if mask is clicked
    $('#mask').click(function () {
        $(this).hide();
        $('.window').hide();
        $($this).removeAttr("disabled");
    });

}
$(".mnav_right").text(">");
$(".mnav_left").text("<");
//shorthand functionality for making a post
//settings tool tip
/* will add user functionality
$(".title").on("mouseenter",function(){
$this=$(this);
var settings=$this.children("span.settings");
if(settings===false || settings==='undefined' || settings == null){return false;}


if(settings.hasClass("true")){//current user settings

}else{//random user settings

}
$("#tooltip").remove();
	var tooltip=$(document.createElement('div'));
	tooltip.attr('id','tooltip');
tooltip.addClass("title-tip");
	tooltip.css({
        position: 'absolute',
        background: 'black',
        border: '1px solid black',
        padding: '10px',
        zIndex: 1,
        width:'50px',
        height:'20px',
        display: 'none',
        top: 0 +'px',
        left:  $this.width()+10+ 'px',
        color:'white'
    }).insertBefore($this);
    settings.show();
    settings.css('z-index','2');
    settings.prependTo(tooltip);
   tooltip.show();
   //improve so settings sat on tooltip
});
$(".title").on("mouseleave",function(){
	$this=$(this);
	var tooltip=$("#tooltip");

setTimeout(function(){
if (!tooltip.hasClass("nope")){
tooltip.remove();
}
},1100);
});*/

$(document).bind("#tooltip","mouseenter",function(){
	$(this).addClass("nope");

});
$(document).bind("#tooltip","mouseleave",function(){
	tooltip.removeClass("nope");
$(this).remove();
});

$("textarea.comment_form_content").on('keydown input paste change',function(e){
	
	var $this=$(this);
	var $parent=$(".new_comment");
	var $parent2=$(".comment_form_container");
	var user_teller=$(".user_comment_info .user_contstaint");
	var info=$(".user_comment_info");
	var max_constraint=400;//max number of characters
	var length=$this.val().length;
	
	var diff=Math.abs(max_constraint-$this.val().length);
	if($parent2.hasClass("custom-disabled")){return false;}
	if(length>=max_constraint){$this.val($this.val().slice(0,max_constraint-1));}//only takes 400 characters
	user_teller.text(diff);
	//changes the user info accordingly
	if(diff>=200){info.addClass("custom-success");info.removeClass("custom-danger");info.removeClass("custom-warning");}
	else if(diff<200 && diff>=50){info.removeClass("custom-success");info.removeClass("custom-danger");info.addClass("custom-warning");}
	else if(diff<50){info.removeClass("custom-success");info.addClass("custom-danger");info.removeClass("custom-warning");}
		//checks to see if the length of the comment form is adequate and if not makes it so	
}).on("keypress",function(e){
if(e.type=="keypress" && e.which==13){//also dont forget to replicate validations on the server side
	
	var $this=$(this);
	if($this.val()=="says..."){return false;}
	if(!$this.hasClass("reply_form")){
//exit if the user submits 
		id=$(".micropost_show").attr('id');
		$.ajax({
		type: "post",
		dataType: "json",
  		url: '/commands/create_a_comment',
  		data: {micropost_id:id,body:$this.val()},
  	}).done(function(response){
	if(response.valid==true){
		var parent2=$(".comment_form_container");
	var top=parent2.css('top');
		parent2.animate({//bounce effect
		top: top+400+'px',
		},2000);
		parent2.animate({//bounce effect
		top: top+200+'px',
		},1500);
		parent2.animate({//bounce effect
		top: top+400+'px',
		},1000);
		parent2.animate({//bounce effect
		top: top+300+'px',
		},600);
		parent2.animate({//bounce effect
		top: top+400+'px',
		},300);
	}
	else{
		var dialog=$(document.createElement('div'));
		dialog.addClass("dialog-error");
		addMask(dialog);
	}

  	});
		//make a diminishing bounce effect with the comment
	
	}else{//do this
	var id=$(".micropost_show").attr('id');
	var p_id=$(".comment.replying_to").attr('id');//attach listeners on comments who have their replied button clicked
		$.ajax({
		type: "post",
		dataType: "json",
  		url: '/commands/create_a_comment',
  		data: {parent_id:p_id,micropost_id:id,body:$this.val()},
  	}).done(function(response){

  	});
	}
}
});
/*$(".custom-disabled").hover(function(){

	var time=$this.children(".time");
	window.setInterval(dec, 1000);
tooltip("sorry, you must wait "+time+" before continuing");
});*/
function dec(){
	var time=$(".custom-disabled .time");
	if(parseInt(time.text())<=0){return false;}
	time.text(parseInt(time.text())-1);
}
window.setInterval(dec, 1000);

//reply user interface
$(".comment .reply_button").on("click",function(){
var parent=$(this).parent(".comment");
$(".comment.replying_to").removeClass("replying_to");
parent.addClass("replying_to");
//show reply form
var new_reply=$(".new_comment").clone();
addMask(new_reply);
		
});



/*form validations for submit1 page*/
$('#urls').on('blur',function(){
var url_message=$('.url_message p');
$this=$('#urls');
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
$("form").submit(function(event){

var $input = $(this).find("input#urls");
   if ($input.val().length>1) {
   	alert("should work");
     // Value is falsey (i.e. null), lets set a new one
     $("#preview").val($('#img1').attr('src'));
   }

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
			$('#img3').attr('src',urls[index]);
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
			$('#img1').attr('src',urls[index]);
			$('#img2').attr('src',urls[(index+1)%len]);
			$('#img3').attr('src',urls[(index+2)%len]);
			}else if(urls.length>1){
			$('#img1').attr('src',urls[index]);
			$('#img2').attr('src',urls[(index+1)%len]);
			}else if(urls.length==1){

			}
			slider.data('index',(index+1)%len);
});

$('.form_title').on('blur',function(){
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
		if($this.is("#upload-title")){$("#upload-title").trigger("valid-title");}
		title_message.text("nice");
	}
},1000);

});
$("[title]").load(function(){
$(this).attr('data-title',$(this).attr('title'));
$(this).removeAttr('title');
});
$(document).on("mouseover","[data-title]",function(e){
	
	$this=$(this);
	if($this.is("img")){ return false;}
	setTimeout(function(){
	var tooltip=$(document.createElement('div'));
	tooltip.attr('id','tooltip');

	tooltip.css({
        position: 'absolute',
        background: 'black',
        border: '1px solid black',
        padding: '10px',
        zIndex: 999,
        width:'20px',
        height:'20px',
        display: 'none',
        right:  ($this.width()*1.5)+ 'px',
        color:'white'
    }).insertBefore($this);


   tooltip.show().html($this.attr('data-title'));
},1000);

});
$(document).on("mouseout","[data-title]",function(event){
$('#tooltip').remove();
});
$(".medchannel").on("mouseover",function(){
$this=$(this);
setTimeout(function(){
var tooltip=$(document.createElement('div'));
	tooltip.attr('id','tooltip');
	tooltip.css({
        position: 'absolute',
        background: 'black',
        border: '1px solid black',
        padding: '10px',
        zIndex: 999,
        'word-wrap': 'break-word',
        width:'250px',
        top:'180px',
        right: '240px',
        color:'white'
    }).insertBefore($this);
    tooltip.html($this.attr("data-description"));
},500);
});

$(".medchannel").on("mouseout",function(){
$('#tooltip').remove();
});

//search dropdown
$("#search").on('click',function(e){
	e.preventDefault();
if($('#search_bar').length<1){
var search=$(document.createElement('div'));
search.attr('id','search_bar');
search.insertAfter($(".navbar"));
}else{
$('#search_bar').remove();
}
});
$(".logo.sloth").on("click",function(event){
	var sidebar=$("#sidebar");
if(sidebar.css('display')=='none'){
sidebar.show();
}else{
sidebar.hide();
}
});

/*fucking people who have javascript disabled*/
$("#file").load(function(){
	$(this).hide();
});
$("#file").trigger('load');
$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {//user has reached the bottom

   }
});
$('#upload-title').bind('valid-title',function(){
        //Get the A tag
        var dropbox= $('#dropbox');
        $this=$(this);
$($this).attr("autocomplete", "off");
//Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
     
        //Set height and width to mask to fill up the whole screen
        $('#mask').css({'width':maskWidth,'height':maskHeight});
        //transition effect     
        $('#mask').fadeIn(1000);    
        $('#mask').fadeTo("slow",0.8);  
     
        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();
               
        //Set the popup window to center
        dropbox.css('top',  winH/2-dropbox.height()/2);
        dropbox.css('left', winW/2-dropbox.width()/2);
     
        //transition effect
        dropbox.fadeIn(2000); 
     
    //if close button is clicked
    $('.window .close').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();
        $('#mask, .window').hide();
        $($this).removeAttr("disabled");
    });     
     
    //if mask is clicked
    $('#mask').click(function () {
        $(this).hide();
        $('.window').hide();
        $($this).removeAttr("disabled");
    });       
});
//stop regular right clicking context menu
 $("span.med_container").bind("contextmenu",function(e){
              return false;
}); 
//mmedUpping and medDowning
$("span.med_container").mousedown(function(event){
	event.preventDefault();
	var $this=$(this);
	var meds = $this.find(".meds");
	var mid=$this.attr("id");
	console.log(window.location.origin);
	if(!$this.hasClass("upvote") && !$this.hasClass("downvote")){
switch (event.which) {
        case 1://left
            meds.text(parseInt(meds.text())+1);
            $this.addClass("upvote");
            $.ajax({
		type: "post",
		dataType: "json",
  		url: '/commands/inc',
  		data: {id:mid,type:"upvote"},});
            break;
        case 3://right
        //show the broken heart and send a med decrementt
            meds.text(parseInt(meds.text())-1);
            $this.addClass("downvote");
            $.ajax({
		type: "post",
		dataType: "json",
  		url: '/commands/inc',
  		data: {id:mid,type:"downvote"},
  	});
            break;
    }
	}else if($this.hasClass("upvote") && event.which==3){//neutalized
	$this.removeClass("upvote");
	meds.text(parseInt(meds.text())-1);
	}else if($this.hasClass("downvote") && event.which==1){//neutralized
	meds.text(parseInt(meds.text())+1);
		$this.removeClass("downvote");
	}
	
});

//tabs:
$(".hnav_right").on("click",function(){
	var textx=$(".header .text");
	var feeds=$(".medfeed_container");
$this=$(this);
if($this.hasClass("not_done")){return false;}


$this.addClass("not_done");
textx.animate({left:"+=350px",opacity: "0"}
	, {duration: "slow",
	complete:  function() { textx.css({right:"10px"}); 	switch(textx.text())
{
case textx.data("name"):
  textx.text("Trending");
  break;
case "Trending":
  textx.text("New");
  break;
case "New":
  textx.text(textx.data("name"));
  break;
}} });
//limbo
feeds.animate({left:"+=200px",opacity: "0"},"slow");
textx.animate({left: '-=700px'},50);
feeds.animate({left: '-=600px'},50);
feeds.animate({left:"+=400px",opacity: "1"},"slow");
textx.animate({left:"+=350px",opacity: "1"}
	, {duration: "slow",
	complete:  function() { $this.removeClass("not_done");} });

});
$(".header > .text").data("name",$(".header > .text").text())
$(".hnav_left").on("click",function(){
	var textx=$(".header > .text");
var feeds=$(".medfeed_container");
$this=$(this);
if($this.hasClass("not_done")){return false;}


$this.addClass("not_done");
textx.animate({left:"-=350px",opacity: "0"}
	, {duration: "slow",
	complete:  function() { switch(textx.text())
{
case textx.data("name"):
  textx.text("New");
  break;
case "Trending":
  textx.text(textx.data("name"));
  break;
case "New":
  textx.text("Trending");
  break;
}} });
feeds.animate({left:"-=200px",opacity: "0"},"slow");
textx.animate({left: '+=700px'},50);
feeds.animate({left: '+=600px'},50);
feeds.animate({left:"-=400px",opacity: "1"},"slow");
textx.animate({left:"-=350px",opacity: "1"}
	, {duration: "slow",
	complete:  function() { $this.removeClass("not_done");} });
});
/*$('.medchannels-box').jScrollPane();*/
/*medplus acc added functionality*/