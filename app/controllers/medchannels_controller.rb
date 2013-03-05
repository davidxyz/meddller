class MedchannelsController < ApplicationController
	before_filter :signed_in_user, only: [:create]
	def show
		@medchannel=Medchannel.find_by_name(params[:name])
		begin
			@feed_items=@medchannel.feed.paginate(page: params[:page])
		rescue 
			@feed_items=[]
		end
		@name=@medchannel.name
	end
	def desc#gives description vote page
		@medchannel=Medchannel.find_by_name(params[:name])
		begin #doesnt find a page give it an empty array
		@micropost=@medchannel.desc
		@comments=@micropost.comments
		rescue
		@micropost=nil
		@comments=[]
		end
	end
	def hall_of_fame# best posts of all time
    begin
    @microposts=Micropost.where(medchannel_id: params[:channel]).order("meds DESC").limit(10)
    rescue
      @microposts=[]
    end
  end
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
	def create
	@medchannel=Medchannel.new(params[:medchannel])
		if @medchannel.save
		@desc_post=Micropost.create(:medtype=>"desc", :medchannel_id=>@medchannel.id)
		else

		end
	end
end
