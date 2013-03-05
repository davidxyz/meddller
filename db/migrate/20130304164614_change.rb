class Change < ActiveRecord::Migration
  def change
  	remove_column :microposts, :nsfw
  	remove_column :medchannels, :rules
  end
end
