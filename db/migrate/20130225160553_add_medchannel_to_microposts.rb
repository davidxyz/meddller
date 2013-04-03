class AddMedchannelToMicroposts < ActiveRecord::Migration
  def change
  	add_column :microposts, :medchannel_id, :integer
  	add_column :medchannels, :nsfw, :boolean
  end
end
