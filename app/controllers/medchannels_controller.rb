class MedchannelsController < ApplicationController
	before_filter :signed_in_user, only: [:create,:subscribe,:unsubscribe]
	def show
		@medchannel=Medchannel.find_by_name(params[:name])
		begin
			@feed_items=@medchannel.feed.paginate(page: params[:page])
		rescue 
			@feed_items=[]
		end
		@name=@medchannel.name
		@orig=@medchannel.name
		begin#not logged in
    	@subscribe=current_user.subscribed?(@medchannel)
    	rescue
      	@subscribe=nil
  		end
	end
	def desc#gives description vote page
		@medchannel=Medchannel.find_by_name(params[:name])
		begin #doesnt find a page give it an empty array
		@micropost=@medchannel.desc
			begin
			@comments=@micropost.comment_threads
			rescue
			@comments=[]
			end
		rescue
		 not_found
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
	def hall_of_fame# best posts of all time
    @name="Hall Of Fame"
	@orig=Medchannel.find_by_name(params[:name])
    end
  #posts actions should only have who the user is following and channels subscribed to
  def popularposts# best posts in last 18 hours
   @name="Popular"
	@orig=Medchannel.find_by_name(params[:name])
	@feed_items = Micropost.calculate_feed(current_user,@orig,:popular).paginate(page: params[:page])
	respond_to do |format|
      format.json { render :json => { :feed=>@feed_items} }
      format.html {render partial:'medchannels/show',:locals => { :@feed_items => @feed_items,:@orig=>@orig,:@name=>@name}}
      end
  end
  def risingposts# rising posts in algorithm
   @name="Rising"
	@orig=Medchannel.find_by_name(params[:name])
	@feed_items = Micropost.calculate_feed(current_user,@orig,:rising).paginate(page: params[:page])
	respond_to do |format|
      format.json { render :json => { :feed=>@feed_items} }
      format.html {render partial:'medchannels/show',:locals => { :@feed_items => @feed_items,:@orig=>@orig,:@name=>@name}}
      end
  end
  def newposts# newest posts in last 5 hours
  	@name="New"
	@orig=Medchannel.find_by_name(params[:name])
	@feed_items = Micropost.calculate_feed(current_user,@orig,:new).paginate(page: params[:page])
	respond_to do |format|
      format.json { render :json => { :feed=>@feed_items} }
      format.html {render partial:'medchannels/show',:locals => { :@feed_items => @feed_items,:@orig=>@orig,:@name=>@name}}
      end
  end
end
