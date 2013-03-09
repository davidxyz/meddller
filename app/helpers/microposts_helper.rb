
module MicropostsHelper
  def default_feed
    Micropost.select("*")
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
  private
    def wrap_long_string(text,max_width)
      zero_width_space= "&#8203;"
      regex = /.{1,#{max_width}}/
      (text.length < max_width)? text : text.scan(regex).join(zero_width_space)
    end
end