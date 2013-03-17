
module MicropostsHelper
  def default_feed
    Micropost.select("*")
  end
  def parseShit(body)
    #<User>
    #*medchannel*
    if (/<[a-z_]+>/=~body)==nil && (/\*[a-z_]+\*/=~body)==nil then return body end
    body.gsub!(/<([a-z_]+)>/,'<a href="/users/\1">\1</a>')
    sanitize(raw(body.gsub(/\*([a-z_]+)\*/,'<a href="/medchannel/\1">\1</a>')))
  end
  def determine_pagination(feed,page,per_page=7,min_height=300)#returns the paginated feed and the size of the body and medfeed
    counters=0
    feed[((page-1)*per_page)...(page*per_page)].each{|x|
      if x.medtype=="image_post"
        counters+=430
      elsif x.medtype=="self_post"
        counters+=((x.content.length/60).ceil*50+150)
      elsif x.medtype=="link_post"
        counters+=300
      end
    }
    result={feed:feed.paginate(page:page,per_page: per_page),medfeed_height: if counters<min_height then min_height else counters end}
  end
  def next_one(name,orig,rel=false)
        url=""
  if orig=="Medfeed"
case name
when "Trending"
  url="/new"
when "New"
   url="/"
 when orig
  url="/rising"
else
  url="/"
end
return url[1...url.size] if rel
else
case name
when "Trending"
  url="/m/"+orig+"/new"
when "New"
  url="/m/"+orig
 when orig
  url="/m/"+orig+"/rising"
else
  url="/m/"+orig
end
return url[(2+orig.size)...url.size] if rel
end
url
  end
  end
  def prev_one(name,orig,rel=false)
    url=""
  if orig=="Medfeed"
case name
when "Trending"
  url="/"
when "New"
  url="/rising"
 when orig
  url="/new"
else
  url="/"
end
return url[1...url.size] if rel
else
case name
when "Trending"
  url="/m/"+orig
when "New"
  url="/m/"+orig+"/rising"
 when orig
  url="/m/"+orig+"/new"
else
  url="/m/"+orig
end
return url[(2+orig.size)...url.size] if rel
end
url
  end
 def wrap(content,max_width=20)
  max_width-=1
 	while max_width < content.size  do
 	begin
   content=content.insert(max_width,"\r\n")
	rescue
	return content
	end
   max_width*=2
	end
 	return content
 end
  def wrap_content(content,max_width=30)
    sanitize(raw(content.split.map{|s| wrap_long_string(s,max_width)}.join(' ')))
  end
    def wrap_long_string(text,max_width)
      zero_width_space= "&#8203;"
      regex = /.{1,#{max_width}}/
      (text.length < max_width)? text : text.scan(regex).join(zero_width_space)
    end