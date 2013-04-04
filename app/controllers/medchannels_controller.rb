class MedchannelsController < ApplicationController
	before_filter :signed_in_user, only: [:create,:subscribe,:unsubscribe]
	def show

		@medchannel=Medchannel.find_by_name(params[:name])
    not_found if @medchannel.nil?
		@name=@medchannel.name
		@orig=@medchannel.name
		#user doesnt know what they are doing
		
		begin#not logged in
    	@subscribe=current_user.subscribed?(@medchannel)
    	rescue
      	@subscribe=nil
  		end
  		result=determine_pagination(Micropost.calculate_feed(current_user,@medchannel,:popular),if params[:page].to_i<1 or params[:page].to_i.to_s=="0" then 1 else params[:page].to_i end)
   		@feed_items =result[:feed]
   		@medfeed_height=result[:medfeed_height]
   		respond_to do |format|
     format.json {
        @channels=[]
        @current_users=[]
        @comment_nums=[]
        @repost_nums=[]
        @names=[]
        @feed_items.each{|x| 
          user=x.user
          @channels<<x.channels
          @current_users<<current_user?(user)
          @names<<user.name
          @comment_nums<<x.comment_threads.count
          @repost_nums<<x.reposters.count
        }
      render :json => { :feed=>@feed_items,:channels=>@channels,:current_users=>@current_users,:names=>@names,:comments=>@comment_nums,:reposts=>@repost_nums,:feed_height=>@medfeed_height}
      }
      format.html
  	  end
	end
	def desc#gives description vote page
		@medchannel=Medchannel.find_by_name(params[:name])
    not_found if @medchannel.nil?
		 #doesnt find a page give it an empty array
		@micropost=@medchannel.desc
			begin
			@comments=@micropost.comment_threads
			rescue
			@comments=[]
			end		
	end
	def subscribe
		@medchannel=Medchannel.find_by_name(params[:medchannel])
		if @medchannel.nil? then redirect_to "/" end
		if current_user.subscribed?(@medchannel)
		 current_user.unsubscribe!(@medchannel)
		else
			current_user.subscribe!(@medchannel)
		end
		redirect_to "/m/"+@medchannel.name
    end
	def hall_of_fame# best posts of all time under construction
    @name="Hall Of Fame"
	@orig=Medchannel.find_by_name(params[:name])
    end
  #posts actions should only have who the user is following and channels subscribed to
  def popularposts# best posts in last 18 hours  	 
   @name="Popular"
	@orig=Medchannel.find_by_name(params[:name])
	result=determine_pagination(Micropost.calculate_feed(current_user,@orig,:popular),if params[:page].to_i<1 or params[:page].to_i.to_s=="0" then 1 else params[:page].to_i end)
   @feed_items =result[:feed]
   @medfeed_height=result[:medfeed_height]
	respond_to do |format|
     format.json {
        @channels=[]
        @current_users=[]
        @comment_nums=[]
        @repost_nums=[]
        @names=[]
        @feed_items.each{|x| 
          user=x.user
          @channels<<x.channels
          @current_users<<current_user?(user)
          @names<<user.name
          @comment_nums<<x.comment_threads.count
          @repost_nums<<x.reposters.count
        }
      render :json => { :feed=>@feed_items,:channels=>@channels,:current_users=>@current_users,:names=>@names,:comments=>@comment_nums,:reposts=>@repost_nums,:feed_height=>@medfeed_height}
      }
      format.html{render 'medchannels/show',:locals => { :@feed_items => @feed_items,:@name=>@name,:@orig=>@orig.name,:@medfeed_height=>@medfeed_height,:@medchannel=>@orig}}
  	end
  end
  def risingposts# rising posts in algorithm
   @name="Rising"
	@orig=Medchannel.find_by_name(params[:name])
	result=determine_pagination(Micropost.calculate_feed(current_user,@orig,:rising),if params[:page].to_i<1 or params[:page].to_i.to_s=="0" then 1 else params[:page].to_i end)
   @feed_items =result[:feed]
   @medfeed_height=result[:medfeed_height]
	begin#not logged in
        @subscribe=current_user.subscribed?(@medchannel)
        rescue
        @subscribe=nil
                end
	respond_to do |format|
     format.json {
        @channels=[]
        @current_users=[]
        @comment_nums=[]
        @repost_nums=[]
        @names=[]
        @feed_items.each{|x| 
          user=x.user
          @channels<<x.channels
          @current_users<<current_user?(user)
          @names<<user.name
          @comment_nums<<x.comment_threads.count
          @repost_nums<<x.reposters.count
        }
      render :json => { :feed=>@feed_items,:channels=>@channels,:current_users=>@current_users,:names=>@names,:comments=>@comment_nums,:reposts=>@repost_nums,:feed_height=>@medfeed_height}
      }
      format.html{render 'medchannels/show',:locals => { :@feed_items => @feed_items,:@name=>@name,:@orig=>@orig.name,:@medfeed_height=>@medfeed_height,:@medchannel=>@orig}}
 	 end
  end
  def newposts# newest posts in last 5 hours
      @name="New"
	@orig=Medchannel.find_by_name(params[:name])
	result=determine_pagination(Micropost.calculate_feed(current_user,@orig,:new),if params[:page].to_i<1 or params[:page].to_i.to_s=="0" then 1 else params[:page].to_i end)
   @feed_items =result[:feed]
   @medfeed_height=result[:medfeed_height]
	begin#not logged in
        @subscribe=current_user.subscribed?(@medchannel)
        rescue
        @subscribe=nil
                end
	respond_to do |format|

     format.json {
        @channels=[]
        @current_users=[]
        @comment_nums=[]
        @repost_nums=[]
        @names=[]
        @feed_items.each{|x| 
          user=x.user
          @channels<<x.channels
          @current_users<<current_user?(user)
          @names<<user.name
          @comment_nums<<x.comment_threads.count
          @repost_nums<<x.reposters.count
        }
      render :json => { :feed=>@feed_items,:channels=>@channels,:current_users=>@current_users,:names=>@names,:comments=>@comment_nums,:reposts=>@repost_nums,:feed_height=>@medfeed_height}
      }
      format.html{render 'medchannels/show',:locals => { :@feed_items => @feed_items,:@name=>@name,:@orig=>@orig.name,:@medfeed_height=>@medfeed_height,:@medchannel=>@orig}}
  	end
  end
end
