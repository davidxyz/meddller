
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
}/*
if($(".post").length>0){
	post_images_drag_resize();
}
function post_images_drag_resize(){
	var image=$(".post .preview_image img");
	var parent=image.parent();
	image.resizable();

	parent.draggable();
}*///no idea what the fuck im doing
var DateHelper = {
  // Takes the format of "Jan 15, 2007 15:45:00 GMT" and converts it to a relative time
  // Ruby strftime: %b %d, %Y %H:%M:%S GMT
  time_ago_in_words_with_parsing: function(from) {
    var date = new Date;
    date.setTime(Date.parse(from));
    return this.time_ago_in_words(date);
  },
  // Takes a timestamp and converts it to a relative time
  // DateHelper.time_ago_in_words(1331079503000)
  time_ago_in_words: function(from) {
    return this.distance_of_time_in_words(new Date, from);
  },
 
  distance_of_time_in_words: function(to, from) {
    var distance_in_seconds = ((to - from) / 1000);
    var distance_in_minutes = Math.floor(distance_in_seconds / 60);
    var tense = distance_in_seconds < 0 ? " from now" : " ago";
    distance_in_minutes = Math.abs(distance_in_minutes);
    if (distance_in_minutes == 0) { return 'less than a minute'+tense; }
    if (distance_in_minutes == 1) { return 'a minute'+tense; }
    if (distance_in_minutes < 45) { return distance_in_minutes + ' minutes'+tense; }
    if (distance_in_minutes < 90) { return 'about an hour'+tense; }
    if (distance_in_minutes < 1440) { return 'about ' + Math.floor(distance_in_minutes / 60) + ' hours'+tense; }
    if (distance_in_minutes < 2880) { return 'a day'+tense; }
    if (distance_in_minutes < 43200) { return Math.floor(distance_in_minutes / 1440) + ' days'+tense; }
    if (distance_in_minutes < 86400) { return 'about a month'+tense; }
    if (distance_in_minutes < 525960) { return Math.floor(distance_in_minutes / 43200) + ' months'+tense; }
    if (distance_in_minutes < 1051199) { return 'about a year'+tense; }
 
    return 'over ' + Math.floor(distance_in_minutes / 525960) + ' years';
  }
};
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
//doesnt reutrn anything and is all side effects
function constructPosts(posts,medfeed_container,channelz,current_users,names,comments,reposts,height,add){//takes a posts array, helpers with other shite, and a medfeed container, or whether we should apped to medfeed or switch
	add = typeof add !== 'undefined'? add : false;//makeshift default arg-if nil then false we switch out the medfeed container
	if(!add){
		medfeed_container.children().remove();
		medfeed_container.parent().height(height);
	}else{
		medfeed_container.parent().height(medfeed_container.parent().height()+height);
	}
	if(posts.length==0){
		if(medfeed_container.find(".nothing").length<1){

		}else{
			var nothing=$(document.createElement('div'));
				nothing.addClass("nothing");

			medfeed_container.append()
		}
	}

	if(posts.length<1){//if no posts
		var nothing=$(document.createElement('div'));
		nothing.addClass("nothing");
		nothing.appendTo(medfeed_container);
		return false;
	}
	posts.forEach(function(post,index){//should add templating just incase we find another and if we dont find we resort ot the posts.each
	var user=$(document.createElement('span'));
	var user_link=$(document.createElement('a'));
	var user_image=$(document.createElement('img'));
	var name=$(document.createElement('div'));name.text(names[index]);//fix
	var timestamp=$(document.createElement('span'));
	var inside_post=$(document.createElement('div'));
	var title=$(document.createElement('span'));
	var options=$(document.createElement('div'));var opt_link0=$(document.createElement('a'));var num0=$(document.createElement('div'));
	var opt_link1=$(document.createElement('a'));var num1=$(document.createElement('span'));//med_container
	var opt_link2=$(document.createElement('div'));var num2=$(document.createElement('span'));
	var channels=$(document.createElement('ul'));channels.addClass("channels");//need to add the channels
	var clear_div=$(document.createElement('div'));clear_div.css({clear:"both"});
	user.addClass("user_image");
	user_image.appendTo(user_link);
	user_link.appendTo(user);
	user.appendTo(inside_post);
	name.appendTo(user_image);
	user.append(name);
	user_image.attr("src","/assets/anon.png");//fix to user_img
	user_image.attr("width","25px");user_image.attr("height","25px");
	user_link.attr("href","/users/"+names[index]);
	user_image.attr("data-title",post.user_id);//fix
	timestamp.addClass("timestamp");
	inside_post.attr("id",post.id);
	inside_post.addClass("post");inside_post.addClass(post.medtype);
	title.addClass("title");
	inside_post.append(title);
	title.text(post.title==null?"":post.title);
	title.append(user_options);
	inside_post.attr("data-signed-in",$("#sidebar").length>0?"true":"false");
	if(current_users[index]){//i its the current use then add the options image--must refine with the setting links
	var user_options=$(document.createElement('img'));
	var settings=$(document.createElement('span'));
	var icon_wrench=$(document.createElement('i'));
	var icon_remove=$(document.createElement('i'));
	user_options.attr("alt","options");
	user_options.attr("height","25px");
	user_options.attr("src","/assets/options.png");
	user_options.addClass("user-options");
	user_options.appendTo(title);
	settings.appendTo(title);
	settings.addClass("hide");
	settings.append(icon_wrench);
	settings.append(icon_remove);
	icon_remove.addClass("icon-white");icon_remove.addClass("icon-wrench");icon_remove.addClass("icon-2x");
	icon_wrench.addClass("icon-white");icon_wrench.addClass("icon-remove");icon_wrench.addClass("icon-2x");
	user_options.attr("width","25px");
	}
	options.addClass("options");
	options.append(opt_link0);
	options.append(opt_link1);
	options.append(opt_link2);
	inside_post.append(options);
	opt_link0.attr("href","/microposts/"+post.id);opt_link0.attr("data-title","comment on it?");
	opt_link0.addClass("comments");
	opt_link0.append(num0);num0.text(comments[index]);
	num0.addClass("number");
	opt_link1.append(num1);
	opt_link1.addClass("med_container");//must decide whether true or not
	opt_link1.attr("id",post.id);
	num1.addClass("meds");
	num1.text(post.meds);
	opt_link2.addClass("repost");
	opt_link2.attr("data-title","repost it?");
	opt_link2.append(num2);
	num2.addClass("number");
	num2.text(reposts[index]);//repost number
	inside_post.append(timestamp);
	timestamp.text("Posted " +DateHelper.time_ago_in_words_with_parsing(post.created_at));
	inside_post.append(channels);
		var onav_left=$(document.createElement('span'));
		var onav_right=$(document.createElement('span'));
		onav_right.addClass("onav_right");
		onav_left.addClass("onav_left");
		onav_left.hide();
		onav_right.hide();
		channelz[index].forEach(function(channel,index){
		var channel_cont=$(document.createElement('li'));
		var channel_link=$(document.createElement('a'));
		inside_post.append(onav_left);
		inside_post.append(onav_right);
		channels.append(channel_cont);
		channel_cont.append(channel_link);
		channel_cont.addClass("channel-cont");
		channel_link.attr("src","/medchannel/"+channel.name);;
		channel_link.addClass("medchannel");
		channel_link.text(channel.name);
		channel_link.css({"background-color":"#5bc0de"});
	});

	//determin if its the current user or if signed in or not
	if(post.medtype=="link_post"){
		var preview=$(document.createElement('span'));
		var outside_link=$(document.createElement('a'));
		var preview_img=$(document.createElement('img'));
		preview.appendTo(inside_post);
		preview.addClass("preview");
		preview.append(outside_link);
		outside_link.append(preview_img);
		outside_link.attr("href",post.urls);
		preview_img.attr("width","65");
		preview_img.attr("height","85");
		preview_img.attr("src",post.preview_url);
	}else if(post.medtype=="self_post"){
		var content=$(document.createElement('p'));
		content.addClass("content");
		inside_post.append(content);
		content.text(post.content);
		inside_post.append(clear_div);
	}else if(post.medtype=="image_post"){
		var preview=$(document.createElement('span'));
		preview.addClass("preview_image");
		var preview_img=$(document.createElement('img'));
		inside_post.append(preview);
		preview.append(preview_img);
		preview_img.attr("src",post.image.thumb.url);
	}
	medfeed_container.append(inside_post);
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
/*when i get this to works
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

});*/
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
$(".user-options").click(function(){//only for current users
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
	if($this.parent().attr("data-signed-in")=="false"){ dialog("Sign in first please",$this.parent().parent());return false;}//must refine
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

$(".hnav_right").on("click",function(e){
$this=$(this);
$this.removeAttr("href");
	e.preventDefault();
	$(".medfeed_box").data("page",1);//reset the page
	var textx=$(".header .text");
	var feeds=$(".medfeed_container");
if($this.hasClass("not_done")){return false;}

var original=$("#name_of_channel").text();
var url="";
$this.addClass("not_done");
textx.animate({left:"+=350px",opacity: "0"}
	, {duration: "slow",
	complete:  function() { textx.css({right:"10px"});
	if(original=="Medfeed"){
switch(textx.text())
{
case original:
  textx.text("Trending");
  url="/rising";
  break;
case "Trending":
  textx.text("New");
  url="/new";
  break;
case "New":
  textx.text(original);
  url="/";
  break;
}
}else{//else its a medchannel o.O
switch(textx.text())
{
case original:
  textx.text("Trending");
  url="/m/"+original+"/rising";
  break;
case "Trending":
  textx.text("New");
  url="/m/"+original+"/rising";
  break;
case "New":
  textx.text(original);
  url="/m/"+original+"/popular";
  break;
}
}
}});
$.ajax({
		type: "post",
		dataType: "json",
  		url: url,
  		data: {},}).done(function(response){
  			console.log(response);
  		constructPosts(response.feed,feeds,response.channels,response.current_users,response.names,response.comments,response.reposts,response.add,response.feed_height,false);
  		});
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
	$this=$(this);
	$this.removeAttr("href");
	e.preventDefault();
	$(".medfeed_box").data("page",1);//reset the page
	var textx=$(".header > .text");
var feeds=$(".medfeed_container");
var original=$("#name_of_channel").text();
if($this.hasClass("not_done")){return false;}

var url="";
$this.addClass("not_done");
textx.animate({left:"-=350px",opacity: "0"}
	, {duration: "slow",
	complete:  function() {
	if(original=="Medfeed"){
 switch(textx.text())
{
case original:
  textx.text("New");
  url="/new";
  break;
case "Trending":
  textx.text(original);
  url="/";
  break;
case "New":
  textx.text("Trending");
  url="/rising";
  break;
}
}else{
	 switch(textx.text())
{
case original:
  textx.text("New");
  url="/m/"+original+"/new";
  break;
case "Trending":
  textx.text(original);
  url="/m/"+original;
  break;
case "New":
  textx.text("Trending");
  url="/m/"+original+"/rising";
  break;
}
}
} });
$.ajax({
		type: "post",
		dataType: "json",
  		url: url,
  		data: {},}).done(function(response){
  		constructPosts(response.feed,feeds,response.channels,response.current_users,response.names,response.comments,response.reposts,response.add,response.feed_height,false);
  		console.log(response);
  		});
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
        setTimeout(function(){dialog.remove();},2000);
     
}
//repost functionality
$(".post .repost").on('click',function(){
	//make a sort of input tooltip
	$this=$(this);
	if($this.parent().parent().attr("data-signed-in")=="false"){ dialog("Sign in first",$this.parent().parent());return false;}//must refine
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
$(".comment_wrapper .commentz").on("click",function(){
	$this=$(this);
	if($(".comment_wrapper.active").length>0 && !$this.parent().hasClass("active")){
		console.log("heyo");
			var comment=$(".comment_wrapper.active");
			comment.children(".commentz").trigger("click");
		//setTimeout(function(){$this.trigger("click");},1500);
	}//timeout if a comment_wrapper is active
if(!$this.parent().hasClass("active")){
var new_new=$(".comment_form_container").clone();
new_new.addClass("comment_reply");
new_new.hide();
$this.parent().addClass("replying_to");
$(".added-info").fadeTo(1000,0.6);
$this.parent().addClass("active");
$(".comment_wrapper").each(function(index,value){
if (!$(value).hasClass("active") && $(value).offset().top>$this.parent().offset().top){
$(value).animate({top:"+=150px",opacity:0.6},1500)
}
});
new_new.insertAfter($this.parent());
new_new.fadeIn(1500);
new_new.css({position:"absolute",right:"200px"});
}else{
	$(".comment_wrapper").each(function(index, value){
if (!$(value).hasClass("active")&& $(value).offset().top>$this.parent().offset().top){
$(value).animate({top:"-=150px",opacity:1},1500)
}
});
	console.log("hiyo")
	$this.parent().removeClass("replying_to");
$this.parent().removeClass("active");
$(".added-info").fadeTo(1000,1);
$(".comment_reply").fadeOut(1000);
setTimeout(function(){$(".comment_reply").remove();},1001);
}
});
//add feature later of hiding comment when meds reach low levels
//comment_hide(); refine for later
function comment_hide(){
$.each($(".comment_wrapper[data-hide=true]"),function(index, value){
$(value).addClass("hidden");

$(value).parent().fadeTo("fast",0.8);
$(value).attr("data-height",$(value).height());
$(value).children().hide();
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
$(".comment_wrapper .down-hide").on("click",function(){
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
/*
if($(".medfeed_box").length!=0){
	var feed_box=$(".medfeed_box");
feed_box.data("page",1);
$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
   	var name=$("#name_of_channel").text();
       if(name.length<1){return false;}
   	var feeds=$(".medfeed_container");
       $("img.paginating_gif").show();

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
  		setTimeout(function(){ constructPosts(response.feed,feeds,response.channels,response.current_users,response.names,response.comments,response.reposts,response.add,true);},400);
  		$("img.paginating_gif").fadeOut(1000);
  		});
   }
});
}*/
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
channel_overflow();
function channel_overflow(){

$("ul.channels").each(function(index,value){
if ($(value).children().length>5){
	$(value).parent().find(".onav_left").show().removeClass("hide");
$(value).parent().find(".onav_right").show().removeClass("hide");
}
});
}
$(".onav_left").on("click",function(){
console.log("yo");
});
$(".onav_right").on("click",function(){

});
if($("#sidebar").length>0){
$(window).trigger("resize");//once per refresh
$(window).resize(function() {
  var off0=$("#sidebar").offset();
  var off1=$(".medfeed_box").offset();
  (off0.left+$("#sidebar").width())>off1.left?$("#sidebar").fadeOut(1000):$("#sidebar").fadeIn(1000);
});
}
//edit
$('.subscribed_channels').jScrollPane();
/*medplus acc added functionality*/