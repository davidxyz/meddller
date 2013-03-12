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
    begin
    @microposts=Micropost.where(medchannel_id: params[:channel]).order("meds DESC").limit(10)
    rescue
      @microposts=[]
    end
  end
  #posts actions should only have who the user is following and channels subscribed to
  def popularposts# best posts in last 18 hours
    begin
      @microposts=Micropost.where(:created_at => (1.days.ago.to_date)..(Time.now.to_date),medchannel_id: params[:channel]).order("meds DESC")
    rescue 
      @microposts=[]
    end
  end
  def risingposts# rising posts in algorithm
    begin
    @microposts=Micropost.where(:created_at => (4.hours.ago.to_date)..(Time.now.to_date),medchannel_id: params[:channel]).order("meds DESC")#automatically gives created at descending order
    rescue
      @microposts=[]
    end
  end
  def newposts# newest posts in last 5 hours
    begin
    @microposts=Micropost.all#automatically gives created at descending order
    rescue
      @microposts=[]
    end
  end
end
