class MedchannelsController < ApplicationController
	def show
		@medchannel=Medchannel.find_by_name(params[:name])
		@feed_items=@medchannel.feed.paginate(page: params[:page])
		@name=@medchannel.name
	end
end
