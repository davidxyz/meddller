class AddNsfwToMicroposts < ActiveRecord::Migration
  def change
    add_column :microposts, :nsfw, :boolean, :default=>false
  end
end
