
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
		thing.appendTo($("body"));
	}
	 var maskHeight = $(document).height();
      var maskWidth = $(window).width();
     //make the mask
     var mask=$(document.createElement('div'));
     var close=$(document.createElement('div'));
     mask.attr('id','mask');close.addClass('close');
     close.appendTo(mask);
     thing.addClass('window');
     mask.appendTo($("body"));
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
        $this=$(this)
        e.preventDefault();
        $('#mask, .window').hide();
        $($this).removeAttr("disabled");
    });     
     
    //if mask is clicked
    $('#mask').click(function () {
    	$this=$(this)
        $(this).hide();
        $('.window').hide();
        $($this).removeAttr("disabled");
    });

}

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
	if($this.val()=="" || $this.val().legnth<3){return false;}
//exit if the user submits 
		id=$(".micropost_show").attr('id');
		$.ajax({
		type: "post",
		dataType: "json",
  		url: '/commands/create_a_comment',
  		data: {micropost_id:id,body:$this.val()},
  	}).done(function(response){
  		
	if(response.valid==true){//animate a DIY bounce effect
	 var parent=$(".comment_form_container");parent.css({"z-index":500});parent.animate({top:"+=800"},4000);parent.animate({top:"-=350"},2000);parent.animate({top:"+=350"},1500);parent.animate({top:"-=100"},800);parent.animate({top:"+=100"},500);
	}
	else{
		var dialog=$(document.createElement('div'));//dafuq dus this work bro?
		dialog.addClass("dialog-error");
		addMask(dialog)
	}

  	});
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
$(document).on("keypress",".comment_reply textarea",function(e){
		//make a diminishing bounce effect with the comment	
	$this=$(this);
if(e.type=="keypress" && e.which==13){
	var id=$(".micropost_show").attr('id');
	var p_id=$(".comment.replying_to").attr('id');//attach listeners on comments who have their replied button clicked
		$.ajax({
		type: "post",
		dataType: "json",
  		url: '/commands/create_a_comment',
  		data: {parent_id:p_id,body:$this.val()},
  	}).done(function(response){
  		alert("done");
  	});
	}
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
//checks to see if the name and email are already taken using ajax
$('form#new_user input').on('blur',function(){
	$this=$(this);
if($this.attr("name")=="user[name]"){
	$(".wrong-info").remove();
var img=$(document.createElement('img'));
var div=$(document.createElement('div'));
img.attr("src","/assets/ajax-loader.gif");
img.appendTo(div);
img.width(25);img.height(25);
div.prependTo($this.parent());
div.css({position:"relative",left:"500px",top:"63px"});
setTimeout(function(){
$.ajax({
		type: "post",
		dataType: "json",
  		url: '/commands/no_other_users',
  		data: {name:$this.val()},}).done(function(response){
  			var span=$(document.createElement('span'));
  			span.appendTo(div);
  			console.log(response);
  			 if (response.user){
  			 	img.attr("src","/assets/cross.png");
  			 	div.addClass("wrong-info");
  			 	span.text("Name taken");
  			 }
  			 else{
  			 	img.attr("src","/assets/check.png");
  			 	span.text("Name is okay");
  			 	div.fadeOut(5000);setTimeout(function(){div.remove();},6000);
  			 }
  		});
  		},1000);
}else if($this.attr("name")=="user[email]"){
	$(".wrong-info2").remove();
var img=$(document.createElement('img'));
var div=$(document.createElement('div'));
img.attr("src","/assets/ajax-loader.gif");
img.width(25);img.height(25);
img.appendTo(div);
div.prependTo($this.parent());
div.css({position:"relative",left:"450px",top:"123px"});
setTimeout(function(){
$.ajax({
		type: "post",
		dataType: "json",
  		url: '/commands/no_other_emails',
  		data: {email:$this.val()},}).done(function(response){
  			var span=$(document.createElement('span'));
  			span.appendTo(div);
  			console.log(response);
  			if (response.email){
  			 	img.attr("src","/assets/cross.png");
  			 	span.text("Email is taken");
  			 	div.addClass("wrong-info2");
  			 }
  			 else{
  			 	img.attr("src","/assets/check.png");
  			 	span.text("Email is okay");
  			 	div.fadeOut(5000);setTimeout(function(){div.remove();},6000);
  			 }
  		});},1000);
}
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
$("[title]").each(function(index,value){
$(value).attr('data-title',$(value).attr('title'));
$(value).removeAttr('title');
});
//so basically this is a tooltip for shit and it goes on top of it will establish this for new users to help them out and then will be disabled
$(document).on("mouseenter","[data-title]",function(e){	
	$this=$(this);
	if($this.is("img")){ return false;} //will refine for extra power
	var tooltip=$(document.createElement('div'));
	tooltip.attr('id','otooltip');
var offset = $this.offset();
var height = $this.height();
var width = $this.width();
var top = offset.top -height +"px";
var left = offset.left - width +10+ "px";
	tooltip.css({
        position: 'absolute',
        background: 'black',
        border: '1px solid black',
        padding: '10px',
        zIndex: 999,
        width:'70px',
        height:'7px',
        display: 'none',
        left:  left,
        "font-size":"10px",
        "text-align":"center",
        top:top,
        color:'white'
    }).insertBefore(document.body);

   tooltip.html($this.attr('data-title'));
   tooltip.fadeTo("slow",0.6);

});
//for options under production
$(document).on("mouseleave","[data-title]",function(event){
$('#otooltip').remove();
});
$(".user-options").click(function(){
	$this=$(this).parent();
$this.removeAttr("title");
if(!$this.hasClass("tip_activate")){
	 $this.addClass("tip_activate");

	var tooltip=$(document.createElement('div'));
	tooltip.addClass("options_tooltip");
	tooltip.css({
        position: 'absolute',
        background: 'black',
        border: '1px solid black',
        padding: '10px',
        zIndex: 999,
        width:'50px',
        height:'13px',
        display: 'none',
        top:  '0px',
        right:-90+ 'px',
        color:'white'
    }).insertBefore($this);

   tooltip.html($this.find(".settings").show());
   tooltip.fadeIn("slow");
}else{
	$(".options_tooltip > .settings").hide().appendTo($this);
	$(".options_tooltip").remove();
	$this.removeClass("tip_activate");
}
});
//for medals on comment page or user show page
$("[data-desc]").on("mouseenter",function(e){
	$this=$(this);
	var tooltip=$(document.createElement('div'));
	tooltip.addClass("meddal-tooltip");

	tooltip.css({
        position: 'absolute',
        background: '#ffe770',
        padding: '10px',
        zIndex: 999,
        display: 'none',
        right:  ($this.width()*2)+ 'px',
        color:'black'
    }).insertBefore($this);

   tooltip.html($this.attr('data-desc'));
   tooltip.fadeTo("slow",0.7);
});

$(document).on("mouseleave","[data-desc]",function(event){
$('.meddal-tooltip').remove();
});
$(".medchannel").on("mouseenter",function(){
$this=$(this);
var tooltip=$(document.createElement('div'));
	tooltip.attr('id','tooltip');
	var offset = $this.offset();
var height = $this.height();
var width = $this.width();
var top = -20+offset.top + height + "px";
var left = -330+offset.left + width + "px";
	tooltip.css({
		position:'absolute',
        background: 'black',
        border: '1px solid black',
        padding: '10px',
        zIndex: 999,
        'word-wrap': 'break-word',
        width:'250px',
    	left: left,
    	top: top,
        color:'white',
        display: 'none'
    }).prependTo(document.body);
    tooltip.html($this.attr("data-description"));
    tooltip.fadeTo("slow",0.7);
});

$(".medchannel").on("mouseleave",function(){
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
/* until i can get it to work
$("#file").load(function(){
	$(this).hide();
});
$("#file").trigger('load');
*/
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
	//console.log(window.location.origin);
	if($this.parent().attr("data-signed-in")=="false"){ dialog("Sign in first",$this.parent().parent());return false;}
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
	$(".medfeed_box").data("page",1);//reset the page
	var textx=$(".header .text");
	var feeds=$(".medfeed_container");
$this=$(this);
if($this.hasClass("not_done")){return false;}

var original=$("#name_of_channel").text();
$this.addClass("not_done");
textx.animate({left:"+=350px",opacity: "0"}
	, {duration: "slow",
	complete:  function() { textx.css({right:"10px"}); 	switch(textx.text())
{
case original:
  textx.text("Trending");
  break;
case "Trending":
  textx.text("New");
  break;
case "New":
  textx.text(original);
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
if($(".header > .text").text()=="Hall Of Fame"){
	$(".hnav_left").hide();
	$(".hnav_right").hide();
}
$(".hnav_left").on("click",function(){
	$(".medfeed_box").data("page",1);//reset the page
	var textx=$(".header > .text");
var feeds=$(".medfeed_container");
$this=$(this);
var original=$("#name_of_channel").text();
if($this.hasClass("not_done")){return false;}


$this.addClass("not_done");
textx.animate({left:"-=350px",opacity: "0"}
	, {duration: "slow",
	complete:  function() { switch(textx.text())
{
case original:
  textx.text("New");
  break;
case "Trending":
  textx.text(original);
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
//dialog function that goes in the middle of the screen and then times out
function dialog(message,body){
	var dialog=$(document.createElement('div'));
	var text=$(document.createElement('i'));
	dialog.addClass("dialog-error");

		dialog.appendTo(document.body);
		text.text(message);
		text.appendTo(dialog);
        var winH = $(window).height();
        var winW = $(window).width();
               
        //Set the popup window to center
        dialog.css('top',  winH/2-dialog.height()/2);
        dialog.css('z-index',  999);
        dialog.css('left', winW/2-dialog.width()/2);
        dialog.fadeOut(2000);
        setTimeout(function(){dialog.remove();},2000)
     
}
//repost functionality
$(".post .repost").on('click',function(){
	//make a sort of input tooltip
	$this=$(this);
	if($this.parent().parent().attr("data-signed-in")=="false"){ dialog("Sign in first",$this.parent().parent());return false;}//user aint signed in so get the fuuck out
	if(!$this.hasClass("active")){

var post=$this.parent().parent();
	var tooltip=$(document.createElement('div'));
	tooltip.attr('id','tooltip_form');
	var input=$(document.createElement('input'));
	input.attr('type','text');
	input.attr('class','input_tool');
	var p=$(document.createElement('p'));
	p.addClass("repost_header");
	p.text("What Channel do you want to repost to?");
	tooltip.css({
        position: 'relative',
        background: 'black',
        border: '1px solid black',
        padding: '10px',
        zIndex: 999,
        width:'180px',
        height:'100px',
        display: 'none',
        left:  ($this.width()*6)+ 'px',
        top:($this.height()*3)+ 'px',
        color:'white'
    }).insertBefore($this);
	input.appendTo(tooltip);
	p.prependTo(tooltip);
	tooltip.fadeTo("slow",0.7);
	$this.addClass("active");

	input.on("keypress",function(e){
	  if(e.type=="keypress" && e.which==13){
		$.ajax({
		type: "post",
		dataType: "json",
  		url: '/commands/repost',
  		data: {id:post.attr("id"),medchannel:input.val()},
  		}).done(function(response){//should i add a mask to the repost dialog circle?
  			tooltip.remove();
  			var dialog=$(document.createElement('div'));
  			var p=$(document.createElement('p'));
  			p.appendTo(dialog);
  			dialog.addClass("dialog_circle");
  			var winH = $(window).height();
            var winW = $(window).width();
        dialog.css('top',  winH/2-dialog.height()/2);
        dialog.css('left', winW/2-dialog.width()/2);
			if(response.valid){
				dialog.addClass("success");
				p.text("success");
			}else{//false
				dialog.addClass("error");
				p.text(response.reason);
			}
			
			dialog.fadeOut("slow").remove();
  		});
	  }
	});
	tooltip.on("mouseleave",function(e){
		tooltip.remove();
	})
	}else{
		$this.removeClass("active");
		$("#tooltip_form").fadeOut("slow");
		$("#tooltip_form").remove();
	}

});
//comment_reply functionality not even working yet
$(".comment .comments").on("click",function(){
	$this=$(this);
if(!$this.parent().parent().hasClass("active")){
var new_new=$(".comment_form_container").clone();
new_new.addClass("comment_reply");
new_new.hide();
$this.parent().addClass("replying_to");
$(".added-info").fadeTo(2000,0.6);
$this.parent().parent().addClass("active");
$(".comment_wrapper").each(function(){
if (!$(this).hasClass("active") && $(this).position().top>$this.parent().parent().position().top){
$(this).animate({top:"+=150px",opacity:0.6},2000)
}
});
new_new.insertAfter($this.parent().parent());
new_new.fadeIn(2000);
new_new.css({position:"absolute",right:"200px"});
}else{
	$(".comment_wrapper").each(function(){
if (!$(this).hasClass("active")&& $(this).position().top>$this.parent().parent().position().top){
$(this).animate({top:"-=150px",opacity:1},2000)
}
});
	$this.parent().removeClass("replying_to");
$this.parent().parent().removeClass("active");
$(".added-info").fadeTo(2000,1);
$(".comment_reply").fadeOut(1500);
}
});
//add feature later of hiding comment when meds reach low levels
comment_hide();
function comment_hide(){
$.each($(".comment[data-hide=true]"),function(index, value){
$(value).addClass("hidden");

$(value).parent().fadeTo("fast",0.8);
$(value).attr("data-height",$(value).height());
$(value).children().hide();
$(value).find("#whiteout").show();
var offensive=$(document.createElement('i'));
offensive.addClass("offense-statement");
offensive.text("This comment has been deemed unnecessary")
offensive.prependTo($(value));
$(value).height(10);
var chevron=$(document.createElement('div'));
chevron.addClass("down-hide");
chevron.prependTo($(value));
});
}
$(".comment .down-hide").on("click",function(){
$this=$(this);
var comment=$this.parent();
if(comment.hasClass("hidden")){//slidedown animation
$this.addClass("shrink");
comment.children().fadeIn(1000);
comment.animate({height:comment.attr("data-height"),opacity: "1"}
	, {duration: "slow",
	complete:  function() { comment.parent().fadeTo("fast",1)} });
comment.removeClass("hidden");
comment.find(".offense-statement").remove();
}else{//slide up animation
	comment.find(".down-hide").remove();
comment_hide();
}
});
//paginator for medfeed
if($(".medfeed_box").length!=0){
	var feed_box=$(".medfeed_box");
feed_box.data("page",1);
$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       $("img.paginating_gif").show();
       var name=$("#name_of_channel").text();
       var medchannel="Medfeed";
       var url="/";//default home
      
       if(name=="Medfeed"){//home
       	 switch($(".medfeed_box > .header > .text").text()){
       	case "Trending":
       	url="/rising";
       	break;
       	case "New":
       	url="/new";
       	break;
       	case name://popular on what channel
  		url="/popular";
       	break;
       }
       	}else{//its a medchannel
        switch($(".medfeed_box > .header > .text").text()){
       	case "Trending":
       	url="/medchannel/"+name+"/rising";
       	break;
       	case "New":
       	url="/medchannel/"+name+"/new";
       	break;
       	case name://popular on what channel
  		url="/medchannel/"+name+"/popular";
       	break;
       }
       	}
       feed_box.data("page",feed_box.data("page")+1);
       $.ajax({
		type: "post",
		dataType: "json",
  		url: url,
  		data: {page:$(".medfeed_box").data("page")},}).done(function(response){
  		console.log(response.feed);//<-more feed
  		});
   }
});
}
$(".sub-btn").on("click",function(event){//buggy in that doesnt display ui as nice
event.preventDefault();
$this=$(this);
		$.ajax({
		type: "post",
		dataType: "json",
  		url: '/commands/subscribe',
  		data: {medchannel:$("#name_of_channel").text()},
  		success: function(){
  			console.log("what");
  			var text=$this.find("span").text();
  		if(text.toLowerCase()=="subscribe"){
  			$(".subscribers_data").text(parseInt($(".subscribers-data").text())+1)
  		}else{
  			$(".subscribers_data").text(parseInt($(".subscribers-data").text())-1)
  		}
  		}
  	});
});
//if overflow of medchannels
$("ul.channels").each(function(index,value){
if ($(value).children().length>5){
	$(value).parent().find(".onav_left").show();
$(value).parent().find(".onav_right").show();
}
});

$(".onav_left").on("click",function(){
console.log("yo");
});
$(".onav_right").on("click",function(){

});
/*$('.medchannels-box').jScrollPane();*/
/*medplus acc added functionality*/